let myHUDFuncsFile = "[myHUDFunctions.js] ";

function initHUD(){

    let myFunc = "initHUD(): ";
    let myID = myHUDFuncsFile + myFunc;
    console.log(myID + "Hi!");

    initHUDFloorDisplay();

}

function initHUDFloorDisplay(){

    let myFunc = "initHUDFloorDisplay(): ";
    let myID = myHUDFuncsFile + myFunc;
    console.log(myID + "Hi!");

    const floor_count = 35;
    const floorContainer = document.getElementById("floors-container");

    // clear all existing elements
    floorContainer.innerHTML = '';

    // display all the containers
    for (let i = 0; i < floor_count; i++){

        const floor_square = document.createElement('div');
        floor_square.className = 'floor_square';
        // floor_square.floor = i;
        floor_square.setAttribute('data-floor', i);

        let floor_i = i;
        if (floor_i < 10){ floor_i = "0" + floor_i; }
        if (floor_i == 0){ floor_i = "G"; }

        floor_square.textContent = floor_i;

        floorContainer.appendChild(floor_square);

    }

}

function highlightHUDFloor(myFloor){

    let myFunc = "highlightHUDFloor(" + myFloor + "): ";
    let myID = myHUDFuncsFile + myFunc;
    console.log(myID + "Hi!");

    const floorToHighlight = document.querySelector(`[data-floor="${myFloor}"]`);

    if (floorToHighlight){ 
        
        floorToHighlight.classList.remove('floor_square');
        floorToHighlight.classList.add('floor_square_highlight'); 
    
    } else {

        console.log(myID + "ERROR! No floor to highlight found.");

    }

    colourWireFrame("Floor " + myFloor, "#6ee7b7");

}