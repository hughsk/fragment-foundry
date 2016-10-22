# Maths; Sorry!

Shader programming leans on a lot of maths to get things done, so much so that most of the code you'll write deals *only* with numbers.

That's OK though! Often the math is deceptively simple, or you can copy/paste the hard bits from kind folks online such as [Íñigo Quílez](http://www.iquilezles.org/) until it gets easier. Before you know it you'll be running circles around Linear Algebra without even needing to know what Linear Algebra *is*.

## Finding the Midpoint

In addition to colors, vectors can also be used to store *positions*, like we can see in the example on the left.

The midpoint is just the average of two values, e.g.:

`(x1 + x2) / 2`

To calculate the midpoint of a vector, you just have to calculate the midpoint of each of its values:

`vec2((p1.x + p2.x) / 2.0, (p1.y + p2.y) / 2.0);`

That's a little verbose though. Can we make it shorter?

## Piecewise Operations

You can treat vectors a little like normal numbers: they can be added, multiplied, divided and subtracted just the same in GLSL!

* `p1 + p2 == vec2(p1.x + p2.x, p1.y + p2.y)`
* `p1 - p2 == vec2(p1.x - p2.x, p1.y - p2.y)`
* `p1 * p2 == vec2(p1.x * p2.x, p1.y * p2.y)`
* `p1 / p2 == vec2(p1.x / p2.x, p1.y / p2.y)`

This is called a *piecewise operation*, because it is applied to each *piece* of the vector individually.

You can even apply a piecewise operation to a vector using `float`, e.g.:

* `p1 + 1.0 == vec2(p1.x + 1.0, p2.x + 1.0)`
* `p1 - 1.0 == vec2(p1.x - 1.0, p2.x - 1.0)`
* `p1 * 5.0 == vec2(p1.x * 5.0, p2.x * 5.0)`
* `p1 / 5.0 == vec2(p1.x / 5.0, p2.x / 5.0)`

The rest, I'll leave up to you...
