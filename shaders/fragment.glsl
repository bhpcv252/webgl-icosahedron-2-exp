varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vModPosition;
varying vec3 vNormal;

uniform float uTime;

void main() {

    vec3 x = dFdx(vPosition);
    vec3 y = dFdy(vPosition);
    vec3 n = normalize(cross(x, y));

    gl_FragColor = vec4(n*vModPosition, 1.);
}
