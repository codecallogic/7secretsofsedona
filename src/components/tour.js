import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

const Tour = ({}) => {
  const tourRef = useRef(null);
  
  useEffect(() => {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 1
    camera.position.z = 3.5
    scene.add(camera)
    
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  
    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    window.addEventListener("resize", onWindowResize, false);

    tourRef.current.appendChild(renderer.domElement);

    // Textures
    const textureLoader = new THREE.TextureLoader()
    const matcapTexture = textureLoader.load('/matcaps/8.png') 

    // Fonts
    const loader = new FontLoader()

    loader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {

      const textGeometry = new TextGeometry( 
        '7 Secrets of Sedona', 
        {
          font: font,
          size: 0.5,
          height: 0.2,
          curveSegments: 4,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.01,
          bevelOffset: 0,
          bevelSegments: 2
        } 
      );

      textGeometry.center()
    
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
      const text = new THREE.Mesh(textGeometry, material)
      scene.add(text)

    } );

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0x00fffc, 1)
    directionalLight.position.set(1, 2, 2)
    scene.add(directionalLight)

    const material = new THREE.MeshStandardMaterial()
    material.color = new THREE.Color('green')
    material.roughness = 0.4

    // const sphere = new THREE.Mesh(
    //   new THREE.SphereGeometry(0.5, 32, 32),
    //   material
    // )
    // sphere.position.x = - 1.5

    // let geometry = new THREE.BoxGeometry();
    // let cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      // Update controls
      controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

    return () => tourRef.current.removeChild( renderer.domElement );
    
  }, [])
  
  return (
    <div ref={tourRef} id="canvas-container">
      <div className="nav">Hello</div>
    </div>
  )
}

export default Tour
