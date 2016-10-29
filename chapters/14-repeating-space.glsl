#pragma question
//
// Try and recreate the solution by eyeballing it :)
//
float getDistanceFromPoint(vec3 point) {
  float period = 0.4;
  float radius = 0.1;
  return 0.0;
}
#pragma solution
float getDistanceFromPoint(vec3 point) {
  float period = 0.4;
  float radius = 0.1;
  point.xz = mod(point.xz + period * 0.5, period) - period * 0.5;
  return length(point) - radius;
}
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
#pragma suffix
float beckmannDistribution(float x, float roughness) {
  float NdotH = max(x, 0.0001);
  float cos2Alpha = NdotH * NdotH;
  float tan2Alpha = (cos2Alpha - 1.0) / cos2Alpha;
  float roughness2 = roughness * roughness;
  float denom = 3.141592653589793 * roughness2 * cos2Alpha * cos2Alpha;
  return exp(tan2Alpha / roughness2) / denom;
}

float cookTorranceSpecular(
  vec3 lightDirection,
  vec3 viewDirection,
  vec3 surfaceNormal,
  float roughness,
  float fresnel) {

  float VdotN = max(dot(viewDirection, surfaceNormal), 0.0);
  float LdotN = max(dot(lightDirection, surfaceNormal), 0.0);

  //Half angle vector
  vec3 H = normalize(lightDirection + viewDirection);

  //Geometric term
  float NdotH = max(dot(surfaceNormal, H), 0.0);
  float VdotH = max(dot(viewDirection, H), 0.000001);
  float x = 2.0 * NdotH / VdotH;
  float G = min(1.0, min(x * VdotN, x * LdotN));

  //Distribution term
  float D = beckmannDistribution(NdotH, roughness);

  //Fresnel term
  float F = pow(1.0 - VdotN, fresnel);

  //Multiply terms and done
  return  G * F * D / max(3.14159265 * VdotN * LdotN, 0.000001);
}

void main() {
  float time = iGlobalTime * 0.0125;
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
    gl_FragColor = vec4(draw_distance(getDistanceFromPoint(pos) - 0.0125, pos.xz), 1);
  } else
  if (t > maxd) {
    gl_FragColor = vec4(0, 0, 0, 1);
  } else {
    vec3 pos = ro + rd * t;
    vec3 normal = calcNormal(pos, 0.002);
    vec3 ldir = normalize(vec3(0, 1, 0.2));
    float mag = max(0.2, dot(normal, ldir));

    mag = pow(mag, 0.3545);
    mag *= 1.75;
    //mag = 0.0;

    gl_FragColor = vec4(mag * vec3(0.95, 0.45, 0.15), 1);
    gl_FragColor.rgb += cookTorranceSpecular(ldir, -rd, normal, 1.0, 3.25) * 1.5;
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

  grad -= rim * clamp(1.25 - d, 0.0, 1.0);
  grad -= 1.0 - clamp(1.25 - d * 0.25, 0.0, 1.0);
  grad -= mix(vec3(0.05, 0.35, 0.35), vec3(0.0), draw_solid(d));

  return grad;
}
