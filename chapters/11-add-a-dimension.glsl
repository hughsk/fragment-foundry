#pragma prefix
uniform vec2 iResolution;
uniform float iGlobalTime;

float getDistanceFromPoint(vec3 point);
vec3 draw_line(float d);
float draw_solid(float d);
vec3 draw_distance(float d, vec2 p);

mat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {
  vec3 rr = vec3(sin(roll), cos(roll), 0.0);
  vec3 ww = normalize(target - origin);
  vec3 uu = normalize(cross(ww, rr));
  vec3 vv = normalize(cross(uu, ww));

  return mat3(uu, vv, ww);
}

vec3 calcNormal(vec3 pos, float eps) {
  const vec3 v1 = vec3( 1.0,-1.0,-1.0);
  const vec3 v2 = vec3(-1.0,-1.0, 1.0);
  const vec3 v3 = vec3(-1.0, 1.0,-1.0);
  const vec3 v4 = vec3( 1.0, 1.0, 1.0);

  return normalize( v1 * getDistanceFromPoint( pos + v1*eps ) +
                    v2 * getDistanceFromPoint( pos + v2*eps ) +
                    v3 * getDistanceFromPoint( pos + v3*eps ) +
                    v4 * getDistanceFromPoint( pos + v4*eps ) );
}

vec3 getRay(vec3 origin, vec3 target, vec2 screenPos, float lensLength) {
  mat3 camMat = calcLookAtMatrix(origin, target, 0.0);
  return normalize(camMat * vec3(screenPos, lensLength));
}

float intersectPlane(vec3 ro, vec3 rd, vec3 nor, float dist) {
  float denom = dot(rd, nor);
  float t = -(dot(ro, nor) + dist) / denom;

  return t;
}

#pragma question
float getDistanceFromPoint(vec3 point) {
  return length(point) - 0.25;
}
#pragma solution
float getDistanceFromPoint(vec3 point) {
  return length(point) - 0.25;
}
#pragma suffix
void main() {
  float time = iGlobalTime * 0.1;
  vec2 uv = 2.0 * gl_FragCoord.xy / iResolution - 1.0;
  vec3 ro = vec3(sin(time), 1.0, cos(time));
  vec3 ta = vec3(0);
  vec3 rd = getRay(ro, ta, uv, 2.0);

  float t = -1.0;
  float mind = 0.01;
  float maxd = 10.0;
  float latest = 1.0;
  for (int i = 0; i < 30; i++) {
    if (latest < mind || t > maxd) break;
    t += (latest = getDistanceFromPoint(ro + rd * t));
  }

  float tPlane = intersectPlane(ro, rd, vec3(0, 1, 0), 0.0);

  if (tPlane > -0.5 && tPlane < t) {
    vec3 pos = ro + rd * tPlane;
    gl_FragColor = vec4(draw_distance(getDistanceFromPoint(pos) + 0.05, pos.xz), 1);
  } else
  if (t > maxd) {
    gl_FragColor = vec4(0, 0, 0, 1);
  } else {
    vec3 pos = ro + rd * t;
    vec3 normal = calcNormal(pos, 0.002);

    gl_FragColor = vec4(normal * 0.5 + 0.5, 1);
  }
}

vec3 draw_line(float d) {
  const float aa = 3.0;
  const float thickness = 0.0025;
  return vec3(smoothstep(0.0, aa / iResolution.y, max(0.0, abs(d) - thickness)));
}

float draw_solid(float d) {
  return smoothstep(0.0, 3.0 / iResolution.y, max(0.0, d));
}

vec3 draw_distance(float d, vec2 p) {
  float t = clamp(d * 0.85, 0.0, 1.0);
  vec3 grad = mix(vec3(1, 0.8, 0.5), vec3(0.3, 0.8, 1), t);

  float d0 = abs(1.0 - draw_line(mod(d + 0.1, 0.2) - 0.1).x);
  float d1 = abs(1.0 - draw_line(mod(d + 0.025, 0.05) - 0.025).x);
  float d2 = abs(1.0 - draw_line(d).x);
  vec3 rim = vec3(max(d2 * 0.85, max(d0 * 0.25, d1 * 0.06125)));

  grad -= rim;
  grad -= mix(vec3(0.05, 0.35, 0.35), vec3(0.0), draw_solid(d));

  return grad;
}
