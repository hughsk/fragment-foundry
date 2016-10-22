# Let's Draw a Square

``` glsl
#pragma display
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
