const colors = [

    {
        texture: './textures/T1.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T2.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T3.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T4.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T5.jpg',
        size: [2,2,2],
        shininess: 60
    },
    
    {
        texture: './textures/T7.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T8.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T10.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T11.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T12.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T13.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T14.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T15.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: './textures/T16.jpg',
        size: [2,2,2],
        shininess: 60
    },
    {
        color: '161a1d'
    },
    {
        color: '660708'
    },
    {
        color: 'e5383b'
    },
    {
        color: 'b5179e'
    },
    {
        color: '7209b7'
    },
    {
        color: '560bad'
    },
    {
        color: '3a0ca3'
    },
    {
        color: '3f37c9'
    },
    {
        color: '4361ee'
    },
    {
        color: '5390d9'
    },
    {
        color: '48bfe3'
    },
    {
        color: '56cfe1'
    },
    {
        color: '72efdd'
    },
    {
        color: 'b7e4c7'
    },
    {
        color: '74c69d'
    },
    {
        color: '40916c'
    },
    {
        color: '007f5f'
    },
    {
        color: '55a630'
    },
    {
        color: '80b918'
    },
    {
        color: 'bfd200'
    },
    {
        color: 'd4d700'
    },
    {
        color: 'eeef20'
    }
]

const TRAY_TEXTURE = document.getElementById('js-tray-slide-texture');
const TRAY_SOLID = document.getElementById('js-tray-slide-solid');

//set up var

let container;
let scene;
let camera;
let renderer;
let controls;

var model;
var swatches;
var options;

let AmbientLight;
let HemiLight;
let SpotLight;

var activeOption = 'legs';


function init()
{
    container = document.querySelector('.scene');

    //set scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x333333);
    // scene.fog = new THREE.Fog( 0xa0a0a0, 1, 5 );
    const axesHelper = new THREE.AxesHelper( 500 );
    axesHelper.position.set(0,-4,0);
    // scene.add( axesHelper );
    console.log(scene);
    //set camera

    const fov = 30;
    const aspect = container.clientWidth/container.clientHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
    camera.position.set(0,5,40);

    //set renderer
    renderer = new THREE.WebGLRenderer({antialias: true ,alpha : true});
    renderer.toneMaping = THREE.ReinhardToneMapping;
    renderer.toneMapingExposure = 2.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    //add lights

    //Ambient
    Ambientlight = new THREE.AmbientLight( 0x555555 , 0.1); // soft white light
    scene.add( Ambientlight );

    //HemiSphere
    HemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444);
    scene.add( HemiLight );

    //SpotLight
    SpotLight = new THREE.SpotLight(0xffffff,1);
    SpotLight.position.set(5,5,55);
    SpotLight.castShadow = true;
    SpotLight.shadow.bias = 1;
    SpotLight.shadow.mapSize.width = 1024;
    SpotLight.shadow.mapSize.height = 1024;
    SpotLight.shadow.camera.near = 10;
    SpotLight.shadow.camera.far = 200;
    SpotLight.shadow.camera.fov = 30;
    SpotLight.shadow.focus = 1;
    // scene.add( SpotLight );

    const dirLight = new THREE.DirectionalLight( 0x999999 , 0.5 );
	dirLight.position.set( 3, 10, 10 );
	dirLight.castShadow = true;
	dirLight.shadow.camera.top = 20;
	dirLight.shadow.camera.bottom = - 2;
	dirLight.shadow.camera.left = - 20;
	dirLight.shadow.camera.right = 20;
	dirLight.shadow.camera.near = 0.1;
	dirLight.shadow.camera.far = 40;
	scene.add( dirLight );

    lightHelper = new THREE.SpotLightHelper( SpotLight );
	// scene.add( lightHelper );

	shadowCameraHelper = new THREE.CameraHelper( SpotLight.shadow.camera );
	// scene.add( shadowCameraHelper );

    //add floor

    // var floorGeo = new THREE.PlaneGeometry(1000,1000,10,10);
    // var floorMat = new THREE.MeshStandardMaterial({
    //     color : 0xffffff
    // });

    var floor = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
    floor.rotation.x = -0.5 * Math.PI;
    // floor.castShadow = false;
    floor.receiveShadow = true;
    floor.position.y = -4;
    scene.add(floor);



    // Initial material
    const Body_MTL = new THREE.MeshPhongMaterial( { color: 0xfab1a0, shininess: 100 } );
    const Shirt_MTL = new THREE.MeshPhongMaterial( { color: 0xe67e22, shininess: 100 } );
    const Shorts_MTL = new THREE.MeshPhongMaterial( { color: 0x2ecc71, shininess: 100 } );
    const Sneakers_MTL = new THREE.MeshPhongMaterial( { color: 0x000000, shininess: 100 } );
    const Hair_MTL = new THREE.MeshPhongMaterial( { color: 0x000000, shininess: 100 } );
    const Eye_MTL = new THREE.MeshPhongMaterial( { color: 0xffb1a0, shininess: 100 } );


    const INITIAL_MAP = [
    {childID: "Body", mtl: Body_MTL},
    {childID: "Shirt", mtl: Shirt_MTL},
    {childID: "Shorts", mtl: Shorts_MTL},
    {childID: "Sneakers", mtl: Sneakers_MTL},
    {childID: "Hair", mtl: Hair_MTL},
    {childID: "Eyelashes", mtl: Eye_MTL}
    ];

    //loading the model

    const MODEL_PATH =  "./3D/Human.glb";

    var loader = new THREE.GLTFLoader();
    loader.load(MODEL_PATH,function(gltf)
    {
        console.log(gltf);
        model = gltf.scene;
        model.traverse((o) => {

            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
              if(o.material.map) o.material.map.anisotropy = 16;
            }
         });
        model.scale.set(1.3,1.3,1.3);
        model.position.y = -4;
        model.rotation.y = Math.PI;

        // Set initial textures
        for (let object of INITIAL_MAP) {
            initColor(model, object.childID, object.mtl);
        }


        scene.add(model);
        // Add controls
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = Math.PI / 3;
        controls.minDistance = 20;
        controls.maxDistance = 500;
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.dampingFactor = 0.1;
        controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
        controls.autoRotateSpeed = 0.2; // 30
        animate();

    });

    // Function - Add the textures to the models
    function initColor(parent, type, mtl) {
        parent.traverse((o) => {
        if (o.isMesh) {
        if (o.name.includes(type)) {
                o.material = mtl;
                o.nameID = type; // Set a new property to identify this object
            }
        }
    });
    }

    buildColors(colors);

    // Swatches
    swatches = document.querySelectorAll(".tray__swatch");

    for (const swatch of swatches) {
        swatch.addEventListener('click', selectSwatch);
    }

    // Select Option
    options = document.querySelectorAll(".option");

    for (const option of options) {
        option.addEventListener('click',selectOption);
    }



}

function animate()
{
    SpotLight.position.set( 
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
      );
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
    controls.update();
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
}

init();

function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvasPixelWidth = canvas.width / window.devicePixelRatio;
    var canvasPixelHeight = canvas.height / window.devicePixelRatio;
  
    const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
    if (needResize) {
      
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function buildColors(colors) {
    for (let [i, color] of colors.entries()) {
      let swatch = document.createElement('div');
      swatch.classList.add('tray__swatch');
      swatch.setAttribute('data-key', i);
  
      if (color.texture)
      {
        swatch.style.backgroundImage = "url(" + color.texture + ")";  
        TRAY_TEXTURE.append(swatch);
      } else
      {
        swatch.style.background = "#" + color.color;
        TRAY_SOLID.append(swatch);
      }
  
    }
  }

function selectSwatch(e) {
    let color = colors[parseInt(e.target.dataset.key)];
    let new_mtl;

    if (color.texture) {
      
        let txt = new THREE.TextureLoader().load(color.texture);
        
        txt.repeat.set( color.size[0], color.size[1], color.size[2]);
        txt.wrapS = THREE.RepeatWrapping;
        txt.wrapT = THREE.RepeatWrapping;
        
        new_mtl = new THREE.MeshPhongMaterial( {
          map: txt,
          shininess: color.shininess ? color.shininess : 10
        });    
    } 
    else
    {
        new_mtl = new THREE.MeshPhongMaterial({
            color: parseInt('0x' + color.color),
            shininess: color.shininess ? color.shininess : 10  
        });
    }
   
   setMaterial(model, activeOption, new_mtl);
}

function setMaterial(parent, type, mtl) {
    parent.traverse((o) => {
     if (o.isMesh && o.nameID != null) {
       if (o.nameID == type) {
            o.material = mtl;
         }
     }
   });
}



function selectOption(e) {

  console.log(e.target);
  let option = e.target;
  activeOption = e.target.dataset.option;
  console.log(activeOption);
  for (const otherOption of options) {
    otherOption.classList.remove('--is-active');
  }
  option.classList.add('--is-active');
}
  