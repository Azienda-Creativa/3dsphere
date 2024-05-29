import * as THREE from "three"

const scene = new THREE.Scene()

// create and add 3D object , light and camera to scene
const geometry = new THREE.SphereGeometry(3, 64, 64)
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
})
const mesh = new THREE.Mesh(geometry, material)

const light = new THREE.PointLight(0xffffff, 2, 60)
light.position.set(0, 10, 10)

const camera = new THREE.PerspectiveCamera(45, 800 / 600)
camera.position.z = 20

scene.add(mesh, camera, light)

//Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(800, 600)
renderer.render(scene, camera)
