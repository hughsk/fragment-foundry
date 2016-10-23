# RGBA Color

Fragment shaders use RGBA color for describing color: each pixel has a Red, Green, Blue and Alpha (opacity) value which when combined can represent any visible colour.

In GLSL colours are represented as *vectors*:

* `vec2(brightness, alpha)`
* `vec3(red, green, blue)`
* `vec4(red, green, blue, alpha)`

For example:

* Combine *red* and *green* to get *yellow*.
* Combine *green* and *blue* to get *cyan*.
* Combine *red* and *blue* to get *magenta*.

GLSL vectors are a special type of array where each of the 2–4 values is a number. Vectors in GLSL are first-class citizens, and using them correctly is key to making the most of GLSL's potential. More on that later...
