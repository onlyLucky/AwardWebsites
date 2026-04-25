uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uScanlineIntensity;
uniform vec2 uResolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec3 color = texture2D(tDiffuse, uv).rgb;

  // 扫描线效果
  float scanline = sin(uv.y * uResolution.y * 3.14159) * 0.5 + 0.5;
  scanline = pow(scanline, uScanlineIntensity);
  color *= mix(1.0, scanline, 0.3);

  gl_FragColor = vec4(color, 1.0);
}