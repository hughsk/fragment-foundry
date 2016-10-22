# Vectors and Builtins

OK, we've drawn a square — next, a circle.

You can check if a point is in a circle by seeing if its `distance` from the circle's center is smaller than the circle's `radius`. In GLSL we measure distance using the `length()` function:

`float d = length(p2 - p1)`

Much more concise than it would be in JavaScript!

All that's left to do is compare that distance to the radius and you should be able to draw that circle out to the screen. Good luck :)
