import "../css/index.css"
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

// Green Box
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshStandardMaterial({
	color: 0x00ff00,
	roughness: 0.7,
	metalness: 0.3
})
const greenBox = new THREE.Mesh(geometry, material)
scene.add(greenBox)

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const mainLight = new THREE.DirectionalLight(0xffffff, 1)
mainLight.position.set(2, 2, 1)
scene.add(mainLight)

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(2, 2, 2)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

// Add shadow support
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05

// Clock for consistent animations
const clock = new THREE.Clock()

// Animate
function animate() {
	const elapsedTime = clock.getElapsedTime()

	// Rotate the box
	greenBox.rotation.x = elapsedTime * 0.5
	greenBox.rotation.y = elapsedTime * 0.5

	// Update controls
	controls.update()

	renderer.render(scene, camera)
	requestAnimationFrame(animate)
}

// Handle Resize
window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	renderer.setSize(sizes.width, sizes.height)
})

// Handle fullscreen
window.addEventListener("dblclick", () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen()
	} else {
		document.exitFullscreen()
	}
})

animate()
