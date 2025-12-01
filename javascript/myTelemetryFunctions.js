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
            updatePlayerRoster();

            if (myMode == "live"){

                if (flagTelemetry == true) {

                    setTimeout(() => { 
                            
                        // updatePlayerTelemetry(findLatestTimestamp());
                        getTelemetry("whimc_player_positions", "live");
                        // if (BW == true){ BWRoomTally(); }
                    
                    }, 1000);
            
                }

            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
        }

    });

}

function updatePlayerRoster(){

    let myFunc = "updatePlayerRoster(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    // console.log(myID + "Hi!");   
    
    let threshold = 30; // number of seconds for which offline players are still displayed and after which online players are deleted from the map

    let len = myTelemetry[0].length;
    // The array myTelemetry[] contains timestamp, name, x/y/z positions, and gamemode for all players whose timestamp matches the largest timestamp found in the database

    let now = Date.now();
    now = parseInt(now/1000).toFixed(0);    

    // loop through all players found for the latest timestamp in the database and check whether they exist
    for (let i = 0; i < len; i++){

        let foundTimestamp = myTelemetry[0][i];
        let foundPlayer = myTelemetry[1][i];
        let foundVector = new THREE.Vector3(myTelemetry[2][i], myTelemetry[4][i], -myTelemetry[3][i]);
        let foundGamemode = myTelemetry[5][i];

        if (parseInt(now - foundTimestamp).toFixed(0) <= threshold){ 

            if (Player.roster.has(foundPlayer)){

                let Ply = Player.roster.get(foundPlayer);                              
                
                Ply.timestamp = foundTimestamp;
                Ply.vector = foundVector;
                Ply.updatePosition();
                
                if (Ply.gamemode != foundGamemode){ 
                    
                    Ply.gamemode = foundGamemode;
                    Ply.updateMode(foundGamemode); 
                
                }
                

            } else {            
                
                Player.create(foundPlayer, foundGamemode, foundVector, foundTimestamp); 
            
            }

        }

    }

    // loop through all players found in the roster and check whether their latest timestamp is more than 30 seconds in the past

    /*
    Player.roster.forEach((key) => {

        const player = key.name;
        const timestamp = key.timestamp; 
        let colour = key.colour;       

        // console.log(myID + "Comparing " + timestamp + " against now: " + parseInt(now - timestamp).toFixed(0));

        let span = parseInt(now - timestamp).toFixed(0);

        if ((span >= 10) && (span <= threshold)){ 
            
            console.log(myID + "This timestamp is too far in the past, player " + player + " is going stale.");
            key.colour = "#808080";
            key.updateColour(); 
        
        }

        if (span > threshold){ 
            
            console.log(myID + "This timestamp is too far in the past, player " + player + " needs to be deleted from the map."); 
            key.delete();
        
        }

    });
    */

    for (const [keyID, playerObject] of Player.roster.entries()){

        const player = playerObject.name;
        const timestamp = playerObject.timestamp;

        // console.log(myID + "Comparing " + timestamp + " against now: " + parseInt(now - timestamp).toFixed(0));

        let span = parseInt(now - timestamp).toFixed(0);

        if ((span >= 10) && (span <= threshold)){ 
            
            console.log(myID + "This timestamp is too far in the past, player " + player + " is going stale.");
            playerObject.colour = "#808080";
            playerObject.updateColour(); 
        
        }

        if (span > threshold){ 
            
            console.log(myID + "This timestamp is too far in the past, player " + player + " needs to be deleted from the map."); 
            playerObject.delete();
            Player.roster.delete(keyID);
        
        }        

    }
    
}