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
    console.log(myID + "Hi!");

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
    console.log(myID + "Hi!");  

    for (let i = 0; i < myTelemetry[0].length; i++){

        let foundPlayer = myTelemetry[1][i];    
        if (checkPlayerInstance(foundPlayer) == false){ 
            
            let newPlayer = new Player(myTelemetry[1][i]);
            myPlayers.push(newPlayer); 
        
        }

    }

    function checkPlayerInstance(playerName, propertyName){

        return myPlayers.some(instance => {

            const isTargetClass = instance instanceof Player;
            const hasName = instance[propertyName] === playerName;

            return isTargetClass && hasName;

        });

    }

}