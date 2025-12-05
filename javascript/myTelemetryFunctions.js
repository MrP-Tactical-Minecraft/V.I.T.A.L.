let myTelemetryFunctionsFile = "[myTelemetryFunctions.js] "; 

function startAJAX(){

    let myFunc = "startAJAX(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Hi!");

    flagTelemetry = true;
    getTelemetry("whimc_player_positions", "live");

}

function stopAJAX(){

    let myFunc = "stopAJAX(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Stopping.");   

    flagTelemetry = false;

}

function getTelemetry(myTable, myMode){

    // call this function with myTable='whimc_player_positions' to get realtime data of players
    // it's safe to call this function with a myLimit greater than the number of rows in the table, e.g. 99999, the SQL will then simply extract all available rows, i.e. the entire table

    let myFunc = "getTelemetry(" + myTable + ", " + myMode + "): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    // console.log(myID + "Hi!");

    myTelemetry = null;

    $.ajax({
        url: "./fetch.php?table="+myTable,
        method: "GET",
        success:function(results) {

            myTelemetry = JSON.parse(results);
            updateScenery();
            updatePlayerRoster();

            if (myMode == "live"){

                if (flagTelemetry == true) {

                    setTimeout(() => { 
                            
                        // updatePlayerTelemetry(findLatestTimestamp());
                        getTelemetry("whimc_player_positions", "live");
                        // if (BW == true){ BWRoomTally(); }
                    
                    }, 500);
            
                }

            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
        }

    });

}

function updateScenery(){

    let myFunc = "updateScenery(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Hi!");

    dehighlightAllHUDFloors();
    dehighlightAllWireFrames();

}

function updatePlayerRoster(){

    let myFunc = "updatePlayerRoster(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    // console.log(myID + "Hi!");   
    
    let staleThreshold = 10; // number of seconds after which offline player markers are coloured grey
    let offlineThreshold = 30; // number of seconds for which offline players are still displayed and after which online players are deleted from the map

    let len = myTelemetry[0].length;
    // The array myTelemetry[] contains timestamp, name, x/y/z positions, and gamemode for all players whose timestamp matches the largest timestamp found in the database

    let now = Date.now();
    now = parseInt(now/1000).toFixed(0);    

    // loop through all players found for the latest timestamp in the database and check whether they exist
    for (let i = 0; i < len; i++){

        let foundTimestamp = myTelemetry[0][i];
        let foundPlayer = myTelemetry[1][i];
        let foundPosition = new THREE.Vector3(myTelemetry[2][i], myTelemetry[4][i], -myTelemetry[3][i]);
        let foundGamemode = myTelemetry[5][i];
        let foundWorld = myTelemetry[6][i];

        let delta = parseInt(now - foundTimestamp).toFixed(0);

        // only instantiate/update those players who have been online within the offlineThreshold (e.g. within the last 30 seconds)
        if (delta <= offlineThreshold){

            if (Player.roster.has(foundPlayer)){

                let Ply = Player.roster.get(foundPlayer); 
                
                if (Ply.world != foundWorld){

                    Ply.world = foundWorld;
                    Ply.updateWorld();

                }

                if (foundWorld == "world"){

                    if (Ply.status == "STALE"){ 
                        
                        Ply.status = null; 
                        Ply.updateStatus();
                    
                    }

                    // timestamp shall always be updated
                    Ply.timestamp = foundTimestamp;

                    if (arePosEqual(Ply.position, foundPosition) == false){

                        Ply.position = foundPosition;
                        Ply.updatePosition();

                    } else {

                        // console.log(myID + "No need to update position as player " + Ply.name + " has not moved.");

                    }

                    function arePosEqual(playerPos, foundPos){

                        let output = true;   
                        
                        let x1 = playerPos.x;
                        let x2 = foundPos.x;

                        let y1 = playerPos.y;
                        let y2 = foundPos.y;

                        let z1 = playerPos.z;
                        let z2 = foundPos.z;

                        let v1 = "[" + x1 + ", " + y1 + ", " + z1 + "]";
                        let v2 = "[" + x2 + ", " + y2 + ", " + z2 + "]";

                        if ((x1 != x2) || (y1 != y2) || (z1 != z2)){ output = false; }

                        // console.log(myID + "arePosEqual(): Are " + v1 + " and " + v2 + " equal? " + output);
                        
                        return output;

                    }

                    if (Ply.gamemode != foundGamemode){ 
                        
                        Ply.gamemode = foundGamemode;
                        Ply.updateMode(); 
                    
                    }

                } 
                
            } else {

                    Player.create(foundPlayer, foundGamemode, foundPosition, foundTimestamp, foundWorld);

            }

        }

    }

    // loop through all players found in the roster and check 
    // a) whether they are in the overworld
    // b) whether their latest timestamp is more than 30 seconds in the past

    for (const [keyID, playerObject] of Player.roster.entries()){

        const player = playerObject.name;
        const timestamp = playerObject.timestamp;
        const world = playerObject.world;

        // console.log(myID + "Comparing " + timestamp + " against now: " + parseInt(now - timestamp).toFixed(0));

        playerObject.checkPos(); // this function checks the position for every player and highlights floors etc.

        if (world == "world"){

            let span = parseInt(now - timestamp).toFixed(0);

            if (playerObject.status != "STALE"){

                if ((span >= staleThreshold) && (span <= offlineThreshold)){ 
                    
                    console.log(myID + "This timestamp is too far in the past, player " + player + " is going stale.");
                    playerObject.status = "STALE";
                    playerObject.updateStatus(); 
                
                }

            }

            if (span > offlineThreshold){ 
                
                console.log(myID + "This timestamp is too far in the past, player " + player + " needs to be deleted from the map."); 
                playerObject.deleteSprite();
                Player.roster.delete(keyID);
            
            } 

        }       

    }
    
}