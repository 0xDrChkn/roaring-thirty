# Container image for hosting the invitation service on Railway. Needs a volume mounted at /data.
FROM node:24-slim
WORKDIR /app
COPY . .
ENV NODE_ENV=production DATA_DIR=/data
CMD ["node", "local-server/cloud.mjs"]
