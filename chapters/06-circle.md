# Vectors and Builtins

``` glsl
#pragma display
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
