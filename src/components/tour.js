import React, { useEffect, useRef, useState } from "react";
import Nav from '../components/nav'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

// RESOURCES
// https://github.com/ma77os/InteractiveLandscape/blob/master/js/demo1.js
// https://github.com/ma77os/InteractiveLandscape/blob/master/index.html
// https://codepen.io/soju22/pen/PLeLwo?editors=0110
// https://www.youtube.com/watch?v=2AQLMZwQpDo

const Tour = ({}) => {
  const tourRef = useRef(null);

  const [orbitControls, setOrbitControls] = useState(false)
  
  useEffect(() => {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x410a0e)
    const fog = new THREE.Fog('#C9A055', 50, 105)
    scene.fog = fog

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 5
    scene.add(camera)
    
    let renderer = new THREE.WebGLRenderer({ antialias: true  });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true;
  
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
    let textItem;

    loader.load( '/fonts/helvetiker_regular.typeface.json', function ( font ) {

      const textGeometry = new TextGeometry( 
        '7 Secrets of Sedona', 
        {
          font: font,
          size: 0.4,
          height: 0.2,
          curveSegments: 1,
          bevelEnabled: true,
          bevelThickness: 0.01,
          bevelSize: 0.02,
          bevelOffset: .008,
          bevelSegments: 3
        } 
      );

      textGeometry.center()
    
      const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
    
      textItem = new THREE.Mesh(textGeometry, material)
      textItem.rotation.y = -.1
      textItem.castShadow = true
      scene.add(textItem)
    } );

    var terrain;
    var geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 300);

    var uniforms = {
      time: { type: "f", value: 0.0 },
      distortCenter: { type: "f", value: 0.1 },
      roadWidth: { type: "f", value: 0.5 },
      pallete:{ type: "t", value: null},
      speed: { type: "f", value: 0.5 },
      maxHeight: { type: "f", value: 10.0 },
      color: new THREE.Color(1, 1, 1)
    }

    var material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([ THREE.ShaderLib.basic.uniforms, uniforms ]),
      vertexShader: document.getElementById( 'custom-vertex' ).textContent,
      fragmentShader: document.getElementById( 'custom-fragment' ).textContent,
      wireframe: false,
      fog: true
    });

    terrain = new THREE.Mesh(geometry, material);
    terrain.position.z = -180;
    terrain.rotation.x = -Math.PI / 2

    scene.add(terrain)

    const geometrySphere = new THREE.SphereGeometry( 8, 24, 8 );
    const matcapTextureSun = textureLoader.load('/matcaps/4.png')
    const materialSphere = new THREE.MeshStandardMaterial( { map: matcapTextureSun } );

    let sunSphere = new THREE.Mesh( geometrySphere, materialSphere );
    sunSphere.position.set(10, 30, -100)
    scene.add( sunSphere );
    
    // var theta = Math.PI * ( -0.02 );
    // var phi = 2 * Math.PI * ( -.25 );

    // sunSphere.position.x = 0 * Math.cos( phi );
    // sunSphere.position.y = 0 * Math.sin( phi ) * Math.sin( theta );
    // sunSphere.position.z = 0 * Math.sin( phi ) * Math.cos( theta );
    
    const ambientLight = new THREE.AmbientLight(0xC9A055, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xC9A055, 10)
    directionalLight.position.set(0, 1, 1)
    scene.add(directionalLight)

    // Controls
    let controls
    
    if(orbitControls){
      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
    }
    

    const clock = new THREE.Clock()

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()

      const textAngle = elapsedTime
      const terrainAngle = elapsedTime * 0.3
      // if(textItem && orbitControls) textItem.position.x = Math.cos(textAngle) * (2 + Math.sin(elapsedTime * 0.32))
      // if(textItem && orbitControls) textItem.position.z = Math.sin(textAngle) * (3 + Math.sin(elapsedTime * 0.2))
      if(textItem && orbitControls) textItem.position.z = Math.cos(elapsedTime)
      if(textItem && orbitControls) textItem.position.y = Math.sin(elapsedTime)
      if(terrain) terrain.position.x = Math.cos(elapsedTime * 1)
      if(sunSphere) sunSphere.position.y = Math.sin(elapsedTime * 2) + 20

      sunSphere.rotation.y = elapsedTime + 0.3;

      // Update controls
      if(orbitControls) controls.update()

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()

    return () => tourRef.current.removeChild( renderer.domElement );
    
  }, [orbitControls])
  
  return (
    <div ref={tourRef} id="canvas-container">
      <Nav/>
      <div 
        className="tour-button"
        onClick={() => setOrbitControls(true)}
      >
        Start Tour
      </div>
    </div>
  )
}

export default Tour
