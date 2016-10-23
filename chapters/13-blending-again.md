# Blending Shapes II

Smooth minimum also extends to 3 dimensions easily. Since it's only comparing distances you don't even need to change the function.

As a result, we can smoothly blend multiple shapes together with minimal overhead. This is an effect that's quite difficult to achieve using a traditional, triangle-based rendering setup but comes quite naturally when working with distance functions.

Here's those smooth min functions again for reference:

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
