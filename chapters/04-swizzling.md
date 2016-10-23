# Swizzling

Swizzling — beyond being a great name — is a nice feature in GLSL for accessing the properties of a vector.

You can get a single `float` from a vector using `.r`, `.g`, `.b` or `.a`. For example:

* `vec4(1, 2, 3, 4).r == 1.0`
* `vec4(1, 2, 3, 4).g == 2.0`
* `vec4(1, 2, 3, 4).b == 3.0`
* `vec4(1, 2, 3, 4).a == 4.0`

*But* you can also create new vectors from combinations of their components like so:

* `vec4(1, 2, 3, 4).rb == vec3(1, 3)`
* `vec4(1, 2, 3, 4).rgg == vec3(1, 2, 2)`
* `vec4(1, 2, 3, 4).ggab == vec3(2, 2, 4, 3)`

In addition to `.rgba`, you can also use `.xyzw`. These are equivalent, but if you're using the vector for a position instead of a color it's easy to reason about when using the latter.

* `vec4(1, 2, 3, 4).xz == vec3(1, 3)`
* `vec4(1, 2, 3, 4).xyy == vec3(1, 2, 2)`
* `vec4(1, 2, 3, 4).yywz == vec3(2, 2, 4, 3)`

In this exercise, you can use the `sw` variable to create new colors:

* `vec3 yellow = sw.xxy;`

*P.S. don't forget to use semicolons at the end of each line: they're required in GLSL :')*
