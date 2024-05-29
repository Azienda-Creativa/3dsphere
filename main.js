import * as THREE from "three"
import "./style.css"
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js"
const scene = new THREE.Scene()
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// create and add 3D object , light and camera to scene
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.7,
})
const mesh = new THREE.Mesh(geometry, material)

const light = new THREE.PointLight("#e0e0de", 1.4, 100)
light.position.set(0, 20, 20)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20

scene.add(mesh, camera, light)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//Controls --not working! renderer.domElement
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//auto-resize
window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

// animation
const loop = () => {
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
