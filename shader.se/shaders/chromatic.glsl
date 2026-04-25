uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uChromaticAberration;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 center = uv - 0.5;

  // 色差效果
  float dist = length(center);
  float caStrength = uChromaticAberration * dist;
  vec2 caOffset = normalize(center) * caStrength;

  float r = texture2D(tDiffuse, uv + caOffset).r;
  float g = texture2D(tDiffuse, uv).g;
  float b = texture2D(tDiffuse, uv - caOffset).b;
  vec3 color = vec3(r, g, b);

  gl_FragColor = vec4(color, 1.0);
}