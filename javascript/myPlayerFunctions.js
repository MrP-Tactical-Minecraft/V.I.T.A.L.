let myPlayerFunctionsFile = "[myPlayerFunctions.js] ";

let defaultColour = "#6ee7b7";

class Player{

    static roster = new Map();

    constructor(myName, myGamemode, myPosition, myTimestamp, myWorld){

        this.name = myName;  
        this.gamemode = myGamemode; // SURVIVAL / CREATIVE / SPECTATOR / OFFLINE / NOT IN THE OVERWORLD
        this.position = myPosition; // Position, THREE.Vector3(x,y,z)
        this.timestamp = myTimestamp; // timestamp of last login
        this.world = myWorld;

        this.callsign = myName.substring(0,3);
        this.colour = defaultColour; // this is the individual default colour that is overwritten if team (affiliation) colours are activated
        this.affiliation = null; // Offence/Defence and Black/White
        this.status = null;

        let myClass = "Player{}: ";
        this.ID = myPlayerFunctionsFile + myClass;

        this.addSprite(this.position, this.colour, this.gamemode);

        console.log(this.ID + myName + " instantiated.");

    }

    static create(myName, myGamemode, myPosition, myTimestamp, myWorld){

        if (Player.roster.has(myName)){ return Player.roster.get(myName); }

        const newPlayer = new Player(myName, myGamemode, myPosition, myTimestamp, myWorld);
        Player.roster.set(myName, newPlayer);
        return newPlayer;

    }

    updatePosition(){

        let myFunc = "updatePosition(): "
        // console.log(this.ID + myFunc + "Updating " + this.name + "'s position [" + this.position.x + ", " + this.position.y + ", " + this.position.z + "].");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);

        mySprite.position.x = this.position.x;
        mySprite.position.y = this.position.y;
        mySprite.position.z = this.position.z;

        this.updateAffiliation();

    }

    updateMode(){

        let myFunc = "updateMode(): "
        console.log(this.ID + myFunc + "Updating " + this.name + "'s gamemode to " + this.gamemode + ".");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);
        let prevColour = mySprite.material.color;
        scene.remove(mySprite);
        disposeObject(mySprite);

        this.addSprite(this.position, prevColour, this.gamemode);
        this.updateColour();

    }

    updateWorld(){

        let myFunc = "updateWorld(): ";
        console.log(this.ID + myFunc + "Updating " + this.name + "'s world to " + this.world + ".");

        if (this.world != "world"){ 
            
            this.status = "OFFWORLD";             
        
        }

        if (this.world == "world"){

            this.status = null;
            this.addSprite(this.position, this.colour, this.gamemode);

        }

        this.updateStatus();

    }

    updateStatus(){

        let myFunc ="updateStatus(): ";
        console.log(this.ID + myFunc + "Updating " + this.name + "'s status to " + this.status + ".");

        if (this.status == "OFFWORLD"){ 

            console.log(this.ID + myFunc + "Player " + this.name + " is no longer in the overworld, removing sprite from map.");
            this.deleteSprite();

        }

        if ((this.status == "STALE") || (this.status == null) || (this.status == "")){

            this.updateColour();

        }

    }

    updateColour(){

        let myFunc = "updateColour(): ";     
        let setColour = null;
        
        if (this.status == "STALE"){ setColour = "#808080"; } else {

            if (this.gamemode == "CREATIVE"){ setColour = "#ffffff"; } else { 
                
                setColour = this.colour; 

                if (this.affiliation == "OFFENCE"){ setColour = "#ff0000"; }
                if (this.affiliation == "DEFENCE"){ setColour = "#0000ff"; }
            
            } 

        }

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);
        mySprite.material.color.set(setColour);

        // console.log(this.ID + myFunc + "Updated " + this.name + "'s colour to " + setColour + ".");

    }

    updateAffiliation(){

        let myFunc = "updateAffiliation(): ";
        let updateFlag = false;

        if (this.position.z == -49){

            // console.log(this.ID + myFunc + "Player " + this.name + " is on z-level 49.");

            if ((this.position.x >= 9371) && (this.position.x <= 9376)){

                if ((this.position.y >= 635) && (this.position.y <= 640)){

                    if (this.affiliation != "OFFENCE"){ 

                        this.affiliation = "OFFENCE";
                        updateFlag = true;

                    }
                    

                }

            }

            if ((this.position.x >= 9357) && (this.position.x <= 9362)){

                if ((this.position.y >= 635) && (this.position.y <= 640)){

                    if (this.affiliation != "DEFENCE"){

                        this.affiliation = "DEFENCE";
                        updateFlag = true;

                    }                   

                }

            }            

        }

        let msg = null;
        
        if (updateFlag == true){ 
            
            msg = "Updated " + this.name + "'s affiliation to " + this.affiliation;
            this.updateColour(); 
        
        } else { 
            
            msg = "No need to update, Player " + this.name + " already has the correct affiliation."; 
        
        }

        // console.log(this.ID + myFunc + msg);

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



    addSprite(myPos, myColour, myMode){

        let myFunc = "addSprite(" + myPos + ", " + myColour + ", " + myMode + "): ";
        // console.log(this.ID + myFunc + "Hi!");

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

    deleteSprite(){

        let myFunc = "deleteSprite(): ";
        console.log(this.ID + myFunc + "Deleting " + this.name + "'s sprite.");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);
        scene.remove(mySprite);
        disposeObject(mySprite);

    }

}