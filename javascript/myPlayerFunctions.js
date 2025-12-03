let myPlayerFunctionsFile = "[myPlayerFunctions.js] ";

let defaultColour = "#ffff00";

class Player{

    static roster = new Map();

    constructor(myName, myGamemode, myPosition, myTimestamp){

        this.name = myName;  
        this.callsign = myName.substring(0,3);
        this.colour = defaultColour; // this is the individual default colour that is overwritten if team (affiliation) colours are activated
        this.affiliation = null; // Offence/Defence and Black/White
        this.gamemode = myGamemode; // SURVIVAL / CREATIVE / SPECTATOR / OFFLINE / NOT IN THE OVERWORLD
        this.position = myPosition; // Position, THREE.Vector3(x,y,z)
        this.UUID = null; // we will save the id of the 3D object here for future reference, e.g. for updating
        this.timestamp = myTimestamp; // timestamp of last login

        let myClass = "Player{}: ";
        this.ID = myPlayerFunctionsFile + myClass;

        this.addSprite(this.position, this.colour, this.gamemode);

        console.log(this.ID + myName + " instantiated.");

    }

    static create(myName, myGamemode, myPosition, myTimestamp){

        if (Player.roster.has(myName)){ return Player.roster.get(myName); }

        const newPlayer = new Player(myName, myGamemode, myPosition, myTimestamp);
        Player.roster.set(myName, newPlayer);
        return newPlayer;

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

    updatePosition(){

        let myFunc = "updatePosition(): "
        console.log(this.ID + myFunc + "Updating " + this.name + "'s position [" + this.position.x + ", " + this.position.y + ", " + this.position.z + "].");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);

        mySprite.position.x = this.position.x;
        mySprite.position.y = this.position.y;
        mySprite.position.z = this.position.z;

    }

    updateMode(myMode){

        let myFunc = "updateMode(): "
        console.log(this.ID + myFunc + "Updating " + this.name + "'s gamemode to " + myMode + ".");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);
        scene.remove(mySprite);
        disposeObject(mySprite);

        this.addSprite(this.position, this.colour, this.gamemode);

    }

    updateColour(){

        let myFunc = "updateColour(): ";     
        let setColour = null;
        
        if (this.gamemode == "CREATIVE"){ setColour = "#ffffff"; } else { 
            
            setColour = this.colour; 

            if (this.affiliation == "OFFENCE"){ setColour = "#ff0000"; }
            if (this.affiliation == "DEFENCE"){ setColour = "#0000ff"; }
        
        } 

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);
        mySprite.material.color.set(setColour);

        console.log(this.ID + myFunc + "Updated " + this.name + "'s colour to " + setColour + ".");

    }

    updateAffiliation(){

        let myFunc = "updateAffiliation(): ";

        if (this.position.z == -49){

            console.log(this.ID + myFunc + "Player " + this.name + "is on z-level 49.");

            if ((this.position.x >= 9371) && (this.position.x <= 9376)){

                if ((this.position.y >= 635) && (this.position.y <= 640)){

                    this.affiliation = "OFFENCE";

                }

            }

            if ((this.position.x >= 9357) && (this.position.x <= 9362)){

                if ((this.position.y >= 635) && (this.position.y <= 640)){

                    this.affiliation = "DEFENCE";

                }

            }            

        }

        console.log(this.ID + myFunc + "Updated " + this.name + "'s affiliation to " + this.affiliation);

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

            sprite.position.x = myPos.x;
            sprite.position.y = myPos.y;
            sprite.position.z = myPos.z;

            sprite.scale.set(5, 5, 1);

            sprite.name = "sprite_" + this.name;

            scene.add(sprite);
        
        } else { console.log("[myWorldElements.js] addSprite(): ERROR! Variable 'spriteMaterial' is null."); } 

    }

    delete(){

        let myFunc = "delete(): ";
        console.log(this.ID + myFunc + "Deleting " + this.name + "'s sprite.");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);
        scene.remove(mySprite);
        disposeObject(mySprite);

    }

}