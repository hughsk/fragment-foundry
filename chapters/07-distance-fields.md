# Distance Functions

Drawing out shapes with booleans is all well and good, but it's not very flexible. There's another technique which allows us a whole bunch of flexibility, and it's the trick behind most of the demos you'll see on [Shadertoy](https://shadertoy.com/).

## Signed Distance Functions

Yep, those words probably make a lot less sense when they're put together like that.

To start: a **distance function** takes a point as input and returns the distance from a surface as output. In GLSL, you'd mark up a 2D Distance Function like so:

`float distanceFn(vec2 position);`

A **signed distance function** (SDF) is very similar, but it returns a *negative* value when it's inside the surface. You can now very quickly draw out that shape in 2D by checking if the SDF's value is less than zero.

Here's an SDF for a point at `(0, 0)`:

`length(position);`

You can subtract values from the SDF to make it grow outwards. This way you can make a circle at `(0, 0)`:

`length(position) - 1.0;`

Try it out with different values in the exercise!
