let myTelemetryFunctionsFile = "[myTelemetryFunctions.js] "; 

function startAJAX(){

    let myFunc = "startAJAX(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Hi!");

    flagTelemetry = true;
    getLatestTelemetry("whimc_player_positions");

}

function stopAJAX(){

    let myFunc = "stopAJAX(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Stopping.");   

    flagTelemetry = false;

}

function startReplay(myTable,myStart,myEnd){

    let myFunc = "startReplay(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Starting replay.");   
    
    flagReplay = true;
    getAllTelemetry(myTable,myStart,myEnd);

}

function replay(){

    let myFunc = "replay(): ";
    let myID = myTelemetryFunctionsFile + myFunc;

    const minTimestamp = Math.min(...myReplayData[0]);
    const maxTimestamp = Math.max(...myReplayData[0]);
    const delta = maxTimestamp - minTimestamp;

    console.log(myID + "Found replay data from " + minTimestamp + " to " + maxTimestamp + ", total duration: " + delta + " seconds.");

    let nowTimestamp = minTimestamp;
    myUpdateCycle = 250;
    feedReplayData(); 

    function feedReplayData(){

        if ((flagReplay == true) && (nowTimestamp <= maxTimestamp)) {

            setTimeout(() => { 
                
                let nowIndeces = [];
                myReplayData[0].forEach((timestamp, index) => {

                    if (timestamp === nowTimestamp.toString()){ nowIndeces.push(index); }

                });             

                if (nowIndeces.length > 0){

                    // console.log("For " + nowTimestamp + " we find " + nowIndeces.length + " indeces in myReplayData.");

                    myTelemetry = [];

                    for (let j = 0; j < myReplayData.length; j++){

                        myTelemetry.push([]);

                    }

                    for (let i = 0; i < nowIndeces.length; i++){

                        let idx = nowIndeces[i];

                        for (let j = 0; j < myReplayData.length; j++){
                            
                            myTelemetry[j].push(myReplayData[j][idx]);

                        }

                    }                    

                    dehighlightGUI();        
                    updatePlayerRoster(nowTimestamp);
                    displayPlayersInOverlay(); 
                    highlightWireFrames();   

                } else {

                    // console.log("Timestamp " + nowTimestamp + " not found in replay data, skipping it.");

                }
                
                nowTimestamp++;
                feedReplayData();
            
            }, myUpdateCycle);

        }        

    }

}

function stopReplay(){

    let myFunc = "stopReplay(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    console.log(myID + "Stopping replay.");   

    flagReplay = false;

}

function getLatestTelemetry(myTable){

    let myFunc = "getLatestTelemetry(" + myTable + "): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    // console.log(myID + "Hi!");

    myTelemetry = null;
    myUpdateCycle = 500;

    $.ajax({
        url: "./fetch.php?table="+myTable,
        method: "GET",
        success:function(results) {

            myTelemetry = JSON.parse(results);    
            dehighlightGUI();        
            updatePlayerRoster();  
            displayPlayersInOverlay();
            highlightWireFrames();

            if (flagTelemetry == true) {

                setTimeout(() => { getLatestTelemetry("whimc_player_positions", "live"); }, myUpdateCycle);
        
            }

        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log(thrownError);
        }

    });

}

function getAllTelemetry(myTable,startTime,endTime){

    let myFunc = "getAllTelemetry(" + myTable + ", start=" + startTime + ", end=" + endTime  + "): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    
    myReplayData = null;

    let myURL = './fetchAll.php' + '?table=' + encodeURIComponent(myTable);
    if (startTime !== undefined){ myURL = myURL + '&startTime=' + encodeURIComponent(parseInt(startTime)); }
    if (endTime !== undefined){ myURL = myURL + '&endTime=' + encodeURIComponent(parseInt(endTime)); }
    console.log("myURL=" + myURL);

    $.ajax({
        url: myURL,
        method: "GET",
        success:function(results) {
            myReplayData = JSON.parse(results);
            replay();
        },
        error: function(xhr, ajaxOperations, thrownError) {
            console.log(thrownError);
        }
    });

    console.log(myID + "All telemetry data successfully retrieved.");

}

function dehighlightGUI(){

    let myFunc = "dehighlightGUI(): ";
    let myID = myTelemetryFunctionsFile + myFunc;
    // console.log(myID + "Updating Scenery and Overlay elements.");
    
    dehighlightAllHUDFloors(); // Overlay part    
    dehighlightAllWireFrames(); // Scenery part

}

function updatePlayerRoster(myNow){

    let myFunc = "updatePlayerRoster(" + myNow + "): ";
    let myID = myTelemetryFunctionsFile + myFunc;   
    // console.log(myID + "Hi!");

    let len = myTelemetry[0].length;
    // The array myTelemetry[] contains timestamp, name, x/y/z positions, and gamemode for all players whose timestamp matches the largest timestamp found in the database

    let now = null;    
    if ((myNow == null) || (myNow == "")){ 
        
        now = Date.now(); 
        now = parseInt(now/1000).toFixed(0);
    
    } else { 
        
        now = myNow; 
    
    }

    // console.log(myID + "now=" + now);

    let foundPlayer, foundTimestamp, foundPosition, foundGamemode, foundWorld;

    // loop through all players found for the latest timestamp in the database and check whether they exist
    for (let i = 0; i < len; i++){

        foundPlayer = myTelemetry[1][i];

        foundTimestamp = myTelemetry[0][i];

        let delta = parseInt(now - foundTimestamp).toFixed(0);
        // console.log("Delta between " + now + " and " + foundTimestamp + " is " + delta);

        foundPosition = new THREE.Vector3(myTelemetry[2][i], myTelemetry[4][i], -myTelemetry[3][i]);
        foundGamemode = myTelemetry[5][i];
        foundWorld = myTelemetry[6][i];

        // instantiate/update players who have been online within the offlineThreshold (e.g. within the last 20 seconds) and who do not yet exist
        if ((!Player.roster.has(foundPlayer)) && (delta <= offlineThreshold)){ Player.create(foundPlayer, foundGamemode, foundPosition, foundTimestamp, foundWorld); }

    }

    // loop through all players found in the roster and update them with the newly found telemetry data

    let playerFocus = document.getElementById("player-focus").value;    

    for (const [keyID, playerObject] of Player.roster.entries()){
        
        let idx = null;

        for (let i = 0; i < len; i++){

            if (myTelemetry[1][i] == playerObject.name){

                idx = i;
                break;

            }

        }

        if (idx != null){

            // console.log(myID + "Updating telemetry data for player " + keyID);

            foundPlayer = myTelemetry[1][idx];
            foundTimestamp = myTelemetry[0][idx];
            foundPosition = new THREE.Vector3(myTelemetry[2][idx], myTelemetry[4][idx], -myTelemetry[3][idx]);
            foundGamemode = myTelemetry[5][idx];
            foundWorld = myTelemetry[6][idx];      

        } else {

            foundGamemode = undefined;
            foundPosition = undefined;
            foundTimestamp = undefined;
            foundWorld = undefined;

        }

        playerObject.update(foundGamemode, foundPosition, foundTimestamp, foundWorld, myNow);
        
        if (playerObject.status == "OFFLINE"){             
             
            const text = "Player " + playerObject.name + " left the game.";
            startTypingEffect(document, 'typing-text', text);

            playerObject.deleteLabel();
            playerObject.deleteSprite();
            Player.roster.delete(keyID);

            if (playerFocus == playerObject.name){ clearFloorPlan(); }
        
        }
    
    }
    
}