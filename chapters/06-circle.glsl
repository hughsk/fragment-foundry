#pragma question
uniform vec2 iResolution;
uniform float iGlobalTime;

//
// Let's draw a circle in the center of the screen!
//
// Its center should be at uv == (0, 0), and its `radius`
// should match the value passed into `inCircle`.
//
bool inCircle(vec2 uv, float radius) {
  return false;
}

// If it's starting to look like there's a lot going on in
// main(), don't worry! You don't need to change it, it's
// just doing some heavy lifting for you. Leaving it in
// here in case it's helpful for you :)
void main() {
  vec2 uv = 2.0 * gl_FragCoord.xy / iResolution.xy - 1.0;
  float radius = (sin(iGlobalTime * 0.25) * 0.5 + 0.5) * 0.5 + 0.3;
  if (inCircle(uv, radius)) {
    gl_FragColor = vec4(1, 0.6, 0.5, 1);
  } else {
    gl_FragColor = vec4(0.5, 0.8, 1, 1);
  }
}
#pragma solution
uniform vec2 iResolution;
uniform float iGlobalTime;

bool inCircle(vec2 uv, float radius) {
  return length(uv) < radius;
}

void main() {
  vec2 uv = 2.0 * gl_FragCoord.xy / iResolution.xy - 1.0;
  float radius = (sin(iGlobalTime * 0.25) * 0.5 + 0.5) * 0.5 + 0.3;
  if (inCircle(uv, radius)) {
    gl_FragColor = vec4(1, 0.6, 0.5, 1);
  } else {
    gl_FragColor = vec4(0.5, 0.8, 1, 1);
  }
}
