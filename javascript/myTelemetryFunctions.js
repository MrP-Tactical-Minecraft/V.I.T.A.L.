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
    myUpdateCycle = 500;

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
                    
                    }, myUpdateCycle);
            
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
    // console.log(myID + "Hi!");

    dehighlightAllHUDFloors();
    dehighlightAllWireFrames();

}

function updatePlayerRoster(){

    let myFunc = "updatePlayerRoster(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    // console.log(myID + "Hi!");   

    let len = myTelemetry[0].length;
    // The array myTelemetry[] contains timestamp, name, x/y/z positions, and gamemode for all players whose timestamp matches the largest timestamp found in the database

    let now = Date.now();
    now = parseInt(now/1000).toFixed(0);    

    let foundPlayer, foundTimestamp, foundPosition, foundGamemode, foundWorld;

    // loop through all players found for the latest timestamp in the database and check whether they exist
    for (let i = 0; i < len; i++){

        foundPlayer = myTelemetry[1][i];

        foundTimestamp = myTelemetry[0][i];
        let delta = parseInt(now - foundTimestamp).toFixed(0);

        foundPosition = new THREE.Vector3(myTelemetry[2][i], myTelemetry[4][i], -myTelemetry[3][i]);
        foundGamemode = myTelemetry[5][i];
        foundWorld = myTelemetry[6][i];

        // instantiate/update players who have been online within the offlineThreshold (e.g. within the last 20 seconds) and who do not yet exist
        if ((!Player.roster.has(foundPlayer)) && (delta <= offlineThreshold)){ Player.create(foundPlayer, foundGamemode, foundPosition, foundTimestamp, foundWorld); }

    }

    // loop through all players found in the roster and update them with the newly found telemetry data

    let playerFocus = document.getElementById("player-focus").value;    

    for (const [keyID, playerObject] of Player.roster.entries()){ 
        
        playerObject.update(foundGamemode, foundPosition, foundTimestamp, foundWorld);
        
        if (playerObject.status == "OFFLINE"){             
             
            playerObject.deleteLabel();
            playerObject.deleteSprite();
            Player.roster.delete(keyID);

            if (playerFocus == playerObject.name){ clearFloorPlan(); }
        
        }
    
    }
    
}