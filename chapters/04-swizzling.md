# Swizzling

``` glsl
#pragma display
vec3 red = vec3(1, 0, 0);
vec3 green = vec3(0, 1, 0);
vec3 blue = vec3(0, 0, 1);
vec3 cyan = vec3(0, 1, 1);
vec3 magenta = vec3(1, 0, 1);
vec3 yellow = vec3(1, 1, 0);
vec3 white = vec3(1, 1, 1);

float aastep (float threshold, float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return smoothstep(threshold-afwidth, threshold+afwidth, value);
}

#define PI 3.14159265359
vec2 rt (float r, float a) {
  a *= PI * 2.0;
  return r * vec2(sin(a), cos(a));
}

void main() {
  vec3 color = vec3(0);
  vec2 p = gl_FragCoord.xy / 400.0 * 2.0 - 1.0;

  color += aastep(0.0, 0.1 - length(p - rt(0.5, 1.0 / 3.0))) * red;
  color += aastep(0.0, 0.1 - length(p - rt(0.5, 2.0 / 3.0))) * green;
  color += aastep(0.0, 0.1 - length(p - rt(0.5, 3.0 / 3.0))) * blue;

  color += aastep(0.0, 0.125 - length(p - rt(0.5, 1.5 / 3.0))) * yellow;
  color += aastep(0.0, 0.125 - length(p - rt(0.5, 2.5 / 3.0))) * cyan;
  color += aastep(0.0, 0.125 - length(p - rt(0.5, 3.5 / 3.0))) * magenta;

  color += aastep(0.0, 0.25 - length(p)) * white;

  gl_FragColor = vec4(color, 1);
}
```
