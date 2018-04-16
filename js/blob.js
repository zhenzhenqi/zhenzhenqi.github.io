var container,
    renderer,
    scene,
    camera,
    mesh,
    start = Date.now(),
    fov = 30;

var rotations;

var yantext = "";

var audio;
 var speechBubbleContent;
  var speechBubble;

function LoadYanText(){
    var loader = new THREE.FileLoader();
    
    audio = new Audio("glitchedtones_RobotChatter01.mp3");
    //load a text file and output the result to the console
    loader.load(
    	// resource URL
    	'yantext.txt',

    	// onLoad callback
    	function ( data ) {
    		// output the text to the console
            yantext = data;
            // console.log( data )
            //split by newline
            yantext = yantext.split(/\r?\n/);
            console.log( yantext );
    	},

    	// onProgress callback
    	function ( xhr ) {
    		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    	},

    	// onError callback
    	function ( err ) {
    		console.error( 'An error happened' );
    	}
    );
}

var randomInterval;

window.addEventListener('load', function() {
    // grab the container from the DOM
    container = document.getElementById("zzContainer");

    LoadYanText();

    //create speech bubble
     speechBubble = document.createElement('div');
    container.appendChild(speechBubble);
    speechBubble.id = "speech-bubble"; //stylize it in css
    speechBubbleContent = document.createElement('p');
    speechBubble.appendChild(speechBubbleContent);


    (function loop() {
        var randomInterval = THREE.Math.randInt(5000,8000);
        console.log(randomInterval)
        setTimeout(function() {
                Speak();
                loop();
        }, randomInterval);
    }());


   // setInterval(Speak, 6000);



    // create a scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(8, 8, 8)");
    scene.fog = new THREE.FogExp2(0xcccccc, 0.02);

    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        1,
        10000);
    camera.position.z = 200;
    camera.target = new THREE.Vector3(0, 0, 0);
    scene.add(camera);




    material = new THREE.ShaderMaterial({

        uniforms: {
            tExplosion: {
                type: "t",
                value: THREE.ImageUtils.loadTexture('explosion.png')
            },
            time: { // float initialized to 0
                type: "f",
                value: 0.0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent

    });

    // create a sphere and assign the material
    mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(15, 6),
        material
    );
//    mesh.position.x = 0;
//    mesh.position.y = -10;
    mesh.position.x = 0;
    mesh.position.y = 0;
    rotations = new THREE.Vector3(0, 0, 0);
    scene.add(mesh);

    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color);

    renderer.antialias = true;


    //resize listener
    window.addEventListener('resize', function() {
        renderer.setSize($(container).width(), $(container).height());
    });

    document.addEventListener('touchstart', TouchRes, false);

    container.appendChild(renderer.domElement);
    render();

});



function render() {

    rotations.addScalar(0.002);

    mesh.rotation.x = rotations.x;
    mesh.rotation.y = rotations.y;
    mesh.rotation.z = rotations.z;


    material.uniforms['time'].value = .00005 * (Date.now() - start);
    // let there be light
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function TouchRes(){
    PlaySound();
    Speak();
}

function PlaySound(){
    audio.play();
}


    function Speak() {
        //random select a yantext
        var yan = yantext[  THREE.Math.randInt(0, yantext.length-1) ];
        speechBubbleContent.innerHTML = yan;
        //random locations
        var dice = Math.floor(Math.random()*3);

        switch(dice) {
            case 0:
                //top left of blob
//                speechBubble.style.top = "50vh";
//            	speechBubble.style.left = "54vw";
                speechBubble.style.top = "50vh";
            	speechBubble.style.left = "44vw";
                speechBubbleContent.style.top = "auto";
                speechBubbleContent.style.right = 0;
                speechBubbleContent.style.left = "auto";
                speechBubbleContent.style.bottom = 0;
                speechBubbleContent.style.borderRadius = "100px 100px 0px 100px";
                break;
            case 1:
                //bottom left of blob
//                speechBubble.style.top = "65vh";
//            	speechBubble.style.left = "54vw";
                speechBubble.style.top = "65vh";
            	speechBubble.style.left = "44vw";
                speechBubbleContent.style.top = 0;
                speechBubbleContent.style.right = 0;
                speechBubbleContent.style.left = "auto";
                speechBubbleContent.style.bottom = "auto";
                speechBubbleContent.style.borderRadius = "100px 0px 100px 100px";
                break;
            case 2:
                //top right of blob
//                speechBubble.style.top = "45vh";
//            	speechBubble.style.left = "65vw";
                  speechBubble.style.top = "43vh";
            	speechBubble.style.left = "53vw";
                speechBubbleContent.style.top = 0;
                speechBubbleContent.style.right = "auto";
                speechBubbleContent.style.left = 0;
                speechBubbleContent.style.bottom = "auto";
                speechBubbleContent.style.borderRadius = "100px 100px 100px 0px";
                break;

                
        }

        speechBubble.style.opacity = 1;
        setTimeout(function(){
             speechBubble.style.opacity = 0;
        },THREE.Math.randInt(600, 900));


    }
