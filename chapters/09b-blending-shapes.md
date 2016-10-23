# Blending Shapes

Combining shapes using `min()` was a good start, but there's nicer approaches available to us as well.

## Smooth Minimum

Distance Functions have a lot of mathematical theory behind them: they're a type of [Implicit Function](https://en.wikipedia.org/wiki/Implicit_function). The maths go deep, but we can cherrypick useful tricks here and there from the theory. One such example is the **smooth minimum**.

A smooth minimum function takes two values as input, and returns a smoothed out value between the two. There's different types of smooth minimum with different tradeoffs, but here's a few taken from the ever-useful [iquilezles.org](http://iquilezles.org/www/articles/smin/smin.htm):

### Exponential

```
float smin( float a, float b, float k )
{
    float res = exp( -k*a ) + exp( -k*b );
    return -log( res )/k;
}
```

### Polynomial

```
float smin( float a, float b, float k )
{
    float h = clamp( 0.5+0.5*(b-a)/k, 0.0, 1.0 );
    return mix( b, a, h ) - k*h*(1.0-h);
}
```

### Power

```
float smin( float a, float b, float k )
{
    a = pow( a, k ); b = pow( b, k );
    return pow( (a*b)/(a+b), 1.0/k );
}
```
