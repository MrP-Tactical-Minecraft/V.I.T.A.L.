let myPlayerFunctionsFile = "[myPlayerFunctions.js] ";

let defaultColour = "#6ee7b7";

class Player{

    static roster = new Map();

    constructor(myName, myGamemode, myPosition, myTimestamp, myWorld){

        this.name = myName;  
        this.gamemode = myGamemode; // SURVIVAL / CREATIVE / SPECTATOR / OFFLINE / NOT IN THE OVERWORLD
        this.position = myPosition; // Position, THREE.Vector3(x,y,z)
        this.oldZ = null; // save last known z-Position (relevant only for floor plan display)
        this.timestamp = myTimestamp; // timestamp of last login
        this.world = myWorld;

        this.callsign = (myName.substring(0,3)).toUpperCase();
        this.colour = defaultColour; // this is the individual default colour that is overwritten if team (affiliation) colours are activated
        this.affiliation = null; // Offence/Defence and Black/White
        this.status = null;

        let myClass = "Player{}: ";
        this.ID = myPlayerFunctionsFile + myClass;

        this.addSprite();
        this.addLabel();

        console.log(this.ID + myName + " instantiated.");

        const text = "Player " + myName + " instantiated.";
        startTypingEffect(document, 'typing-text', text);

    }

    static create(myName, myGamemode, myPosition, myTimestamp, myWorld){

        if (Player.roster.has(myName)){ return Player.roster.get(myName); }

        const newPlayer = new Player(myName, myGamemode, myPosition, myTimestamp, myWorld);
        Player.roster.set(myName, newPlayer);
        return newPlayer;

    }

    update(newGamemode, newPosition, newTimestamp, newWorld, myNow){

        let myFunc;
        let oldVec = "[" + this.position.x + ", " + this.position.y + ", " + this.position.z + "]";
        if (newPosition){ 
            let newVec = "[" + newPosition.x + ", " + newPosition.y + ", " + newPosition.z + "]"; 
            myFunc = "update(" + newGamemode + ", " + newVec + ", " + newTimestamp + ", " + newWorld + "): ";
        } else {
            myFunc = "update(" + newGamemode + ", undefined, " + newTimestamp + ", " + newWorld + "): ";
        }       

        // console.log(this.ID + myFunc + "Updating " + this.name + "'s position from " + oldVec + ".");
        if (newPosition){

            this.position.x = newPosition.x;
            this.position.y = newPosition.y;
            this.position.z = newPosition.z;
            this.checkPos();

        }

        if (newTimestamp){ this.timestamp = newTimestamp; }
        this.checkTime(myNow);

        if (newWorld){ this.checkWorld(newWorld); }
        if (newGamemode){ this.checkGamemode(newGamemode); }
        this.checkStatus();

        this.updateColour();
        this.updateSprite();
        this.updateLabel();

    }

    checkStatus(){

        if (this.status == "OFFWORLD"){

            this.deleteSprite();
            this.deleteLabel();

        }

    }

    updateColour(){

        if ((this.affiliation == null) || (this.affiliation == "")){ this.colour = "#6ee7b7"; }

        if (this.affiliation == "OFFENCE"){ this.colour = "#ff0000"; }
        if (this.affiliation == "DEFENCE"){ this.colour = "#0099ff"; }

        if (this.status == "STALE"){ this.colour = "#808080"; }

        if (this.gamemode == "CREATIVE"){ this.colour = "#ffffff"; }

    }

    checkWorld(newWorld){

        if (this.world != newWorld){

            this.world = newWorld;

            if (this.world == "world"){

                this.status = "";
                this.addSprite();
                this.addLabel();

            }

            if (this.world != "world"){ this.status = "OFFWORLD"; }

        }

    }

    checkGamemode(newGamemode){

        if (this.gamemode != newGamemode){

            this.gamemode = newGamemode;
            this.deleteSprite();
            this.addSprite();            

        }

    }

    addSprite(){

        let myFunc = "addSprite(): ";
        // console.log(this.ID + myFunc + "Hi!");

        // Load the texture 
        const textureLoader = new THREE.TextureLoader();

        var texture = null;
        var spriteMaterial = null;

        // Create the sprite material depending on the player mode

        if ((this.gamemode == "") || (this.gamemode == null)){ texture = textureLoader.load('./resources/sprite120.png'); }
        if ((this.gamemode == "SURVIVAL") || (this.gamemode == "CREATIVE")){ texture = textureLoader.load('./resources/sprite120.png'); }  
        if (this.gamemode == "SPECTATOR"){ texture = textureLoader.load('./resources/sprite120ring.png'); }

        if ((this.gamemode == "SURVIVAL") || (this.gamemode == "SPECTATOR")){

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: this.colour,
                transparent: true
            });

        } 
        
        if (this.gamemode == "CREATIVE"){

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0xffffff,
                transparent: true
            });

        }

        if ((this.gamemode == null) || (this.gamemode == "")){

            spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                color: 0x888888,
                transparent: true
            });

        }

        // Create the sprite
        if (spriteMaterial != null){ 
            
            const sprite = new THREE.Sprite(spriteMaterial); 

            sprite.position.x = this.position.x;
            sprite.position.y = this.position.y;
            sprite.position.z = this.position.z;

            sprite.scale.set(4, 4, 1);

            sprite.name = "sprite_" + this.name;

            // playerGroup.add(sprite);
            scene.add(sprite);
        
        } else { console.log("[myWorldElements.js] addSprite(): ERROR! Variable 'spriteMaterial' is null."); } 

    }

    updateSprite(){

        let myFunc = "updateSprite(): ";
        // console.log(this.ID + myFunc + "Hi!");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);

        if (mySprite){

            mySprite.position.x = this.position.x;
            mySprite.position.y = this.position.y;
            mySprite.position.z = this.position.z;

            mySprite.material.color.set(this.colour);

        }

    }

    deleteSprite(){

        let myFunc = "deleteSprite(): ";
        // console.log(this.ID + myFunc + "Deleting " + this.name + "'s sprite.");

        let searchName = "sprite_" + this.name;
        let mySprite = scene.getObjectByName(searchName);

        scene.remove(mySprite);

    }

    addLabel(){

        let myFunc = "addLabel(): ";
        // console.log(this.ID + myFunc + "Adding label for player " + this.name + ".");

        let myX = this.position.x;
        let myY = this.position.y;
        let myZ = this.position.z - 5;

        const myDiv = document.createElement("div");
        myDiv.textContent = this.callsign;
        myDiv.id = "label_div_" + this.callsign;
        myDiv.style.color = this.colour;

        const myLabel = new CSS2DObject(myDiv);
        myLabel.position.set(myX, myY, myZ);
        myLabel.name = "label_" + this.callsign;
        
        // labelGroup.add(myLabel);
        scene.add(myLabel);

    }

    updateLabel(){

        let myFunc = "updateLabel(): ";       

        const myLabel = scene.getObjectByName("label_" + this.callsign);
        const myDiv = document.getElementById("label_div_" + this.callsign);

        if ((!myLabel) || (!myDiv)){ return; }

        // console.log(this.ID + myFunc + "Updating label for " + this.name + ".");

        myLabel.position.x = this.position.x;
        myLabel.position.y = this.position.y;
        myLabel.position.z = this.position.z - 5;

        let myText = null;

        if (this.gamemode == "SURVIVAL"){ myText = this.callsign; }
        if (this.gamemode == "SPECTATOR"){ myText = "[" + this.callsign + "]"; }
        if (this.gamemode == "CREATIVE"){ myText = "** " + this.callsign + " **"; }

        if (this.status == "STALE"){ myText = "(" + this.callsign + ")"; }

        myDiv.textContent = myText;
        myDiv.style.color = this.colour;

    }

    deleteLabel(){

        let myFunc = "deleteLabel(): ";
        // console.log(this.ID + myFunc + "Deleting label for " + this.name + ".");

        let label = scene.getObjectByName("label_" + this.callsign);
        let myDiv = document.getElementById("label_div_" + this.callsign); 
        
        if (!label){ return; }
        scene.remove(label);

        if (myDiv && myDiv.parentNode){ myDiv.parentNode.removeChild(myDiv); }

    }

    checkTime(myNow){

        let myFunc = "checkTime(): ";
        // console.log(this.ID + myFunc + "Hi!");

        let now = null;
        
        if ((myNow == null) || (myNow == "")){ 
            
            now = Date.now(); 
            now = parseInt(now/1000).toFixed(0);
        
        } else { 
            
            now = myNow; 
        
        }        
        
        let elapsedTime = parseInt(now - this.timestamp).toFixed(0);
        // console.log(this.ID + myFunc + "now=" + now + ", last player timestamp=" + this.timestamp + " for " + this.name + ", elapsedTime=" + elapsedTime);

        if (elapsedTime < staleThreshold){ 
            
            if (this.world == "world"){ this.status = ""; } else { this.status = "OFFWORLD"; }

        }

        if ((elapsedTime >= staleThreshold) && (elapsedTime <= offlineThreshold)){ 
            
            this.status = "STALE";
            console.log("This player is going stale."); 
        
        }

        if (elapsedTime > offlineThreshold){ 
            
            console.log("This player is now offline."); 
            this.status = "OFFLINE";         
        
        }

    }

    isPlayerInTower(){

        let pos = this.position;
        let output = null;

        if ((pos.x >= 9298) && (pos.x <= 9395) && (pos.y >= 724) && (pos.y <= 821) && (-pos.z >= 65) && (-pos.z <= 307)){            
            output = true;
        } else { 
            output = false; 
        }

        // console.log("isPlayerInTower(): Returning " + output + " for player " + this.name + ".");
        return output;

    }

    setAffiliation(){

        let pos = this.position;

        // this switch changes the affiliation logic to the old starting positions for the defence
        // all players are offence by default and only get assigned defence on floor 14
        let oldPos = true; 

        if ((pos.z == -49) && (oldPos == false)){

            // console.log(this.ID + myFunc + "Player " + this.name + " is on z-level 49.");
            if ((pos.x >= 9365) && (pos.x <= 9368) && (pos.y >= 635) && (pos.y <= 640)){ this.affiliation = ""; }
            if ((pos.x >= 9371) && (pos.x <= 9376) && (pos.y >= 635) && (pos.y <= 640)){ this.affiliation = "OFFENCE"; }
            if ((pos.x >= 9357) && (pos.x <= 9362) && (pos.y >= 635) && (pos.y <= 640)){ this.affiliation = "DEFENCE"; }          

        }

        if (oldPos == true){

            if ((pos.x >= 9344) && (pos.x <= 9351) && (pos.y >= 754) && (pos.y <= 761) && (pos.z == -163)){ this.affiliation = "DEFENCE"; }

        }

    }

    checkPos(){

        let myFunc ="checkPos(): ";
        let pos = "[" + this.position.x + ", " + this.position.y + ", " + this.position.z + "]";
        // console.log(this.ID + myFunc + "Checking " + this.name + "'s position as " + pos);
        
        this.setAffiliation();

        let playerFocus = document.getElementById("player-focus").value;  

        if (this.isPlayerInTower()){

            let myFloor = Math.trunc(parseInt(-this.position.z - 65)/7);
            // console.log("This player is on floor " + myFloor + " of the tower.");

            // this code block pushes the current player into the playersOnFloor array of the individual floor wireframes
            // (the temeletry part then updates all GUI elements that need highlighting)
            if ((myFloor >= 25) && (myFloor <= 28)){

                if ((this.position.y >= 732) && (this.position.y <= 763)){ 
                    
                    let myDesignation = "Floor " + myFloor + " N";
                    let obj = scene.getObjectByName(myDesignation);
                    obj.playersOnFloor.push(this.name);
                
                }

                if ((this.position.y >= 781) && (this.position.y <= 815)){ 
                    
                    let myDesignation = "Floor " + myFloor + " S";
                    let obj = scene.getObjectByName(myDesignation);
                    obj.playersOnFloor.push(this.name); 
                
                }

            } else {

                let myDesignation = "Floor " + myFloor;
                let obj = scene.getObjectByName(myDesignation);
                obj.playersOnFloor.push(this.name);
                // console.log("Pushing player " + this.name + " to floor " + myFloor + ".");

            } 

            // display the floor layout in the 3D engine IF the this player is selected as the focus                        
            // console.log(this.ID + myFunc + "Checking if " + this.name + " is selected as the map focus.");

            if (playerFocus == this.name){

                clearCircleFromOverlay("circ" + this.name);
                addCircleToOverlay(this.position.x - 9295, this.position.y - 719, this.colour, this.name, this.gamemode);

                if (this.position.z != this.oldZ){                            

                    // console.log(this.ID + myFunc + "Updating floor plan for player " + this.name + ": pos.z = " + this.position.z + ", old.z = " + this.oldZ);

                    clearFloorPlan();

                    let myBlockGroup = new THREE.Group();
                    myBlockGroup.name = "myBlockGroup";

                    displayCertainBlocks(-this.position.z, myBlockGroup);   
                    displayCertainBlocks(-this.position.z, myBlockGroup, "solid_orange", "orange_stained_glass"); 
                    displayCertainBlocks(-this.position.z, myBlockGroup, "solid_green", "lime_stained_glass");                    

                    this.oldZ = this.position.z;

                }

            }
                    
        } else {

            // the next block clears the floor plan from the 3D engine and the 2D overlay if the player is outside the tower

            if (playerFocus == this.name){ 

                // console.log("Player " + this.name + " is not in the tower");                
                clearFloorPlan(); 
            
            }

        }

    }

}