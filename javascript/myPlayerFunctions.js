let myPlayerFunctionsFile = "[myPlayerFunctions.js] ";

class Player{

    constructor(myName, myColour, myAffiliation, myGamemode){

        this.name = myName;  
        this.callsign = myName.substring(0,3);
        this.colour = myColour; // this is the individual default colour that is overwritten if team (affiliation) colours are activated
        this.affiliation = myAffiliation; // Offence/Defence and Black/White
        this.gamemode = myGamemode; // SURVIVAL / CREATIVE / SPECTATOR / OFFLINE / NOT IN THE OVERWORLD
        this.vector = null; // Position, THREE.Vector3(x,y,z)
        this.UUID = null; // we will save the id of the 3D object here for future reference, e.g. for updating
        this.lastTime = null; // timestamp of last login

        let myClass = "Player{}: ";
        this.ID = myPlayerFunctionsFile + myClass;

        console.log(this.ID + myName + " instantiated.");

    }

    addMarker(){
        
        let myFunc = "addMarker(): ";
        console.log(this.ID + myFunc + "Hi!");

        if (this.UUID == null){

            if (this.myVector != null){

                console.log(com + "Adding position marker for " + this.myName + ".");

                // addSphere(myVector, myColour, myRadius);
                // addSprite(myVector, myColour, myGamemode);

                // add empty label here
                // let myCallSign = this.myName.substring(0,3);
                // addLabel(myCallSign.toUpperCase(), myIndex-1, myVector);
                // we will fold this into the function that actually adds the token
                // if (debugLD == true){ console.log("addSinglePlayer(): Player position indicator added with uuid " + myUUID + " at scene.children index " + (myIndex-1) + "."); }

            } else { console.log(this.ID + myFunc + "No position marker added to 3D map as no position vector given for player " + this.myName + "."); }

        } else { console.log(this.ID + myFunc + "No position marker added for player " + this.myName + " as there already is a marker with UUID " + this.UUID + "."); }

    }

    updateMarker(){

        let myFunc = "updateMarker(): ";
        console.log(this.ID + myFunc + "Updating position marker for " + this.myName + " depending on gamemode.");

    }

    addLabel(myName, myIndex, myVector){

        // console.log("[myPlayerFunctions.js] addLabel(" + myName + ", " + myUUID + "): Hi!");

        let myX = myVector.x;
        let myY = myVector.y;
        let myZ = myVector.z;

        const myDiv = document.createElement("div");
        // myDiv.className = "label";
        myDiv.textContent = myName;
        myDiv.id = myName;
        myDiv.style.color = "#ffffff";

        const myLabel = new CSS2DObject(myDiv);
        myLabel.position.set(myX, myY, myZ);
        scene.children[myIndex].add(myLabel);

    }

    updateLabel(){

        let myFunc = "updateLabel(): ";
        console.log(this.ID + myFunc + "Updating label for " + this.myName + " depending on gamemode or camera/map focus.");

    }

    updatePosition(){

        let myFunc = "updatePosition(): ";
        console.log(this.ID + myFunc + "Updating marker position for " + this.myName + ".");        

    }

    updateTime(){

        let myFunc = "updateTime(): ";
        console.log(this.sID + myFunc + "Updating timestamp for " + this.myName + "."); 


    }

    deletePlayer(){

        let myFunc = "deletePlayer(): ";

        for (let i = 0; i < myPlayers.length; i++){

            if (myPlayers[i].myName == this.myName){ 
                
                myPlayers.splice(i, 1);

                // delete position marker and label / set CSS2D label to empty/no text

                break;
            
            }

        }

        console.log(this.ID + myFunc + "Removed player " + this.myName + ".");

    }

    addSprite(myPos, myColour, myMode){

        let myFunc = "addSprite(" + myPos + ", " + myColour + ", " + myMode + "): ";
        console.log(this.ID + myFunc + "Hi!");

        // Load the texture 
        const textureLoader = new THREE.TextureLoader();

        var texture = null;
        var spriteMaterial = null;

        // Create the sprite material depending on the player mode

        if ((myMode == "") || (myMode == null)){ texture = textureLoader.load('./resources/sprite120.png'); }
        if ((myMode == "SURVIVAL") || (myMode == "CREATIVE")){ texture = textureLoader.load('./resources/sprite120.png'); }  
        if (myMode == "SPECTATOR"){ texture = textureLoader.load('./sprite120ring.png'); }

        if ((myMode == "SURVIVAL") || (myMode == "SPECTATOR")){

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: myColour,
                transparent: true
            });

        } 
        
        if (myMode == "CREATIVE"){

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff,
                transparent: true
            });

        }

        if ((myMode == null) || (myMode == "")){

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0x888888,
                transparent: true
            });

        }

        // Create the sprite
        if (spriteMaterial != null){ 
            
            const sprite = new THREE.Sprite(spriteMaterial); 

            sprite.position.x = myPos.x;
            sprite.position.y = myPos.z;
            sprite.position.z = -myPos.y;

            sprite.scale.set(5, 5, 1);

            scene.add(sprite);
        
        } else { console.log("[myWorldElements.js] addSprite(): ERROR! Variable 'spriteMaterial' is null."); } 

    }

}

function addSprite(myPos, myColour, myMode){

    let myFunc = "addSprite(" + myPos + ", " + myColour + ", " + myMode + "): ";
    console.log(myFunc + "Hi!");

    // Load the texture 
    const textureLoader = new THREE.TextureLoader();

    var texture = null;
    var spriteMaterial = null;

    // Create the sprite material depending on the player mode

    if ((myMode == "") || (myMode == null)){ texture = textureLoader.load('./resources/sprite120.png'); }
    if ((myMode == "SURVIVAL") || (myMode == "CREATIVE")){ texture = textureLoader.load('./resources/sprite120.png'); }  
    if (myMode == "SPECTATOR"){ texture = textureLoader.load('./resources/sprite120ring.png'); }

    if ((myMode == "SURVIVAL") || (myMode == "SPECTATOR")){

        spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            color: myColour,
            transparent: true
        });

    } 
    
    if (myMode == "CREATIVE"){

        spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            color: 0xffffff,
            transparent: true
        });

    }

    if ((myMode == null) || (myMode == "")){

        spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            color: 0x888888,
            transparent: true
        });

    }

    // Create the sprite
    if (spriteMaterial != null){ 
        
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.renderOrder = 1; 

        sprite.position.x = myPos.x;
        sprite.position.y = myPos.z;
        sprite.position.z = -myPos.y;

        sprite.scale.set(5, 5, 1);

        scene.add(sprite);
    
    } else { console.log("[myWorldElements.js] addSprite(): ERROR! Variable 'spriteMaterial' is null."); } 

}