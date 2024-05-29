import * as THREE from "three"
import "./style.css"
import gsap from "gsap"
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
light.intensity = 1.25

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20

scene.add(mesh, camera, light)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene, camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = false
controls.autoRotateSpeed = 5

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

// timeline intro
const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
tl.fromTo("nav", { y: "100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: "0%" }, { opacity: "100%" })

//mouse animation color
let mouseDown = false
let rgb = [12, 23, 55]
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

// update color mesh
window.addEventListener("mousemove", (e) => {
  if (mouseDown) {
    rgb = [Math.round((e.pageX / sizes.width) * 255), Math.round((e.pageY / sizes.height) * 255), 150]
    const normalizedRGB = [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255] // Normalize values
    gsap.to(mesh.material.color, { r: normalizedRGB[0], g: normalizedRGB[1], b: normalizedRGB[2] })
  }
})
