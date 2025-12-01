let currentFile = "[main.js] ";

function main(){

    let thisFunc = "main(): ";
    let thisID = currentFile + thisFunc;
    console.log(thisID + "Main program flow executing.");

    console.log(thisID + "Calling setup().");
    setup();

    console.log(thisID + "Calling populate().");
    populate();   

    console.log(thisID + "Done.");

}

function setup(){

    let thisFunc = "setup(): ";
    let thisID = currentFile + thisFunc;
    console.log(thisID + "Setting up ...");

    scene = new THREE.Scene();
    console.log(thisID + "... scene: OK");

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1,  5000000);
    camera.position.set(9257, 460, -190);
    camera.up.set(0,0,-1);
    console.log(thisID + "... camera: OK");

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas,
        logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.sortObjects = true; // this is to correctly display sprites that are behind partially transparent objects (e.g. the tower columns)
    console.log(thisID + "... renderer: OK");

    orbit = new MapControls(camera, canvas);
    // orbit = new MapControls(camera, labelRenderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.05;
    orbit.screenSpacePanning = false;
    orbit.minDistance = .1;
    orbit.maxDistance = 16384;
    orbit.maxPolarAngle = (Math.PI / 2) - (Math.PI / 360);
    orbit.zoomSpeed = 1;
    orbit.rotateSpeed = 1;
    orbit.autoRotate = false;
    orbit.autoRotateSpeed = .25;
    orbit.target = new THREE.Vector3(9346.5, 772.5, -187.5); // Sepia Tower Skyscraper
    console.log(thisID + "... orbit: OK");

    console.log(thisID + "Calling resizeCanvas().");
    resizeCanvas();

    console.log(thisID + "Done.");

}

async function render(){

    // this asynchronous function updates the scene
    // all updates to 3D rendered objects must be put in here

    orbit.update();

    // this code bit rescales the canvas when the window resized
    const cvs = renderer.domElement;
    camera.aspect = cvs.clientWidth / cvs.clientHeight;
    camera.updateProjectionMatrix();

    // labelRenderer.render(scene, camera);
    renderer.render(scene, camera);            
    requestAnimationFrame(render);

}

function populate(){

    let thisFunc = "populate(): ";
    let thisID = currentFile + thisFunc;
    console.log(thisID + "Adding elements to the scene ...");

    fiatLux();
    console.log(thisID + "... lights: OK");

    addGaugeElements();
    console.log(thisID + "... gauge elements: OK");

    // new Tower;
    // console.log(thisID + "... Tower: OK");

    console.log(thisID + "Calling requestAnimationFrame(render).");
    requestAnimationFrame(render);

    console.log(thisID + "Done.");

}