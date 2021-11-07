import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui";
const gui = new dat.GUI();
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
// const aspectRatio = sizes.width / sizes.height;

const cursor = {
  x: 0,
  y: 0,
};

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("onStart");
};
loadingManager.onLoad = () => {
  console.log("onLoad");
};
loadingManager.onProgress = () => {
  console.log("onProgress");
};
loadingManager.onError = (e) => {
  console.log(e);
};
const textureLoader = new THREE.TextureLoader(loadingManager);
// const particleTexture = textureLoader.load("/textures/particles/11.png");
const asteroidTexture = textureLoader.load("./textures/planets/asteroid2.jpeg");
const sunTexture = textureLoader.load("./textures/planets/sunTexture.jpg");
const mercuryTexture = textureLoader.load(
  "./textures/planets/mercuryTexture.jpg"
);
const venusTexture = textureLoader.load("./textures/planets/venusTexture.jpg");
const earthTexture = textureLoader.load("./textures/planets/earthTexture.jpg");
const marsTexture = textureLoader.load("./textures/planets/marsTexture.jpg");
const jupiterTexture = textureLoader.load(
  "./textures/planets/jupiterTexture.jpg"
);
const saturnTexture = textureLoader.load(
  "./textures/planets/saturnTexture.jpg"
);
const saturnRingTexture = textureLoader.load(
  "./textures/planets/saturnRingTexture.png"
);
const uranusTexture = textureLoader.load(
  "./textures/planets/uranusTexture.jpg"
);
const neptuneTexture = textureLoader.load(
  "./textures/planets/neptuneTexture.jpg"
);
const starMilkyWayTexture = textureLoader.load(
  "./textures/planets/starsMilkyWayTexture.jpg"
);

////////////////            Lights           ////////////////////////////////////

const light = new THREE.AmbientLight(0x404040, 0.8); // soft white light
gui.add(light, "intensity").min(0).max(1).step(0.1);
// Light from sun
const pointLight = new THREE.PointLight(0xffffff, 1, 350);
pointLight.position.set(0, 0, 0);

// Light for sun
const spotLight1 = new THREE.SpotLight(0xffffff, 1, 150, 0.8);
spotLight1.position.set(56, 0, 0);

const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
// scene.add(spotLightHelper1);

const spotLight2 = new THREE.SpotLight(0xffffff, 1, 150, 0.8);
spotLight2.position.set(-56, 0, 0);

const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
// scene.add(spotLightHelper2);

const spotLight3 = new THREE.SpotLight(0xffffff, 1, 150, 0.8);
spotLight3.position.set(0, 56, 0);

const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
// scene.add(spotLightHelper3);

const spotLight4 = new THREE.SpotLight(0xffffff, 1, 150, 0.8);
spotLight4.position.set(0, -56, 0);

const spotLightHelper4 = new THREE.SpotLightHelper(spotLight4);
// scene.add(spotLightHelper4);

const spotLight5 = new THREE.SpotLight(0xffffff, 1, 150, 0.8);
spotLight5.position.set(0, 0, 56);

const spotLightHelper5 = new THREE.SpotLightHelper(spotLight5);
// scene.add(spotLightHelper5);

const spotLight6 = new THREE.SpotLight(0xffffff, 1, 150, 0.8);
spotLight6.position.set(0, 0, -56);

const spotLightHelper6 = new THREE.SpotLightHelper(spotLight6);
// scene.add(spotLightHelper6);

const sphereSize = 5;
const pointLightHelper = new THREE.PointLightHelper(
  pointLight,
  sphereSize,
  "white"
);
scene.add(pointLightHelper);
scene.background = starMilkyWayTexture;

////////////////            Geometry           ////////////////////////////////////

const sunGeometry = new THREE.SphereBufferGeometry(25, 32, 16);
const sunMaterial = new THREE.MeshStandardMaterial({ color: "yellow" });
sunMaterial.map = sunTexture;
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.x = 0;

const mercuryGeometry = new THREE.SphereBufferGeometry(2, 32, 16);
const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.x = 60;

const venusGeometry = new THREE.SphereBufferGeometry(3, 32, 16);
const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.x = 65;

const earthGeometry = new THREE.SphereBufferGeometry(6, 32, 16);
const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 76;

const marsGeometry = new THREE.SphereBufferGeometry(4, 32, 16);
const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = 90;

const jupiterGeometry = new THREE.SphereBufferGeometry(18, 32, 16);
const jupiterMaterial = new THREE.MeshStandardMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.x = 130;

const saturnGeometry = new THREE.SphereBufferGeometry(15, 32, 16);
const saturnMaterial = new THREE.MeshStandardMaterial({ map: saturnTexture });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.x = 180;

const ringGeometry = new THREE.TorusBufferGeometry(22, 2.5, 2, 200);

const ringMaterial = new THREE.MeshStandardMaterial({ map: saturnRingTexture });

const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.position.x = 180;
ring.rotation.x = 90;

const uranusGeometry = new THREE.SphereBufferGeometry(10, 32, 16);
const uranusMaterial = new THREE.MeshStandardMaterial({ map: uranusTexture });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.x = 240;

const neptuneGeometry = new THREE.SphereBufferGeometry(8, 32, 16);
const neptuneMaterial = new THREE.MeshStandardMaterial({ map: neptuneTexture });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.x = 290;

// PARTICLES

const particleGeometry = new THREE.SphereBufferGeometry(100, 64, 64);
const count = 1000;

// const positions = new Float32Array(count * 3);
// const colors = new Float32Array(count * 3);
// for (let i = 0; i < count * 3; i++) {
//   positions[i] = (Math.random() - 0.5) * 400;
//   // colors[i] = Math.random();
// }

// particleGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3)
// );

// particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particleMaterial = new THREE.PointsMaterial();
particleMaterial.size = 0.5;
particleMaterial.sizeAttenuation = true;
// particleMaterial.color = new THREE.Color("#ff88cc");
// particleMaterial.alphaMap = particleTexture;
particleMaterial.transparent = true;
particleMaterial.alphaMap = asteroidTexture;
particleMaterial.alphaTest = 0.001;
// particleMaterial.depthTest = false;
// particleMaterial.depthWrite = false;
// particleMaterial.blending = THREE.AdditiveBlending;
// particleMaterial.vertexColors = true;
//Points
const particles = new THREE.Points(particleGeometry, particleMaterial);
particles.position.y = 10;

const group = new THREE.Group();
group.add(sun);
group.add(mercury);
group.add(venus);
group.add(earth);
group.add(mars);
group.add(jupiter);
group.add(saturn);
group.add(ring);
group.add(uranus);
group.add(neptune);
group.add(particles);
group.add(light);
group.add(pointLight);
group.add(spotLight1);
group.add(spotLight2);
group.add(spotLight3);
group.add(spotLight4);
group.add(spotLight5);
group.add(spotLight6);
group.add(pointLightHelper);

scene.add(group);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 200;
gui.add(camera.position, "z", 0, 500, 20);
scene.lookAt(group.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
let clock = new THREE.Clock();

// const axesHelper = new THREE.AxesHelper(100);
// scene.add(axesHelper);

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// DAT.GUI

const rotate = () => {
  // animation
  const elapsedTime = clock.getElapsedTime();

  // Self Rotate
  sun.rotation.y = elapsedTime * 1.997;
  mercury.rotation.y = elapsedTime * 0.108;
  venus.rotation.y = -(elapsedTime * 0.065);
  earth.rotation.y = elapsedTime * 1.574;
  mars.rotation.y = elapsedTime * 0.866;
  jupiter.rotation.y = elapsedTime * 4.558;
  saturn.rotation.y = elapsedTime * 3.684;
  ring.rotation.z = -(elapsedTime * 3.684);
  uranus.rotation.y = elapsedTime * 1.479;
  neptune.rotation.y = elapsedTime * 0.971;

  //Rotate Around Sun
  mercury.position.x = Math.cos(elapsedTime * 0.4787) * 60;
  mercury.position.z = Math.sin(elapsedTime * 0.4787) * 60;
  venus.position.x = Math.cos(elapsedTime * 0.3502) * 65;
  venus.position.z = Math.sin(elapsedTime * 0.3502) * 65;
  earth.position.x = Math.cos(elapsedTime * 0.2978) * 76;
  earth.position.z = Math.sin(elapsedTime * 0.2978) * 76;
  mars.position.x = Math.cos(elapsedTime * 0.2407) * 90;
  mars.position.z = Math.sin(elapsedTime * 0.2407) * 90;
  jupiter.position.x = Math.cos(elapsedTime * 0.1307) * 130;
  jupiter.position.z = Math.sin(elapsedTime * 0.1307) * 130;
  saturn.position.x = Math.cos(elapsedTime * 0.0969) * 180;
  saturn.position.z = Math.sin(elapsedTime * 0.0969) * 180;
  ring.position.x = Math.cos(elapsedTime * 0.0969) * 180;
  ring.position.z = Math.sin(elapsedTime * 0.0969) * 180;
  uranus.position.x = Math.cos(elapsedTime * 0.0681) * 240;
  uranus.position.z = Math.sin(elapsedTime * 0.0681) * 240;
  neptune.position.x = Math.cos(elapsedTime * 0.0474) * 290;
  neptune.position.z = Math.sin(elapsedTime * 0.0474) * 290;

  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5 * 5;
  // camera.position.y = cursor.y * 5;
  // camera.lookAt(group.position);

  particles.rotation.x = elapsedTime * 0.01;
  particles.rotation.y = elapsedTime * 0.01;
  particles.rotation.z = elapsedTime * 0.01;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(rotate);
};

rotate();
