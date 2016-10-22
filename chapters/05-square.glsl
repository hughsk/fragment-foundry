#pragma question
uniform vec2 iResolution;

//
// Let's draw a box in the center of the screen!
//
// It should start where uv == (-0.5, -0.5) and finish
// where uv == (+0.5, +0.5). Change the `isBox` function
// to return `true` when it's within those bounds.
//
bool inBox(vec2 uv) {
  return false;
}

void main() {
  vec2 uv = 2.0 * gl_FragCoord.xy / iResolution.xy - 1.0;
  if (inBox(uv)) {
    gl_FragColor = vec4(1, 0.6, 0.5, 1);
  } else {
    gl_FragColor = vec4(0.5, 0.8, 1, 1);
  }
}
#pragma solution
uniform vec2 iResolution;

bool inBox(vec2 uv) {
  return uv.x < 0.5 && uv.x > -0.5 && uv.y < 0.5 && uv.y > -0.5;
}

void main() {
  vec2 uv = 2.0 * gl_FragCoord.xy / iResolution.xy - 1.0;
  if (inBox(uv)) {
    gl_FragColor = vec4(1, 0.6, 0.5, 1);
  } else {
    gl_FragColor = vec4(0.5, 0.8, 1, 1);
  }
}
