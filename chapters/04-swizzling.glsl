#pragma banTokens: vec3
#pragma prefix
uniform vec2 iResolution;
#pragma question
//
// Like before, ensure that the color variables listed
// below match their name.
//
// However, this time use swizzling to do so without
// using `vec3()` constructors anywhere.
//

vec2 swizzled = vec2(1, 0);

vec3 red = swizzled.yyy;
vec3 green = swizzled.yyy;
vec3 blue = swizzled.yyy;
vec3 cyan = swizzled.yyy;
vec3 magenta = swizzled.yyy;
vec3 yellow = swizzled.yyy;
vec3 white = swizzled.yyy;
#pragma solution
vec2 swizzled = vec2(1, 0);

vec3 red = swizzled.xyy;
vec3 green = swizzled.yxy;
vec3 blue = swizzled.yyx;
vec3 cyan = swizzled.yxx;
vec3 magenta = swizzled.xyx;
vec3 yellow = swizzled.xxy;
vec3 white = swizzled.xxx;
#pragma suffix
float aastep(float threshold, float value) {
  #ifdef GL_OES_standard_derivatives
    float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
    return smoothstep(threshold-afwidth, threshold+afwidth, value);
  #else
    return step(threshold, value);
  #endif
}

#define PI 3.14159265359
vec2 rt (float r, float a) {
  a *= PI * 2.0;
  return r * vec2(sin(a), cos(a));
}

vec2 squareFrame(vec2 screenSize, vec2 coord) {
  vec2 position = 2.0 * (coord.xy / screenSize.xy) - 1.0;
  if (screenSize.x > screenSize.y) {
    position.x *= screenSize.x / screenSize.y;
  } else {
    position.y *= screenSize.y / screenSize.x;
  }
  return position;
}

void main() {
  vec3 color = vec3(0.025, 0.05, 0.1);
  vec2 p = squareFrame(iResolution, gl_FragCoord.xy);

  color = mix(color, red, aastep(0.0, 0.1 - length(p - rt(0.5, 1.0 / 3.0))));
  color = mix(color, green, aastep(0.0, 0.1 - length(p - rt(0.5, 2.0 / 3.0))));
  color = mix(color, blue, aastep(0.0, 0.1 - length(p - rt(0.5, 3.0 / 3.0))));

  color = mix(color, yellow, aastep(0.0, 0.125 - length(p - rt(0.5, 1.5 / 3.0))));
  color = mix(color, cyan, aastep(0.0, 0.125 - length(p - rt(0.5, 2.5 / 3.0))));
  color = mix(color, magenta, aastep(0.0, 0.125 - length(p - rt(0.5, 3.5 / 3.0))));

  color = mix(color, white, aastep(0.0, 0.25 - length(p)));

  gl_FragColor = vec4(color, 1);
}
