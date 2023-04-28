varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vModPosition;
varying vec3 vNormal;

uniform float uTime;

void main() {

    float dist = length(gl_PointCoord - 0.5);
    float c = smoothstep(.45, .4, dist);
    if(c == 0.) discard;

    vec4 col = c*vec4(1., 1., 0., 1.);

    gl_FragColor = col;
}
