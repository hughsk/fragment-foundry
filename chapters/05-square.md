# Let's Draw a Square

OK, time to start drawing things proper!

Fragment shaders are run on each pixel: they're not at all aware of their surrounding pixels. This is a challenging constraint at times, but also why they're so speedy.

## Boolean Comparisons

You can compare `float` values (but not vectors) using run-of-the-mill boolean operators, e.g.:

* `bool value = uv.x > 1.05;`
* `bool value = uv.x <= 0.0;`
* `bool value = uv.x != 0.5;`
* `bool value = uv.y != 0.0 && uv.x != 0.0;`
* `bool value = uv.y != 0.0 || uv.x != 0.0;`

## Scaling to Fit

Fragment shaders also don't have much to use to find out where they are on the screen either. `gl_FragCoord.xy` will give you the exact position in pixels, but if you resize the screen the size of the object won't change to fit it.

So we pass in a *uniform* value that contains the size, or resolution, of the screen. A uniform is a value passed in from JavaScript that is the same for every pixel in the shader. It's useful for giving the fragment shader some context to work with: for example, you might also pass in the time in seconds to animate the output.

By dividing `gl_FragCoord.xy` by `iResolution`, we can get a value between 0 and 1 for the pixel's position on the screen:

`vec2 p = gl_FragCoord.xy / iResolution;`

Note that in our example we've scaled it slightly differently: the top-left is `vec2(-1, -1)` and the bottom-right is `vec2(+1, +1)`.
