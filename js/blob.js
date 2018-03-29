var container,
    renderer,
    scene,
    camera,
    mesh,
    start = Date.now(),
    fov = 30;

var rotations;

var yantext = "";

function LoadYanText(){
    var loader = new THREE.FileLoader();
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

window.addEventListener('load', function() {
    // grab the container from the DOM
    container = document.getElementById("zzContainer");

    LoadYanText();

    //create speech bubble
    var speechBubble = document.createElement('div');
    container.appendChild(speechBubble);
    speechBubble.id = "speech-bubble"; //stylize it in css
    var speechBubbleContent = document.createElement('p');
    speechBubble.appendChild(speechBubbleContent);


    setInterval(Speak, 6000);

    function Speak() {
        //random select a yantext
        var yan = yantext[Math.floor(Math.random() * yantext.length)];
        speechBubbleContent.innerHTML = yan;
        speechBubble.style.opacity = 1;

        setTimeout(function(){
             speechBubble.style.opacity = 0;
        },3000);


    }


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
    mesh.position.x = 20;
    mesh.position.y = -10;
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
