import '../sass/style.scss';

import * as THREE from 'three';
import fShader from './../shaders/fragment.glsl';
import fEdgesShader from './../shaders/fragmentEdges.glsl';
import fPointsShader from './../shaders/fragmentPoints.glsl';
import vShader from './../shaders/vertex.glsl';

const canvasContainer = document.querySelector(".container");

const renderer = new THREE.WebGLRenderer({
    antialias: true
});
canvasContainer.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();
const group = new THREE.Group();

const geometry = new THREE.IcosahedronGeometry( 1, 3);

const materialCover = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    uniforms: {
        uTime: {
            type: 'f',
            value: 0.
        }
    },
    fragmentShader: fShader,
    vertexShader: vShader
});

const ico =  new THREE.Mesh(geometry, materialCover);
ico.position.set(0, 0, 0);

group.add(ico);

const edgesGeometry = new THREE.EdgesGeometry(geometry);

const materialEdge = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    uniforms: {
        uTime: {
            type: 'f',
            value: 0.
        }
    },
    fragmentShader: fEdgesShader,
    vertexShader: vShader,
    side: THREE.DoubleSide
    //wireframe: true
});

const icoEdge =  new THREE.LineSegments(edgesGeometry, materialEdge);
icoEdge.position.set(0, 0, 0);
icoEdge.scale.set(1.001, 1.001, 1.001);

group.add(icoEdge);

const materialPoints = new THREE.ShaderMaterial({
    extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
    },
    uniforms: {
        uTime: {
            type: 'f',
            value: 0.
        }
    },
    fragmentShader: fPointsShader,
    vertexShader: vShader,
    transparent: true,
    side: THREE.DoubleSide
});

const icoPoints =  new THREE.Points(geometry, materialPoints);
icoPoints.position.set(0, 0, 0);
icoPoints.scale.set(1.05, 1.05, 1.05);

group.add(icoPoints);

scene.add(group);

/*const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(-1, 2, 4);
scene.add(light);*/

requestAnimationFrame(animate);

function animate(time) {
    time *= .001;
    materialCover.uniforms.uTime.value = time;
    materialEdge.uniforms.uTime.value = time;
    materialPoints.uniforms.uTime.value = time;

    if(resizeCanvas(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    group.rotation.set(time*0.1, time*0.1, 0);
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}

function resizeCanvas(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = canvas.clientWidth * pixelRatio | 0;
    const height = canvas.clientHeight * pixelRatio | 0;
    const needResize = canvas.width !== width || canvas.height !== height;
    if(needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}