#pragma banTokens: vec2 x y
#pragma question
//
// Get the midpoint of `p1` and `p2` *without* using
// vec2() or any swizzling :O
//
vec2 midpoint(vec2 p1, vec2 p2) {
  return vec2(0.0);
}
#pragma solution
vec2 midpoint(vec2 p1, vec2 p2) {
  return (p1 + p2) * 0.5;
}
#pragma prefix
uniform float iGlobalTime;
uniform vec2 iResolution;

float shape_line(vec2 p, vec2 a, vec2 b);
float shape_segment(vec2 p, vec2 a, vec2 b);
float aastep(float threshold, float value);
#pragma suffix
void main() {
  vec2 uv = 2.0 * gl_FragCoord.xy / iResolution - 1.0;
  vec2 p1 = vec2(cos(iGlobalTime * 0.05), sin(iGlobalTime * 0.05)) * 0.9;
  vec2 p2 = vec2(cos(iGlobalTime * 0.06), sin(iGlobalTime * 0.06)) * -0.3;
  vec2 p3 = midpoint(p1, p2);

  float d = shape_segment(uv, p1, p2) - 0.01;
  d = min(d, length(uv - p1) - 0.05);
  d = min(d, length(uv - p2) - 0.05);
  d = min(d, length(uv - p3) - 0.1);

  float d2 = 5.0;
  d2 = min(d2, shape_line(uv, vec2(1, 0), vec2(-1, 0)) - 0.005);
  d2 = min(d2, shape_line(uv, vec2(0, 1), vec2(0, -1)) - 0.005);

  vec3 color = vec3(1);

  color -= 1.0 - aastep(0.0, d);
  color -= (1.0 - aastep(0.0, d2)) * vec3(0, 0.35, 0.4);
  gl_FragColor = vec4(color, 1);
}

float shape_line(vec2 p, vec2 a, vec2 b) {
  vec2 dir = b - a;
  return abs(dot(normalize(vec2(dir.y, -dir.x)), a - p));
}

float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
    return step(threshold, value);
  #endif
}

float shape_segment(vec2 p, vec2 a, vec2 b) {
  float d = shape_line(p, a, b);
  float d0 = dot(p - b, b - a);
  float d1 = dot(p - a, b - a);
  return d1 < 0.0 ? length(a - p) : d0 > 0.0 ? length(b - p) : d;
}
