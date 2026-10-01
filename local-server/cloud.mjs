#!/usr/bin/env node
// Starts the same invitation service on a container host (Railway) instead of the Mac mini.
// Private settings come from environment variables; replies and photos live on the mounted volume.
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { createServer, passwordHash } from './server.mjs';

const env = process.env;
const fail = message => { console.error(message); process.exit(1); };
for (const name of ['DATA_DIR','ADMIN_EMAIL','ADMIN_PASSWORD','SIGNING_SECRET']) if (!env[name]) fail(`Missing environment variable: ${name}`);
if (env.ADMIN_PASSWORD.length < 12) fail('ADMIN_PASSWORD must be at least 12 characters.');
if (!/^[a-f0-9]{64,}$/i.test(env.SIGNING_SECRET)) fail('SIGNING_SECRET must be at least 64 hex characters.');

const origins = (env.ALLOWED_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean);
if (env.RAILWAY_PUBLIC_DOMAIN) origins.push(`https://${env.RAILWAY_PUBLIC_DOMAIN}`);
const salt = createHash('sha256').update(`salt:${env.SIGNING_SECRET}`).digest('hex');
const config = {
  eventId: env.EVENT_ID || 'sara-30-2026',
  adminEmail: env.ADMIN_EMAIL,
  adminPasswordHash: await passwordHash(env.ADMIN_PASSWORD, salt),
  salt,
  signingSecret: env.SIGNING_SECRET,
  allowedOrigins: [...new Set(origins)]
};
// One container owns the volume, so a lock left by a killed container is always stale.
rmSync(join(env.DATA_DIR, 'service.pid'), {force: true});
try {
  const server = await createServer({dataDir: env.DATA_DIR, config, host: env.HOST || '0.0.0.0', port: Number(env.PORT || 8080)});
  console.log(`Birthday invitation ready on port ${server.address().port}; allowed origins: ${config.allowedOrigins.join(', ') || 'same-host only'}`);
  let closing = false;
  const close = () => { if (closing) return; closing = true; server.close(() => { server.closeStore(); process.exit(0); }); setTimeout(() => process.exit(1), 10000).unref(); };
  process.on('SIGTERM', close); process.on('SIGINT', close);
} catch (error) { fail(error.message); }
