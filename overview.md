## Syntax

**Fix the following shaders:**

``` glsl
void main() {
  float red = 1.0
  gl_FragColor = vec4(red, 0, 0, 1);
```

Correct! Functions must start and end with curly braces: `{` and `}`, and lines must end with a semicolon.

## RGB Colour

**Change the following variables so that they output the same colour as their name:**

``` glsl
vec3 red = vec3(0, 0, 0);
vec3 green = vec3(0, 0, 0);
vec3 blue = vec3(0, 0, 0);
vec3 cyan = vec3(0, 0, 0);
vec3 magenta = vec3(0, 0, 0);
vec3 yellow = vec3(0, 0, 0);
vec3 white = vec3(0, 0, 0);
```

## Swizzling

**Use swizzling to change the following variables so that they output the same colour as their name *without using `vec3` constructors:***

``` glsl
vec2 swizzler = vec2(1, 0);

vec3 red = vec3(1, 0, 0);
vec3 green = vec3(0, 1, 0);
vec3 blue = vec3(0, 0, 1);
vec3 cyan = vec3(0, 1, 1);
vec3 magenta = vec3(1, 0, 1);
vec3 yellow = vec3(1, 1, 0);
vec3 white = vec3(1, 1, 1);
```

## Thinking in Parallel

``` glsl
uniform vec2 screenSize;

void main() {
  bool inBox = false;

  if (inBox) {
    gl_FragColor = vec4(0, 0, 0, 1);
  } else {
    gl_FragColor = vec4(1, 1, 1, 1);
  }
}
```

## Saving Time with Vectors

``` glsl
uniform vec2 screenSize;
uniform float radius;

void main() {
  bool inCircle = false;

  if (inCircle) {
    gl_FragColor = vec4(0, 0, 0, 1);
  } else {
    gl_FragColor = vec4(1, 1, 1, 1);
  }
}
```

## Distance Fields

``` glsl
uniform float radius;

float distanceFunction(vec2 point) {
  return 0.0;
}
```

## Moving Shapes

``` glsl
uniform float radius;
uniform vec2 circlePos;

float distanceFunction(vec2 point) {
  return length(point) - radius;
}
```

## Combining Shapes

``` glsl
uniform float radius;
uniform vec2 circle1Pos;
uniform vec2 circle2Pos;

float distanceFunction(vec2 point) {
  float circle1 = length(point - circle1Pos) - radius;
  float circle2 = length(point - circle2Pos) - radius;

  return 0.0;
}
```

## Repeating Space

``` glsl
uniform float radius;
uniform float repetition;

float distanceFunction(vec2 point) {
  return length(point) - radius;
}
```

## Let's Add a Dimension

``` glsl
uniform float radius;

float distanceFunction(vec3 point) {
  return 0.0;
}
```
