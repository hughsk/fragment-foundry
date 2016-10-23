# Primitives

Of course, all of the techniques we've just covered are not limited to circles. There's a number of primitives you can use instead! Here's a few examples:

### Circle

``` glsl
float circle(vec2 point, float radius) {
  return length(point) - radius;
}
```

### Box

``` glsl
float box(vec2 point, vec2 size) {
  vec2 d = abs(point) - size;
  return min(max(d.x,d.y),0.0) + length(max(d,0.0));
}
```

### Hexagon

``` glsl
float hexagon(vec2 point, float radius) {
  vec2 q = abs(point);
  return max((q.x * 0.866025 + q.y * 0.5), q.y) - radius;
}
```
