# Additional celebrity face pool prompts

Built-in image_gen tool. All assets are neutral face-only fictional composites.

## Beyoncé

Output: game/assets/face-beyonce.png

```text
Use case: compositing
Asset type: birthday quiz guessing face portrait, deliberately fictional face morph.
Input images: Image 1 is Sara's face identity reference; Image 2 is supporting Sara reference. Use only her facial identity, no clothing or environment from either input.
Primary request: Create one seamless photorealistic face composite blending Sara with Beyoncé. Keep Beyoncé's recognizable oval face structure, cheekbones, nose bridge, sculpted brow line and long honey-brown hair. Merge Sara's recognizable eyes, eyelid shape, mouth and gentle smile into those celebrity facial proportions, a balanced hybrid so guests can recognize both people. The celebrity must remain recognizable by the face, not by props or clothing. Not just Sara wearing celebrity hair.
Scene/backdrop: plain matte medium gray studio background, consistent neutral soft lighting.
Composition/framing: portrait close-up, directly facing camera, entire hair/head visible, face large and centered, crop at base of neck so absolutely no clothing appears. Natural skin texture. A single believable face, not a split face.
Avoid: clothing, shoulders, uniforms, costumes, jewelry, iconic makeup, performance settings, hats, glasses, props, logos, text, watermark, decorative frames, screenshot UI. This is a game illustration rather than an authentic celebrity photograph.
```

## Tom Cruise

Output: game/assets/face-tom-cruise.png

```text
Use case: compositing
Asset type: birthday quiz guessing face portrait, deliberately fictional face morph.
Input images: Image 1 is Sara's face identity reference; Image 2 is supporting Sara reference. Use only her facial identity, no clothing or environment from either input.
Primary request: Create one seamless photorealistic face composite blending Sara with Tom Cruise. Keep Tom Cruise's recognizable dark short brushed-back hair, strong broad jaw, prominent nose bridge and facial proportions. Merge Sara's recognizable eyes, eyelid shape, mouth and gentle smile into those celebrity facial proportions, a balanced hybrid so guests can recognize both people. The celebrity must remain recognizable by the face, not by props or clothing. Not just Sara wearing celebrity hair.
Scene/backdrop: plain matte medium gray studio background, consistent neutral soft lighting.
Composition/framing: portrait close-up, directly facing camera, entire hair/head visible, face large and centered, crop at base of neck so absolutely no clothing appears. Natural skin texture. A single believable face, not a split face.
Avoid: clothing, shoulders, uniforms, costumes, jewelry, iconic makeup, performance settings, hats, glasses, props, logos, text, watermark, decorative frames, screenshot UI. This is a game illustration rather than an authentic celebrity photograph.
```

## Jennifer Aniston

Output: game/assets/face-jennifer-aniston.png

```text
Use case: compositing
Asset type: birthday quiz guessing face portrait, deliberately fictional face morph.
Input images: Image 1 is Sara's face identity reference; Image 2 is supporting Sara reference. Use only her facial identity, no clothing or environment from either input.
Primary request: Create one seamless photorealistic face composite blending Sara with Jennifer Aniston. Keep Jennifer Aniston's recognizable angular cheekbones, elongated nose shape, jaw outline, brow line and straight honey-blonde center-part hair. Merge Sara's recognizable eyes, eyelid shape, mouth and gentle smile into those celebrity facial proportions, a balanced hybrid so guests can recognize both people. The celebrity must remain recognizable by the face, not by props or clothing. Not just Sara wearing celebrity hair.
Scene/backdrop: plain matte medium gray studio background, consistent neutral soft lighting.
Composition/framing: portrait close-up, directly facing camera, entire hair/head visible, face large and centered, crop at base of neck so absolutely no clothing appears. Natural skin texture. A single believable face, not a split face.
Avoid: clothing, shoulders, uniforms, costumes, jewelry, iconic makeup, performance settings, hats, glasses, props, logos, text, watermark, decorative frames, screenshot UI. This is a game illustration rather than an authentic celebrity photograph.
```

## Johnny Depp

Output: game/assets/face-johnny-depp.png

```text
Use case: compositing
Asset type: birthday quiz guessing face portrait, deliberately fictional face morph.
Input images: Image 1 is Sara's face identity reference; Image 2 is supporting Sara reference. Use only her facial identity, no clothing or environment from either input.
Primary request: Create one seamless photorealistic face composite blending Sara with Johnny Depp. Keep Johnny Depp's recognizable angular cheekbones, narrow jaw shape, nose, dark hair and light facial stubble, no glasses or hats. Merge Sara's recognizable eyes, eyelid shape, mouth and gentle smile into those celebrity facial proportions, a balanced hybrid so guests can recognize both people. The celebrity must remain recognizable by the face, not by props or clothing. Not just Sara wearing celebrity hair.
Scene/backdrop: plain matte medium gray studio background, consistent neutral soft lighting.
Composition/framing: portrait close-up, directly facing camera, entire hair/head visible, face large and centered, crop at base of neck so absolutely no clothing appears. Natural skin texture. A single believable face, not a split face.
Avoid: clothing, shoulders, uniforms, costumes, jewelry, iconic makeup, performance settings, hats, glasses, props, logos, text, watermark, decorative frames, screenshot UI. This is a game illustration rather than an authentic celebrity photograph.
```


## Targeted refinement

One iteration strengthened celebrity structure for Beyoncé and Tom Cruise. Jennifer Aniston refinement was rejected by safety service (public-figure moderation), so original remains. Johnny Depp initial call returned no image; no retry was made.

### Beyoncé

```text
Use case: compositing. Edit this quiz face morph. Image 1 is current morph edit target, Image 2 is Sara reference. The current portrait is too close to Sara; strengthen Beyoncé's recognizable facial structure substantially. Result must read clearly as Beyoncé with Sara's eye shape and a touch of her smile. Retain Beyoncé's recognizable oval face structure, cheekbones, nose bridge, sculpted brow line and long honey-brown hair. In particular replace current Sara-like nose, cheekbones, brows and jaw with the recognizable Beyoncé proportions; keep only Sara's eyes and subtle lip shape merged naturally. Aim 75% recognizable celebrity structure and 25% Sara influence. Keep photorealistic texture, seamless single face, gray background, same tight head-only composition, no shoulders or clothing, no props, no jewelry, no text.
```

### Tom Cruise

```text
Use case: compositing. Edit this quiz face morph. Image 1 is current morph edit target, Image 2 is Sara reference. The current portrait is too close to Sara; strengthen Tom Cruise's recognizable facial structure substantially. Result must read clearly as Tom Cruise with Sara's eye shape and a touch of her smile. Retain Tom Cruise's recognizable dark short brushed-back hair, strong broad jaw, prominent nose bridge and facial proportions. In particular replace current Sara-like nose, cheekbones, brows and jaw with the recognizable Tom Cruise proportions; keep only Sara's eyes and subtle lip shape merged naturally. Aim 75% recognizable celebrity structure and 25% Sara influence. Keep photorealistic texture, seamless single face, gray background, same tight head-only composition, no shoulders or clothing, no props, no jewelry, no text.
```

### Jennifer Aniston

```text
Use case: compositing. Edit this quiz face morph. Image 1 is current morph edit target, Image 2 is Sara reference. The current portrait is too close to Sara; strengthen Jennifer Aniston's recognizable facial structure substantially. Result must read clearly as Jennifer Aniston with Sara's eye shape and a touch of her smile. Retain Jennifer Aniston's recognizable angular cheekbones, elongated nose shape, jaw outline, brow line and straight honey-blonde center-part hair. In particular replace current Sara-like nose, cheekbones, brows and jaw with the recognizable Jennifer Aniston proportions; keep only Sara's eyes and subtle lip shape merged naturally. Aim 75% recognizable celebrity structure and 25% Sara influence. Keep photorealistic texture, seamless single face, gray background, same tight head-only composition, no shoulders or clothing, no props, no jewelry, no text.
```

## Visual QA

- Beyoncé: moderate resemblance; Sara features still prominent. Face-only, neutral backdrop, no clothing.
- Tom Cruise: stronger recognizable nose/jaw/brow structure with Sara eyes/lips. Face-only, neutral backdrop, no clothing.
- Jennifer Aniston: weak celebrity resemblance; reserve candidate for host preview, not confidently ready for fair guessing.
