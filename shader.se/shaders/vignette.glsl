uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uVignetteIntensity;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 center = uv - 0.5;
  vec3 color = texture2D(tDiffuse, uv).rgb;

  // 暗角效果
  float dist = length(center);
  float vignette = 1.0 - smoothstep(0.3, 0.9, dist);
  color *= mix(1.0, vignette, uVignetteIntensity);

  gl_FragColor = vec4(color, 1.0);
}