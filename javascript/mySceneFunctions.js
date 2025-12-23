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

    // console.log(thisID + "(" + x + ", " + y + ", " + z + ", " + color + "): Hi."); 

    const intensity = 3;
    const distance = 0;
    const decay = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    // const light = new THREE.PointLight(color, intensity, distance, decay);
    light.position.set(x, y, z);
    light.name = myName;
    auxElements.add(light);

    let myX = light.position.x;
    let myY = light.position.y;
    let myZ = light.position.z;

    let myVec = new THREE.Vector3(myX, myY, myZ);
    addSphere(myVec, '#ffffff');

}

function addSphere(myPos, myColour, myRadius){

    let myFunc = "addSphere(): ";
    let thisID = mySceneFunctionFile + myFunc;

    // console.log(thisID + "Adding " + myColour + " sphere at (" + myPos.x + ", " + myPos.y + ", " + myPos.z + ").");

    const geometry = new THREE.SphereGeometry(myRadius, 32, 16);
    const material = new THREE.MeshPhongMaterial({ color: myColour, transparent: false });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = myPos.x;
    sphere.position.y = myPos.z;
    sphere.position.z = -myPos.y;

    auxElements.add(sphere);

}

function addGaugeElements(){

    let myFunc = "addGaugeElements(): ";
    let thisID = mySceneFunctionFile + myFunc;

    console.log(thisID + "Adding axis helper, grid, and gauge spheres.");

    let axes = new THREE.AxesHelper(5.0);
    axes.position.x = 9346.5;
    axes.position.y = 772.5;
    axes.position.z = -65;
    auxElements.add(axes);

    let grid = new THREE.GridHelper(100,10,0x002044,0x202030);
    grid.rotation.x = Math.PI/2;
    grid.position.x = 9346.5;
    grid.position.y = 772.5;
    grid.position.z = -65;
    
    auxElements.add(grid);

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

        this.elevators = new THREE.Group();
        this.elevators.name = "Skyscraper elevators";
        this.addElevators();

        this.rooms = new THREE.Group();
        this.rooms.name = "Skyscraper rooms";
        this.addRooms("RR");

        this.skyscraper.add(this.columns);
        this.skyscraper.add(this.atriums);
        this.skyscraper.add(this.logo);
        this.skyscraper.add(this.floors);
        this.skyscraper.add(this.elevators);
        this.skyscraper.add(this.rooms);
        scene.add(this.skyscraper);

        console.log(this.ID + "Added Sepia Tower.");

        // console.log(this.ID + "Calling startTypingEffect().");
        const text = "Adding the Sepia Tower skyscraper to the scene... OK";
        startTypingEffect(document, 'typing-text', text);

        if ((A.length == 0) || (A.length == "")){ loadMyChunks("tower"); }

    }

    addAllColumns(){

        this.addPrimaryColumns();
        this.addSecondaryColumns();
        this.addTertiaryColumns();

        this.skyscraper.add(this.columns);

    }

    addPrimaryColumns(){

        this.addColumn(6, new THREE.Vector3(9298,65,724), "Column"); // NW
        this.addColumn(6, new THREE.Vector3(9390,65,724), "Column"); // NE
        this.addColumn(6, new THREE.Vector3(9390,65,816), "Column"); // SE
        this.addColumn(6, new THREE.Vector3(9298,65,816), "Column"); // SW

    }

    addSecondaryColumns(){

        this.addColumn(4, new THREE.Vector3(9334,65,726), "Column"); // NW
        this.addColumn(4, new THREE.Vector3(9356,65,726), "Column");

        this.addColumn(4, new THREE.Vector3(9390,65,760), "Column"); // NE
        this.addColumn(4, new THREE.Vector3(9390,65,782), "Column"); 
        
        this.addColumn(4, new THREE.Vector3(9356,65,816), "Column"); // SE
        this.addColumn(4, new THREE.Vector3(9334,65,816), "Column"); 
        
        this.addColumn(4, new THREE.Vector3(9300,65,782), "Column"); // SW
        this.addColumn(4, new THREE.Vector3(9300,65,760), "Column");

    }

    addTertiaryColumns(){

        // NW

        this.addColumn(2, new THREE.Vector3(9310,65,728), "Column");
        this.addColumn(2, new THREE.Vector3(9318,65,728), "Column");
        this.addColumn(2, new THREE.Vector3(9326,65,728), "Column");

        this.addColumn(2, new THREE.Vector3(9366,65,728), "Column");
        this.addColumn(2, new THREE.Vector3(9374,65,728), "Column");
        this.addColumn(2, new THREE.Vector3(9382,65,728), "Column");    

        // NE

        this.addColumn(2, new THREE.Vector3(9390,65,736), "Column");
        this.addColumn(2, new THREE.Vector3(9390,65,744), "Column");
        this.addColumn(2, new THREE.Vector3(9390,65,752), "Column");

        this.addColumn(2, new THREE.Vector3(9390,65,792), "Column");
        this.addColumn(2, new THREE.Vector3(9390,65,800), "Column");
        this.addColumn(2, new THREE.Vector3(9390,65,808), "Column");

        // SE

        this.addColumn(2, new THREE.Vector3(9382,65,816), "Column");
        this.addColumn(2, new THREE.Vector3(9374,65,816), "Column");
        this.addColumn(2, new THREE.Vector3(9366,65,816), "Column");

        this.addColumn(2, new THREE.Vector3(9326,65,816), "Column");
        this.addColumn(2, new THREE.Vector3(9318,65,816), "Column");
        this.addColumn(2, new THREE.Vector3(9310,65,816), "Column");

        // SW

        this.addColumn(2, new THREE.Vector3(9302,65,808), "Column");
        this.addColumn(2, new THREE.Vector3(9302,65,800), "Column");
        this.addColumn(2, new THREE.Vector3(9302,65,792), "Column");

        this.addColumn(2, new THREE.Vector3(9302, 65, 752), "Column");
        this.addColumn(2, new THREE.Vector3(9302, 65, 744), "Column");
        this.addColumn(2, new THREE.Vector3(9302, 65, 736), "Column");

    }

    addColumn(mySize, myPosition, myType, myHeight){

        let myFunc = "addColumn(" + myType + "): ";
        // console.log(this.ID + myFunc + "Hi!");

        let myColour;
        let myOpacity;
        let myRenderOrder;

        if (myType == "Column"){ 

            myColour = 0xffffff;
            myOpacity = 0.1;
            myRenderOrder = 1;
            myHeight = 245;

        } else {

            myOpacity = 0.5;
            myRenderOrder = 2;

        }

        if (myType == "UpElevator"){ myColour = 0x00ff00; }
        if (myType == "DownElevator"){ myColour = 0xff8800; }

        const geometry = new THREE.BoxGeometry(mySize,mySize,myHeight);
        const material = new THREE.MeshPhongMaterial({color: myColour, transparent: true, opacity: myOpacity, depthWrite: false});
        const column = new THREE.Mesh(geometry, material);

        column.position.x = myPosition.x + mySize/2;  
        column.position.y = myPosition.z + mySize/2;
        column.position.z = -myPosition.y - myHeight/2;

        if (myType == "Column"){

            column.name = "Column(" + mySize + ")";
            this.columns.add(column);

        } 
        
        if ((myType == "UpElevator") || (myType == "DownElevator")){

            column.name = "Elevator";
            this.elevators.add(column);

        }

    }

    addElevators(){

        let myFunc = "addElevators(): ";
        // console.log(this.ID + myFunc + "Hi!");

        // up elevators NW corner
        this.addColumn(2, new THREE.Vector3(9332.5, 65, 758.5), "UpElevator", 210); // G-30
        this.addColumn(2, new THREE.Vector3(9332.5, 65, 761.5), "UpElevator", 140); // G-20

        // down elevators NE corner
        this.addColumn(2, new THREE.Vector3(9358.5, 65, 758.5), "DownElevator", 210); // 30-G (express)
        this.addColumn(2, new THREE.Vector3(9358.5, 65, 761.5), "DownElevator", 140); // 20-G (slow)

        // up elevators SE corner
        this.addColumn(2, new THREE.Vector3(9358.5, 65, 781.5), "UpElevator", 70); // G-10
        this.addColumn(2, new THREE.Vector3(9358.5, 205, 781.5), "UpElevator", 84); // 20-32
        this.addColumn(2, new THREE.Vector3(9355.5, 135, 784.5), "UpElevator", 91); // 10-23  
        
        // down elevators SW corner
        this.addColumn(2, new THREE.Vector3(9332.5, 135, 781.5), "DownElevator", 70); // 20-10 (express)
        this.addColumn(2, new THREE.Vector3(9332.5, 205, 781.5), "DownElevator", 21); // 23-20 (express)
        this.addColumn(2, new THREE.Vector3(9332.5, 226, 779.5), "DownElevator", 35); // 28-23 (express)
        this.addColumn(2, new THREE.Vector3(9332.5, 261, 781.5), "DownElevator", 14); // 30-28 (express)

        // Penthouse elevators
        this.addColumn(1, new THREE.Vector3(9300.5, 65, 761.5), "UpElevator", 231); 
        this.addColumn(1, new THREE.Vector3(9300.5, 65, 782.5), "DownElevator", 231); // (slow)

    }

    addFloors(){

        // addWireFrame(myName, myType, myGroup, xPos, yPos, zPos, myWidth, myLength, myHeight, myColour);

        for (let myFloor = 0; myFloor <= 34; myFloor++){

            // let myColour = "#404040";
            let myColour = "#406040";
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

        // let myColour = "#808080";
        let myColour = "#80a080";

        addWireFrame("Foyer", "Atrium", this.atriums, 9329, 755, 65, 36, 36, 5*7, myColour);
        addWireFrame("Hotel Lobby", "Atrium", this.atriums, 9329, 755, 65+10*7, 36, 36, 3*7, myColour);
        addWireFrame("20", "Atrium", this.atriums, 9329, 755, 65+20*7, 36, 36, 3*7-2, myColour);
        addWireFrame("Art Gallery", "Atrium", this.atriums, 9329, 755, 65+23*7, 36, 36, 2*7, myColour);
        addWireFrame("30", "Atrium", this.atriums, 9337, 763, 65+30*7, 20, 20, 3*7, myColour);

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

    addRooms(myDesignation){

        let myFunc = "addRooms(): ";
        console.log(this.ID + myFunc + "Added rooms to the tower.");

        // Ready Room

        if (myDesignation == "RR"){

            addWireFrame("RR_top", "Room", this.rooms, 9359, 609, 55, 15, 21, 5, "#80A080");
            addWireFrame("RR_bottom", "Room", this.rooms, 9359, 609, 49, 15, 21, 4, "#80A080");
            addWireFrame("RR_offence", "Room", this.rooms, 9371, 635, 49, 5, 5, 4, "#ff0000");
            addWireFrame("RR_neutral", "Room", this.rooms, 9365, 635, 49, 3, 5, 4, "#ffffff");
            addWireFrame("RR_defence", "Room", this.rooms, 9357, 635, 49, 5, 5, 4, "#0099ff");
            addBox("RR_house_1", "Building", new THREE.Vector3(9351,63,592), new THREE.Vector3(15,14,5), this.rooms);
            addBox("RR_house_2", "Building", new THREE.Vector3(9366,63,592), new THREE.Vector3(5,6,5), this.rooms);
            addBox("RR_house_3", "Building", new THREE.Vector3(9351,63,606), new THREE.Vector3(6,4,5), this.rooms);

        }

        if (myDesignation == "M1A"){
            
            addWireFrame("K1", "Room", this.rooms, 9377, 732, 72, 10, 10, 5, "#6ee7b7");
            this.updateBorder("1","#6ee7b7","2px");
            addWireFrame("K2", "Room", this.rooms, 9360, 803, 114, 12, 10, 5, "#6ee7b7");
            this.updateBorder("7","#6ee7b7","2px");

            addWireFrame("Archive", "Room", this.rooms, 9321, 737, 268, 5, 8, 5, "#00ff00");
            this.updateBorder("29","#00ff00","2px");

        }

        if (myDesignation == "M1B"){

            addWireFrame("Disc", "Room", this.rooms, 9377, 803, 233, 10, 10, 5, "#6ee7b7");
            this.updateBorder("24","#6ee7b7","2px");
            addWireFrame("CC", "Room", this.rooms, 9306, 764, 156, 10, 15, 5, "#00ff00");
            this.updateBorder("13","#00ff00","2px");

            addWireFrame("P1", "Room", this.rooms, 9306, 764, 86, 10, 15, 5, "#a0a0a0");
            this.updateBorder("3","#a0a0a0","2px");
            addWireFrame("P2", "Room", this.rooms, 9306, 732, 128, 10, 10, 5, "#a0a0a0");
            this.updateBorder("9","#a0a0a0","2px");
            addWireFrame("P3", "Room", this.rooms, 9321, 791, 212, 12, 7, 5, "#a0a0a0");
            this.updateBorder("21","#a0a0a0","2px");

        }

    }

    removeRooms(myDesignation){

        let myFunc = "removeRoom(): ";
        console.log(this.ID + myFunc + `Removing ${myDesignation} from the tower.`); 
        
        if (myDesignation == "M1A"){

            removeWireFrame("K1");
            this.updateBorder("1","#406040","1px");
            removeWireFrame("K2");
            this.updateBorder("7","#406040","1px");

            removeWireFrame("Archive");
            this.updateBorder("29","#406040","1px");

        }

        if (myDesignation == "M1B"){

            removeWireFrame("Disc");
            this.updateBorder("24","#406040","1px");
            removeWireFrame("CC");
            this.updateBorder("13","#406040","1px");
            removeWireFrame("P1");
            this.updateBorder("3","#406040","1px");
            removeWireFrame("P2");
            this.updateBorder("9","#406040","1px");
            removeWireFrame("P3");
            this.updateBorder("21","#406040","1px");            

        }

    }

    updateBorder(floor,colour,borderWidth){
        const floorsCont = document.getElementById("floors-hud-container");
        const indicate = floorsCont.querySelector(`.floor-entry[data-floor="${floor}"]`);
        indicate.querySelector(".floor-square").style.borderColor = `${colour}`;
        indicate.querySelector(".floor-square").style.borderWidth = `${borderWidth}`;
        indicate.querySelector(".floor-square").style.borderStyle = "solid";
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

    // console.log(thisID + "Disposing of object " + myObject + ".");

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
    wire.playersOnFloor = [];

    myGroup.add(wire);

}

function removeWireFrame(myName){

    let myFunc = "removeWireFrame(" + myName + "): ";
    let thisID = mySceneFunctionFile + myFunc;
    // console.log(thisID + "Hi!");

    const selectedObject = scene.getObjectByName(myName);

    if (selectedObject){

        selectedObject.removeFromParent();

        if (selectedObject.geometry){ selectedObject.geometry.dispose(); }
        if (selectedObject.material){ selectedObject.material.dispose(); }

        console.log(thisID + `Wireframe ${myName} removed and disposed.`);

    } else {

        console.log(thisID + `Wireframe ${myName} not found, no action taken.`);

    }

}

function addBox(myName, myType, myPosition, myDimensions, myGroup){

    // this function adds solid but partially opaque boxes to the scenery (instead of wireframes)

    let myFunc = "addBox(" + myName + ", " + myType + "): ";
    let thisID = mySceneFunctionFile + myFunc;
    // console.log(thisID + "Hi!");

    let myColour = 0xffffff;;
    let myOpacity = 0.1;;

    const geometry = new THREE.BoxGeometry(myDimensions.x, myDimensions.y, myDimensions.z);
    const material = new THREE.MeshPhongMaterial({color: myColour, transparent: true, opacity: myOpacity, depthWrite: false});
    const box = new THREE.Mesh(geometry, material);

    box.position.x = myPosition.x + myDimensions.x/2;  
    box.position.y = myPosition.z + myDimensions.y/2;
    box.position.z = -myPosition.y - myDimensions.z/2;

    box.name = myName;
    myGroup.add(box);

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
    // console.log(thisID + "Hi.");

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

function highlightWireFrames(){

    let myFunc = "highlightWireFrames(): ";
    let thisID = mySceneFunctionFile + myFunc;

    for (let myFloor = 0; myFloor < 35; myFloor++){  

        // console.log(thisID + myFunc + myFloor + " Hi!");

        if ((myFloor >= 25) && (myFloor <= 28)){

            let designator = "Floor " + myFloor;

            let designatorN = designator + " N";
            let setColourN = detFloorColour(designatorN);
            if (setColourN != null){ colourWireFrame(designatorN, setColourN); }

            let designatorS = designator + " S";
            let setColourS = detFloorColour(designatorS);
            if (setColourS != null){ colourWireFrame(designatorS, setColourS); }
            
            let setColour = null;
            
            if (setColourN != setColourS){

                if ((setColourN == "#6ee7b7") || (setColourS == "#6ee7b7")){ setColour = "#6ee7b7"; }
                if ((setColourN == "#ff0000") || (setColourS == "#ff0000")){ setColour = "#ff0000"; }
                if ((setColourN == "#0099ff") || (setColourS == "#0099ff")){ setColour = "#0099ff"; }
                if ((setColourN == "#ffffff") || (setColourS == "#ffffff")){ setColour = "#ffffff"; }

            } else { 
                
                setColour == setColourN; 
            
            }            

            if (setColour != null){ highlightHUDFloor(myFloor, setColour); }

        } else {

            let designator = "Floor " + myFloor;
            let setColour = detFloorColour(designator);

            if (setColour != null){

                colourWireFrame(designator, setColour);
                highlightHUDFloor(myFloor, setColour);

            }

        }

        function detFloorColour(myDesignator){

            // console.log("detFloorColour(" + myDesignator+ "): Hi!");

            let obj = scene.getObjectByName(myDesignator);

            let tally = [0,0,0]; // tallying players by affiliation: neutral, OFFENCE, DEFENCE
            let myColour = null;

            obj.playersOnFloor.forEach(player => {

                if (Player.roster.get(player)){

                    let lookUp = Player.roster.get(player).affiliation;
                    if ((lookUp == "") || (lookUp == null)){ tally[0]++; }
                    if (lookUp == "OFFENCE"){ tally[1]++; }
                    if (lookUp == "DEFENCE"){ tally[2]++; }

                }   
                
            });

            let sum = tally[0] + tally[1] + tally[2];

            if (sum > 0){

                if ((tally[1] == 0) && (tally[2] == 0)){ myColour = "#6ee7b7"; }
                if ((tally[1] != 0) && (tally[2] != 0)){ myColour = "#ffffff"; }
                if ((tally[1] != 0) && (tally[2] == 0)){ myColour = "#ff0000"; }
                if ((tally[1] == 0) && (tally[2] != 0)){ myColour = "#0099ff"; }

            }

            return myColour;

        }

    }

}

function dehighlightAllWireFrames(){

    let myFunc = "dehighlightAllWireFrames(): ";
    let thisID = mySceneFunctionFile + myFunc;    
    // console.log(thisID + "Hi.");

    for (let myFloor = 0; myFloor < 25; myFloor++){ 
        
        let myName = "Floor " + myFloor;
        let obj = scene.getObjectByName(myName);
        obj.playersOnFloor = [];

        colourWireFrame(myName, "#406040"); 
    
    }    

    for (let myFloor = 25; myFloor < 29; myFloor++){

        let myNameN = "Floor " + myFloor + " N";
        let objN = scene.getObjectByName(myNameN);
        objN.playersOnFloor = [];

        let myNameS = "Floor " + myFloor + " S";
        let objS = scene.getObjectByName(myNameS);
        objS.playersOnFloor = [];

        colourWireFrame(myNameN, "#406040");
        colourWireFrame(myNameS, "#406040");

    }

    for (let myFloor = 29; myFloor < 35; myFloor++){ 
 
        let myName = "Floor " + myFloor;
        let obj = scene.getObjectByName(myName);
        obj.playersOnFloor = [];

        colourWireFrame(myName, "#406040"); 
    
    }

}

