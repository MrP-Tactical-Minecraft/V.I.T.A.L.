let myOverlayFuncsFile = "[myOverlayFunctions.js] ";

function loadMyChunks(myLocation){

    let myFunc = "loadMyChunks(" + myLocation + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    console.log(myID + "Loading...");

    let targetBar = null;
    let scriptsLoaded = null;
    let progress = null;
    let totalScripts = null;
    let url_root = './chunk_data/tower/';

    if (myLocation == "tower"){

        totalScripts = 49;
        targetBar = document.getElementById("progressBarTower");
        scriptsLoaded = 0;

        loadScript(url_root + 'chunk5-13.js', () => { 
            // this is the callback that will only be executed *after* the external library has finished loading           
             addChunk_5_13(0,0); updateProgressBar(targetBar); 
        });

        loadScript(url_root + 'chunk5-14.js', () => { addChunk_5_14(0,1*16); updateProgressBar(targetBar); });
        loadScript(url_root + 'chunk5-15.js', () => { addChunk_5_15(0,2*16); updateProgressBar(targetBar); });
        loadScript(url_root + 'chunk5-16.js', () => { addChunk_5_16(0,3*16); updateProgressBar(targetBar); });
        loadScript(url_root + 'chunk5-17.js', () => { addChunk_5_17(0,4*16); updateProgressBar(targetBar); });
        loadScript(url_root + 'chunk5-18.js', () => { addChunk_5_18(0,5*16); updateProgressBar(targetBar); });
        loadScript(url_root + 'chunk5-19.js', () => { addChunk_5_19(0,6*16); updateProgressBar(targetBar); });

        loadScript('./chunk_data/tower/chunk6-13.js', () => { addChunk_6_13(1*16,0); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk6-14.js', () => { addChunk_6_14(1*16,1*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk6-15.js', () => { addChunk_6_15(1*16,2*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk6-16.js', () => { addChunk_6_16(1*16,3*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk6-17.js', () => { addChunk_6_17(1*16,4*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk6-18.js', () => { addChunk_6_18(1*16,5*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk6-19.js', () => { addChunk_6_19(1*16,6*16); updateProgressBar(targetBar); });   
        
        loadScript('./chunk_data/tower/chunk7-13.js', () => { addChunk_7_13(2*16,0); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk7-14.js', () => { addChunk_7_14(2*16,1*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk7-15.js', () => { addChunk_7_15(2*16,2*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk7-16.js', () => { addChunk_7_16(2*16,3*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk7-17.js', () => { addChunk_7_17(2*16,4*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk7-18.js', () => { addChunk_7_18(2*16,5*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk7-19.js', () => { addChunk_7_19(2*16,6*16); updateProgressBar(targetBar); });

        loadScript('./chunk_data/tower/chunk8-13.js', () => { addChunk_8_13(3*16,0); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk8-14.js', () => { addChunk_8_14(3*16,1*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk8-15.js', () => { addChunk_8_15(3*16,2*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk8-16.js', () => { addChunk_8_16(3*16,3*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk8-17.js', () => { addChunk_8_17(3*16,4*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk8-18.js', () => { addChunk_8_18(3*16,5*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk8-19.js', () => { addChunk_8_19(3*16,6*16); updateProgressBar(targetBar); });

        loadScript('./chunk_data/tower/chunk9-13.js', () => { addChunk_9_13(4*16,0); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk9-14.js', () => { addChunk_9_14(4*16,1*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk9-15.js', () => { addChunk_9_15(4*16,2*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk9-16.js', () => { addChunk_9_16(4*16,3*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk9-17.js', () => { addChunk_9_17(4*16,4*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk9-18.js', () => { addChunk_9_18(4*16,5*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk9-19.js', () => { addChunk_9_19(4*16,6*16); updateProgressBar(targetBar); });

        loadScript('./chunk_data/tower/chunk10-13.js', () => { addChunk_10_13(5*16,0); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk10-14.js', () => { addChunk_10_14(5*16,1*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk10-15.js', () => { addChunk_10_15(5*16,2*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk10-16.js', () => { addChunk_10_16(5*16,3*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk10-17.js', () => { addChunk_10_17(5*16,4*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk10-18.js', () => { addChunk_10_18(5*16,5*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk10-19.js', () => { addChunk_10_19(5*16,6*16); updateProgressBar(targetBar); });

        loadScript('./chunk_data/tower/chunk11-13.js', () => { addChunk_11_13(6*16,0); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk11-14.js', () => { addChunk_11_14(6*16,1*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk11-15.js', () => { addChunk_11_15(6*16,2*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk11-16.js', () => { addChunk_11_16(6*16,3*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk11-17.js', () => { addChunk_11_17(6*16,4*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk11-18.js', () => { addChunk_11_18(6*16,5*16); updateProgressBar(targetBar); });
        loadScript('./chunk_data/tower/chunk11-19.js', () => { addChunk_11_19(6*16,6*16); updateProgressBar(targetBar); });

    }

    function updateProgressBar(targetBar){

        scriptsLoaded++;
        let percentage = (scriptsLoaded / totalScripts) * 100;

        if (targetBar){

            targetBar.style.width = percentage + '%';
            targetBar.textContent = "Chunks loaded: " + Math.round(percentage) + '%';

        }

    }

}

function loadScript(url, callback){

    let myFunc = "loadScript(" + url + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    return new Promise((resolve, reject) => {

        const newScript = document.createElement('script');
        newScript.src = url;   
        newScript.async = true; 
        
        // the callback will only be executed *after* the external library has finished loading
        if (callback){ 
            
            newScript.onload = () => { callback(); }; 
            resolve(url);
        
        }

        newScript.onerror = () => { 
            
            console.error(`Failed to load script: ${url}`); 
            reject(new Error(`Failed to load script ${url}`));
        
        };

        document.head.appendChild(newScript);

    });

}

function addSingleBlock(myX, myY, myZ, myColour, myGroup){

    let myFunc = "addSingleBlock(" + myX + ", " + myY + ", " + myZ + ", " + myColour + ", " + myGroup + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    const geometry = new THREE.BoxGeometry(1,1,1);
    let material = null;

    if ((myColour == "") || (myColour == null)) { material = new THREE.MeshPhongMaterial({color: 0x808080, transparent: false, opacity: 0.2}); }
    if (myColour == "solid_white"){ material = new THREE.MeshPhongMaterial({color: 0xc0c0c0, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_yellow"){ material = new THREE.MeshPhongMaterial({color: 0xffff00, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_red"){ material = new THREE.MeshPhongMaterial({color: 0xff0000, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_orange"){ material = new THREE.MeshPhongMaterial({color: 0xff8800, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_green"){ material = new THREE.MeshPhongMaterial({color: 0x00ff00, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_brown"){ material = new THREE.MeshPhongMaterial({color: 0xaa8866, transparent: false, opacity: 1.0}); }
    if (myColour == "lime_green"){ material = new THREE.MeshPhongMaterial({color: 0xb9ff66, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_blue"){ material = new THREE.MeshPhongMaterial({color: 0x0000ff, transparent: false, opacity: 1.0}); }
    if (myColour == "solid_pink"){ material = new THREE.MeshPhongMaterial({color: 0xff00ff, transparent: false, opacity: 1.0}); }
    
    const block = new THREE.Mesh(geometry, material);

    block.position.x = myX + 9346 - 50;  
    block.position.z = -myY;
    block.position.y = myZ + 772 - 52;

    myGroup.add(block);

}

function addBlockToOverlay(myX, myY, myZ, myColour){

    let myFunc = "addBlockToOverlay(): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    let mySVG = document.getElementById("floor-overlay");

    let svgns = "http://www.w3.org/2000/svg";
    let rect = document.createElementNS(svgns, 'rect');

    if (myColour == "solid_white"){ inputColour = "#ffffff"; }
    if (myColour == "solid_yellow"){ inputColour = "#ffff00"; }
    if (myColour == "solid_orange"){ inputColour = "#ff8800"; }
    if (myColour == "solid_red"){ inputColour = "#ff0000"; }
    if (myColour == "solid_blue"){ inputColour = "#0000ff"; }
    if (myColour == "solid_green"){ inputColour = "#00ff00"; }
    if (myColour == "solid_brown"){ inputColour = "#aa8866"; }
    if (myColour == "solid_pink"){ inputColour = "#ff00ff"; }
    if (myColour == "lime_green"){ inputColour = "#b9ff66"; }
    if ((myColour == "") || (myColour == null)){ inputColour = "#808080"; }

    rect.setAttribute('x', myX*2 - 3);
    rect.setAttribute('y', myZ*2 - 10);
    rect.setAttribute('height', 2);
    rect.setAttribute('width', 2);
    // rect.setAttribute('fill', '#'+Math.round(0xffffff * Math.random()).toString(16));
    rect.setAttribute('fill', inputColour)
    mySVG.appendChild(rect);    

}

function clearOverlayBlocks(){

    let myFunc = "clearOverlayBlocks(): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    let mySVG = document.getElementById("floor-overlay");
    while (mySVG.lastChild) { mySVG.removeChild(mySVG.lastChild); }

}

function clearFloorPlan(){

    let myFunc = "clearFloorPlan(): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    const targetGroupName = "myBlockGroup";
    const groupExists = scene.getObjectByName(targetGroupName);

    if (groupExists){

        groupExists.parent.remove(groupExists);
        disposeObject(groupExists);

    }

    clearOverlayBlocks();
    
    const roster = Player.roster;
    roster.forEach(playerInstance => { playerInstance.oldZ = null; });

}

function displayPlayersInOverlay(){

    let myFunc = "displayPlayersInOverlay(): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    let playerFocus = document.getElementById("player-focus").value;
    let currentPlayer = Player.roster.get(playerFocus);

    if (currentPlayer){
        
        let playerFocusFloor = Math.trunc(parseInt(-currentPlayer.position.z - 65)/7);

        Player.roster.forEach(player => {

            let playerFloor = Math.trunc(parseInt(-player.position.z - 65)/7);

            if (playerFloor == playerFocusFloor){

                clearCircleFromOverlay("circ" + player.name);
                addCircleToOverlay(player.position.x - 9295, player.position.y - 719, player.colour, player.name, player.gamemode);

            }

        });

    }

}

function addCircleToOverlay(myX, myZ, myColour, myName, myMode){

    let myFunc = "addCircleToOverlay(" + myX + ", " + myZ + ", " + myColour + ", " + myName + ", " + myMode + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    let mySVG = document.getElementById("floor-overlay");

    let svgns = "http://www.w3.org/2000/svg";
    let circ = document.createElementNS(svgns, 'circle'); 
    
    let myFill = null;
    if (myMode == "SPECTATOR"){ myFill = 'none'; } else { myFill = myColour; }

    circ.setAttribute('cx', myX*2 - 3);
    circ.setAttribute('cy', myZ*2 - 10);
    circ.setAttribute('r', 2);
    circ.setAttribute('fill', myFill);
    circ.setAttribute('stroke-width', 1);
    circ.setAttribute('stroke', myColour);
    circ.setAttribute('id', 'circ' + myName);
    
    mySVG.appendChild(circ);

}

function clearCircleFromOverlay(myName){

    let myFunc = "clearCircleFromOverlay(" + myName + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    let myCirc = document.getElementById(myName);
    let mySVG = document.getElementById("floor-overlay");

    if ((myCirc) && (mySVG)){

        mySVG.removeChild(myCirc);

    }

}

function displayCertainBlocks(myLevel, myGroup, inputColour, myType){

    let myFunc = "displayCertainBlocks(" + myLevel + ", " + myGroup + ", " + inputColour + ", " + myType + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    for (let i = 0; i < A.length; i++){

        if (A[i][1] == myLevel){ 
            
            if ((myType == "") || (myType == null)){

                if ((A[i][3] == 'stone') || (A[i][3] == 'light_gray_stained_glass') || (A[i][3] == 'gray_stained_glass') || (A[i][3] == 'black_stained_glass') || (A[i][3] == 'white_concrete') || (A[i][3] == 'light_gray_concrete') || (A[i][3] == 'gray_concrete') || (A[i][3] == 'black_concrete')){

                    addSingleBlock(A[i][0], A[i][1], A[i][2], inputColour, myGroup);
                    addBlockToOverlay(A[i][0], A[i][1], A[i][2], inputColour);

                }
                
            } else {
                
                if (A[i][3] == myType){ 
                    
                    addSingleBlock(A[i][0], A[i][1], A[i][2], inputColour, myGroup); 
                    addBlockToOverlay(A[i][0], A[i][1], A[i][2], inputColour);
                
                }
            
            }

        }

    }

    scene.add(myGroup);

}

function startTypingEffect(myDocument, elementId, textToType, speed = 10) {
    
    let myFunc = "startTypingEffect(): ";
    let myID = myOverlayFuncsFile + myFunc;

    const element = myDocument.getElementById(elementId);
    if (!element) return;
    
    let i = 0;
    
    // Add the class for the blinking cursor
    element.classList.add('typing-effect');

    function typeWriter() {
        if (i < textToType.length) {
            element.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove the class once typing is finished (or keep it if you want the cursor to stay)
            // element.classList.remove('typing-effect'); 
        }
    }
    
    // Clear any existing content and start
    element.innerHTML = '';
    typeWriter();
    startTextFadeTimer(5);

    // console.log(myID + "Done.");

}

function startTextFadeTimer(delayInSeconds){

    let myFunc = "startTextFadeTime(" + delayInSeconds + "): ";
    let myID = myOverlayFuncsFile + myFunc;

    const typingTextElement = document.getElementById("typing-text");
    const delayInMilliseconds = delayInSeconds * 1000;

    if (!typingTextElement){

        console.error(myID + "Element with ID 'typing-text' not found.");
        return;

    }

    setTimeout(() => {

        typingTextElement.classList.add('fade-out');

        setTimeout(() => {

            // remove the text element
            if (typingTextElement){
                typingTextElement.innerHTML = '';
                typingTextElement.classList.remove('fade-out');
            }

        }, 1000); // these 1000ms match the CSS transition of .fade-out

    }, delayInMilliseconds);

}

function initHUD(){

    let myFunc = "initHUD(): ";
    let myID = myOverlayFuncsFile + myFunc;
    console.log(myID + "Hi!");

    initHUDFloorDisplay("");

}

function initHUDFloorDisplay(myMode){

    let myFunc = "initHUDFloorDisplay(): ";
    let myID = myOverlayFuncsFile + myFunc;
    console.log(myID + "Hi!");

    const allFloorInfos = [
        "Grand Atrium / Hail Mary", "Key 1", "Office Space", "Password 1", "Office Space", "Environmental Controls", "Office Space / P2P(13,18)", "Key 2 / Ender Pearls", "Office Space", "Password 2", "Hotel Lobby / P2P(20,25)",
        "Hotel", "Executive Suites", "Computer Centre", "Appartments", "Key 3 / P2P(22)", "Communications Centre", "Office Space", "Appartments", "Appartments", "Atrium 20 / P2P(G0,30)",
        "Password 3", "Office Space", "Art Gallery", "Empty Disc", "Hangar / Teleporters / Elytras & Rockets", "Hangar", "Hangar / Key 4", "Hangar / P2P(19)", "Executive Conference Room / Archive", "Atrium 30 / Office Space",
        "Office Space", "Appartments / Bank", "Penthouse Suite", "Penthouse Suite"
    ];

    const floor_count = 35;
    const floorsCont = document.getElementById("floors-hud-container");

    // clear all existing elements from the container
    floorsCont.innerHTML = '';

    // display all the containers
    for (let i = 0; i < floor_count; i++){

        const floor_entry = document.createElement('div'); 
        floor_entry.className = 'floor-entry';
        floor_entry.setAttribute('data-floor', i);

            const floor_square = document.createElement('div');
            floor_square.className = 'floor-square';            

            let floor_i = i;
            if (floor_i < 10){ floor_i = "0" + floor_i; }
            if (floor_i == 0){ floor_i = "G"; }

            floor_square.textContent = floor_i;

        floor_entry.appendChild(floor_square);            

            const floor_info = document.createElement('div');
            floor_info.className = 'floor-info';
            
            // we will write information here if HUDMode 'info' is selected, otherwise the text is left empty
            if (myMode === 'info'){ floor_info.textContent = allFloorInfos[i]; } else { floor_info.textCont = ''; }

        floor_entry.appendChild(floor_info);            

        floorsCont.appendChild(floor_entry);

    }

}

function removeHUDFloorDisplay(){

    let myFunc = "removeHUDFloorDisplay(): ";
    let myID = myOverlayFuncsFile + myFunc;

    const elementsToDelete = document.querySelectorAll('.floor-entry');
    elementsToDelete.forEach(element => { element.remove(); });

    console.log(myID + `${elementsToDelete.length} elements have been deleted.`);

}

function highlightHUDFloor(myFloor, myColour){

    let myFunc = "highlightHUDFloor(" + myFloor + "): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    const floorsCont = document.getElementById("floors-hud-container");
    const floorToHighlight = floorsCont.querySelector(`.floor-entry[data-floor="${myFloor}"]`);

    if (floorToHighlight){ 
        
        floorToHighlight.classList.add('highlighted');

        const myFloorSquare = floorToHighlight.querySelector('.floor-square');

        if (myFloorSquare){
            myFloorSquare.style.border = `1px solid ${myColour}`;
            myFloorSquare.style.backgroundColor = `${myColour}`;
            myFloorSquare.style.boxShadow = `0 0 8px ${myColour}`; 
        } 

        const myFloorInfo = floorToHighlight.querySelector('.floor-info');

        if (myFloorInfo){
            myFloorInfo.style.border = `1px solid ${myColour}`;
            myFloorInfo.style.backgroundColor = `${myColour}`;
            myFloorInfo.style.boxShadow = `0 0 8px ${myColour}`;
        }
    
    } else {

        console.log(myID + "ERROR! No floor to highlight found.");

    }

}

function dehighlightAllHUDFloors(){

    let myFunc = "dehighlightAllHUDFloors(): ";
    let myID = myOverlayFuncsFile + myFunc;
    // console.log(myID + "Hi!");

    const floorsCont = document.getElementById("floors-hud-container");

    const currentHighlights = floorsCont.querySelectorAll('.highlighted');
    currentHighlights.forEach(elem => {
        
        elem.classList.remove('highlighted');
        
        const myFloorSquare = elem.querySelector('.floor-square');
        if (myFloorSquare){ myFloorSquare.removeAttribute('style'); }
        
        const myFloorInfo = elem.querySelector('.floor-info');
        if (myFloorInfo){ myFloorInfo.removeAttribute('style'); }
    
    });

}