import * as THREE from "three"
import "./style.css"

const scene = new THREE.Scene()

// create and add 3D object , light and camera to scene
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  metalness: 0.2,
})
const mesh = new THREE.Mesh(geometry, material)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new THREE.PointLight("white", 1, 100)
light.position.set(0, 20, 20)

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
camera.position.z = 20

scene.add(mesh, camera, light)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

//resize

window.addEventListener("resize", () => {
  //update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  //update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})

const loop = () => {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}
loop()
