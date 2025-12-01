let mySceneFunctionFile = "[mySceneFunctions.js] ";

function fiatLux(){

    let myFunc = "fiatLux(): ";
    let thisID = mySceneFunctionFile + myFunc;

    console.log(thisID + "Let there be light."); 

    // lighting with cool shadow effect, NW-NE-SE-SW
    /*
    addLight(9298-50,300,724-50,0xffffff);
    addLight(9390+50,300,724-50,0xffffff);
    addLight(9390+50,300,816+50,0xffffff);
    addLight(9298-50,300,816+50,0xffffff);
    */

    addLight(10, 10, -10, 0xffffff, "light1");
    addLight(10, 10, 10, 0xffffff, "light2");
    addLight(-10, 10, -10, 0xffffff, "light3");
    addLight(10, -10, -10, 0xffffff, "light4");

}

function addLight(x, y, z, color, myName){

    let myFunc = "addLight(): ";
    let thisID = mySceneFunctionFile + myFunc;

    console.log(thisID + "(" + x + ", " + y + ", " + z + ", " + color + "): Hi."); 

    const intensity = 3;
    const distance = 0;
    const decay = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    // const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(x, y, z);
    light.name = myName;
    scene.add(light);

    let myX = light.position.x;
    let myY = light.position.y;
    let myZ = light.position.z;

    let myVec = new THREE.Vector3(myX, myY, myZ);
    addSphere(myVec, '#ffffff');

}

function addSphere(myPos, myColour, myRadius){

    let myFunc = "addSphere(): ";
    let thisID = mySceneFunctionFile + myFunc;

    console.log(thisID + "Adding " + myColour + " sphere at (" + myPos.x + ", " + myPos.y + ", " + myPos.z + ").");

    const geometry = new THREE.SphereGeometry(myRadius, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color: myColour, transparent: false });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = myPos.x;
    sphere.position.y = myPos.z;
    sphere.position.z = -myPos.y;

    scene.add(sphere);

}

function addGaugeElements(){

    let myFunc = "addGaugeElements(): ";
    let thisID = mySceneFunctionFile + myFunc;

    console.log(thisID + "Adding axis helper, grid, and gauge spheres.");

    axes = new THREE.AxesHelper(5.0);
    axes.position.x = 9346.5;
    axes.position.y = 772.5;
    axes.position.z = -65;
    scene.add(axes);

    grid = new THREE.GridHelper(100,10,0x002044,0x202030);
    grid.rotation.x = Math.PI/2;
    grid.position.x = 9346.5;
    grid.position.y = 772.5;
    grid.position.z = -65;
    scene.add(grid);

}

class Tower{

    constructor(){

        this.ID = mySceneFunctionFile + "Tower{}: ";

        console.log(this.ID + "Adding the Sepia Tower skyscraper to the scene...");

        this.skyscraper = new THREE.Group();
        this.skyscraper.name = "Sepia Tower";

        this.columns = new THREE.Group();
        this.columns.name = "Skyscraper columns";
        this.addAllColumns();

        this.atriums = new THREE.Group();
        this.atriums.name = "Skyscraper atriums";
        this.addAtriums();

        this.logo = new THREE.Group();
        this.logo.name = "Skyscraper logo";
        this.addLogo();

        this.floors = new THREE.Group();
        this.floors.name = "Skyscraper floors";
        this.addFloors();

        this.skyscraper.add(this.columns);
        this.skyscraper.add(this.atriums);
        this.skyscraper.add(this.logo);
        this.skyscraper.add(this.floors);
        scene.add(this.skyscraper);

        console.log(this.ID + "Adding the Sepia Tower skyscraper to the scene... OK");

    }

    addAllColumns(){

        this.addPrimaryColumns();
        this.addSecondaryColumns();
        this.addTertiaryColumns();

        this.skyscraper.add(this.columns);

    }

    addPrimaryColumns(){

        this.addColumn(1, new THREE.Vector3(9298,65,724)); // NW
        this.addColumn(1, new THREE.Vector3(9390,65,724)); // NE
        this.addColumn(1, new THREE.Vector3(9390,65,816)); // SE
        this.addColumn(1, new THREE.Vector3(9298,65,816)); // SW

    }

    addSecondaryColumns(){

        this.addColumn(2, new THREE.Vector3(9334,65,726)); // NW
        this.addColumn(2, new THREE.Vector3(9356,65,726));

        this.addColumn(2, new THREE.Vector3(9390,65,760)); // NE
        this.addColumn(2, new THREE.Vector3(9390,65,782)); 
        
        this.addColumn(2, new THREE.Vector3(9356,65,816)); // SE
        this.addColumn(2, new THREE.Vector3(9334,65,816)); 
        
        this.addColumn(2, new THREE.Vector3(9300,65,782)); // SW
        this.addColumn(2, new THREE.Vector3(9300,65,760));

    }

    addTertiaryColumns(){

        // NW

        this.addColumn(3, new THREE.Vector3(9310,65,728));
        this.addColumn(3, new THREE.Vector3(9318,65,728));
        this.addColumn(3, new THREE.Vector3(9326,65,728));

        this.addColumn(3, new THREE.Vector3(9366,65,728));
        this.addColumn(3, new THREE.Vector3(9374,65,728));
        this.addColumn(3, new THREE.Vector3(9382,65,728));    

        // NE

        this.addColumn(3, new THREE.Vector3(9390,65,736));
        this.addColumn(3, new THREE.Vector3(9390,65,744));
        this.addColumn(3, new THREE.Vector3(9390,65,752));

        this.addColumn(3, new THREE.Vector3(9390,65,792));
        this.addColumn(3, new THREE.Vector3(9390,65,800));
        this.addColumn(3, new THREE.Vector3(9390,65,808));

        // SE

        this.addColumn(3, new THREE.Vector3(9382,65,816));
        this.addColumn(3, new THREE.Vector3(9374,65,816));
        this.addColumn(3, new THREE.Vector3(9366,65,816));

        this.addColumn(3, new THREE.Vector3(9326,65,816));
        this.addColumn(3, new THREE.Vector3(9318,65,816));
        this.addColumn(3, new THREE.Vector3(9310,65,816));

        // SW

        this.addColumn(3, new THREE.Vector3(9302,65,808));
        this.addColumn(3, new THREE.Vector3(9302,65,800));
        this.addColumn(3, new THREE.Vector3(9302,65,792));

        this.addColumn(3, new THREE.Vector3(9302, 65, 752));
        this.addColumn(3, new THREE.Vector3(9302, 65, 744));
        this.addColumn(3, new THREE.Vector3(9302, 65, 736));

    }

    addColumn(columnSize, columnPosition){

        let myFunc = "addColumn(" + columnSize + ", " + columnPosition + "): ";
        // console.log(this.ID + myFunc + "Added.");

        let columnSide = 0;
        if (columnSize==1){ columnSide = 6; }
        if (columnSize==2){ columnSide = 4; }
        if (columnSize==3){ columnSide = 2; }

        const geometry = new THREE.BoxGeometry(columnSide,columnSide,245);
        const material = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.1});
        const column = new THREE.Mesh(geometry, material);
        column.renderOrder = 2;

        column.position.x = columnPosition.x + columnSide/2;  
        column.position.y = columnPosition.z + columnSide/2;
        column.position.z = -columnPosition.y - 245/2;

        column.name = "Column (Size " + columnSize + ")";

        this.columns.add(column);

    }

    addFloors(){

        // addWireFrame(myName, myType, myGroup, xPos, yPos, zPos, myWidth, myLength, myHeight, myColour);

        for (let myFloor = 0; myFloor <= 34; myFloor++){

            let myColour = "#404040";
            let myZ = 65 + myFloor*7;

            // full floors 00-24, 29-34
            if (((myFloor >= 0) && (myFloor <= 24)) || ((myFloor >= 29) && (myFloor <= 34))){ 
                
                addWireFrame("Floor " + myFloor, "Floor", this.floors, 9305, 731, myZ, 84, 84, 5, myColour); 
            
            }

            // half floors 25-28 (Hangar Space)
            if ((myFloor >= 25) && (myFloor <= 28)){ 

                let halfFloor = new THREE.Group();
                halfFloor.name = "Floor " + myFloor;

                addWireFrame("Floor " + myFloor + " N", "halfFloor", halfFloor, 9305, 731 + 0*51, myZ, 84, 33, 5, myColour);
                addWireFrame("Floor " + myFloor + " S", "halfFloor", halfFloor, 9305, 731 + 1*51, myZ, 84, 33, 5, myColour);

                this.floors.add(halfFloor);

             }

        }

        this.skyscraper.add(this.floors);

    }

    addAtriums(){

        let myFunc = "addAtriums(): ";
        console.log(this.ID + myFunc + "Added.");

        addWireFrame("Foyer", "Atrium", this.atriums, 9329, 755, 65, 36, 36, 5*7, "#808080");
        addWireFrame("Hotel Lobby", "Atrium", this.atriums, 9329, 755, 65+10*7, 36, 36, 3*7, "#808080");
        addWireFrame("20", "Atrium", this.atriums, 9329, 755, 65+20*7, 36, 36, 3*7-2, "#808080");
        addWireFrame("Art Gallery", "Atrium", this.atriums, 9329, 755, 65+23*7, 36, 36, 2*7, "#808080");
        addWireFrame("30", "Atrium", this.atriums, 9329, 755, 65+30*7, 36, 36, 3*7, "#808080");

        this.skyscraper.add(this.atriums);

    }

    addLogo(){

        let myFunc = "addLogo(): ";
        console.log(this.ID + myFunc + "[MrP]-logo added.");

        // opening bracket '['
        for (let i = 0; i < 9; i++){ addCube(9387,287-i,726,this.logo); }
        addCube(9386,287,726,this.logo);
        addCube(9386,279,726,this.logo);

        // 'M'
        for (let i = 0; i < 5; i++){ addCube(9385,285-i,726,this.logo); }
        addCube(9384,285,726,this.logo);
        for (let i = 0; i < 2; i++){ addCube(9383,284-i,726,this.logo); }
        addCube(9382,285,726,this.logo);
        for (let i = 0; i < 5; i++){ addCube(9381,285-i,726,this.logo); }

        // 'r'
        for (let i = 0; i < 3; i++){ addCube(9379,283-i,726,this.logo); }
        addCube(9378,283,726,this.logo);

        // 'P'
        for (let i = 0; i < 5; i++){ addCube(9376,285-i,726,this.logo); }
        addCube(9375,285,726,this.logo);
        addCube(9375,283,726,this.logo);
        for (let i = 0; i < 2; i++){ addCube(9374,284-i,726,this.logo); }

        // closing bracket ']'
        for (let i = 0; i < 9; i++){ addCube(9372,287-i,726,this.logo); }
        addCube(9373,287,726,this.logo);
        addCube(9373,279,726,this.logo);

        this.skyscraper.add(this.logo);

    }

    removeTower(){

        let myFunc = "removeTower(): ";
        console.log(this.ID + myFunc + "Removing the tower from the scene.");

        // this.skyscraper.removeFromParent();
        disposeObject(this.skyscraper);
        if (this.skyscraper.parent) { this.skyscraper.parent.remove(this.skyscraper); }

    }

}

function disposeObject(myObject) {

    let myFunc = "disposeObject(): ";
    let thisID = mySceneFunctionFile + myFunc;

    console.log(thisID + "Disposing of object " + myObject + ".");

    // 1. Traverse all objects in the group hierarchy
    myObject.traverse((child) => {
        if (child.isMesh) {
            // Dispose of geometry
            if (child.geometry) {
                child.geometry.dispose();
            }

            // Dispose of materials and textures
            if (child.material) {
                // Check if the material is an array (for multi-material objects)
                if (Array.isArray(child.material)) {
                    child.material.forEach((material) => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        }
        // Note: You may also need to dispose of textures explicitly if they are
        // not disposed of with the material (e.g., if you reuse textures).
    });

}

function addWireFrame(myName, myType, myGroup, xPos, yPos, zPos, myWidth, myLength, myHeight, myColour){

    let myFunc = "addWireFrame(" + myName + ", " + myType + ", " + myGroup + "): ";
    let thisID = mySceneFunctionFile + myFunc;

    // console.log(thisID + "addWireFrame(" + myName + ", " + myType + ", ..., " + myColour + "): Hi.");

    const geometry = new THREE.BoxGeometry(myWidth, myLength, myHeight);
    const edges = new THREE.EdgesGeometry (geometry);
    const wire = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: myColour}));

    wire.position.x = xPos + myWidth/2;  
    wire.position.y = yPos + myLength/2;
    wire.position.z = -zPos - myHeight/2;

    wire.name = myName;
    wire.defaultColour = myColour;

    myGroup.add(wire);

}

function addCube(posX, posY, posZ, myGroup){

    let myFunc = "addCube(" + posX + ", " + posY + ", " + posZ + ", " + myGroup + "): ";
    let thisID = mySceneFunctionFile + myFunc;
    // console.log(thisID + "Hi.");

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.9});
    const cube = new THREE.Mesh(geometry, material);

    cube.position.x = posX + .5;
    cube.position.y = posZ + .5;
    cube.position.z = -posY + .5;

    cube.name = "LogoCube";

    myGroup.add(cube);

}

function colourWireFrame(myName, myColour){

    let myFunc = "colorWireFrame(" + myName + ", " + myColour + "): ";
    let thisID = mySceneFunctionFile + myFunc;    
    console.log(thisID + "Hi.");

    let obj = scene.getObjectByName(myName);

    // check if user provided myColor in format #ffffff or 0xffffff
    if ((myColour.charAt(0) == "#") && ((myColour.length == 4) || (myColour.length == 7))){    

        obj.material.color.set(myColour);

    } else {

        if (myColour == "default"){
           
            obj.material.color.set(obj.defaultColour);

        } else {

            console.log(thisID + "ERROR! User input myColour=" + myColour + " is invalid (expected: #rrggbb or #rgb).");

        }

        

    }

}

