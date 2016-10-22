#pragma question
//
// Change this shader (displayed in the top-left box) to
// make it green instead of red. The correct answer's result
// is displayed in the bottom-left box.
//
// Note you might want to read through the information on the
// right to get familiar with the basics first!
//
vec4 green = vec4(0, 1, 0, 1);
vec4 blue = vec4(0, 0, 1, 1);
vec4 red = vec4(1, 0, 0, 1);

void main() {
  gl_FragColor = red;
}
#pragma solution
vec4 green = vec4(0, 1, 0, 1);
vec4 blue = vec4(0, 0, 1, 1);
vec4 red = vec4(1, 0, 0, 1);

void main() {
  gl_FragColor = green;
}
