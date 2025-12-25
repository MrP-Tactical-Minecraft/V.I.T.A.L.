<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[MrP] V.I.T.A.L.</title>
    <LINK REL="STYLESHEET" HREF="styles/horizontal.css">
    <LINK REL="STYLESHEET" HREF="styles/controls.css">
    <LINK REL="STYLESHEET" HREF="styles/hud.css">
    <script type="importmap">
    {
        "imports": {
            "three": "./javascript/three.module.js",
            "three/addons/": "./javascript/addons/"
        }
    }
    </script>
    <script src="main.js" defer></script>
    <script src="javascript/myAux.js" defer></script>
    <script src="javascript/mySceneFunctions.js" defer></script>
    <script src="javascript/myPlayerFunctions.js" defer></script>
    <script src="javascript/myTelemetryFunctions.js" defer></script>
    <script src="javascript/myOverlayFunctions.js" defer></script>
    <SCRIPT src="javascript/jquery.min.js">/* for the AJAX contruct */</SCRIPT>
</head>

<body onload="init();">

    <div class="main-container">
        
        <!-- 1. Left Panel (30% width) -->
        <div class="left-panel">
            <h2 class="title">
                V.I.T.A.L. Controls
            </h2>
            <p><?php

				require_once('config.php');

                $db_link = mysqli_connect(
                    
                    MYSQL_HOST, 
                    MYSQL_USER, 
                    MYSQL_PASSWORD, 
                    MYSQL_DATABASE
                
                );

                if ( $db_link )
                { print("Database connection: OK."); /* print ("Connection to database established at " . date('d.m.Y H:i:s') . "."); */ }
                else { die('Database connection: NOK :/' . mysqli_error()); } 
                
                ?></p>
            <p class="description">
                This fixed-width sidebar (30%) is designed for navigation, settings, or displaying detailed metadata. It maintains consistency regardless of the right panel's dynamic content.
            </p>

            <!-- Mock controls/links -->
            <ul>
                <li><a href="#">Option A</a></li>
                <li><a href="#">Option B</a></li>
            </ul>

            <!-- airliner controls -->

            <div class="panel-group">
                <div class="group-label">GENERAL SETTINGS</div>

                    <div class="control-panel on-off">
                        <div class="panel-labels" style="justify-content: center; gap: 10px;">
                            <div class="label-position">ROTATE</div>
                            <div class="label-wing">HOVER</div>
                            <div class="label-position">AJAX</div>
                            <div class="label-wing">CONTROL</div>
                        </div>

                        <div class="panel-buttons">
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('rotation');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('ajax');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
                                <span class="button-label">OFF</span>
                            </button>
                        </div>
                    </div>
            </div>

            <div class="panel-group">
                <div class="group-label">MAP SETTINGS</div>

                    <div class="control-panel on-off">
                        <div class="panel-labels" style="justify-content: center; gap: 10px;">
                            <div class="label-position">TOWER</div>
                            <div class="label-wing">HUD:INF</div>
                            <div class="label-position">HUD:M1A</div>
                            <div class="label-position">HUD:M1B</div>
                            <div class="label-wing">HUD:P2P</div>
                        </div>

                        <div class="panel-buttons">
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('tower');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('floor-info');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('objM1A');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('objM1B');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('p2p-info');">
                                <span class="button-label">OFF</span>
                            </button>
                        </div>

                        <div class="panel-footer-label">LOCATIONS</div>
                    </div>

            </div>

            <div class="panel-group">
                <div class="group-label">PLAYER SETTINGS</div>

                    <div class="control-panel three-state">
                        <div class="panel-labels" style="justify-content: center; gap: 10px;">
                            <div class="label-position">ROB</div>
                            <div class="label-wing">DIA</div>
                            <div class="label-position">PRE</div>
                            <div class="label-wing">HYA</div>
                        </div>

                        <div class="panel-buttons">
                            <button class="control-button" data-state="red">
                                <span class="button-label">RED</span>
                            </button>
                            <button class="control-button" data-state="blue">
                                <span class="button-label">BLUE</span>
                            </button>
                            <button class="control-button" data-state="off">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button" data-state="red">
                                <span class="button-label">RED</span>
                            </button>
                        </div>

                        <div class="panel-footer-label">TEAM COLOURS</div>
                    </div>
            </div>

            <div id="progressBarContainer">
                <div id="progressBarTower" style="width: 0%; background-color: #6ee7b7; color: #333; height: 20px;"></div>
                <div id="progressBarFortress" style="width: 0%; background-color: #6ee7b7; color: #333; height: 20px;"></div>
            </div>            
                
            <div class="panel-dropdown-group">
                <label for="system-select" class="dropdown-label">PLAYER FOCUS</label>
                <div class="dropdown-wrapper">
                    <select id="player-focus" class="cockpit-dropdown" onChange="changePlayerFocus();">
                        <option value="">          </option>
                    </select>
                </div>
            </div>

        </div>

        <!-- 2. Right Panel (remaining width) -->
        <div class="right-panel">
    
            <!-- Canvas Element - Fills the rest of the available height -->
            <div class="canvas-container">
                <canvas id="main-canvas"></canvas>
                <div id="hud">
                    <div id="floors-hud-container">
                        <div id="mode-indicator" class="mode-indicator-inactive">___</div>
                        <div id="floors-content-wrapper">
                            <svg id="floors-strip-left" class="floors-strip"></svg>
                            <div id="floor-entries-list"></div>
                            <svg id="floors-strip-right" class="floors-strip"></svg>
                        </div>
                    </div>
                </div>
                <span id="typing-text"></span>
                <svg id="floor-overlay" xmlns="http://www.w3.org/2000/svg" width="200" height="200">
                </svg>
                <span id="player-focus-indicator"></span>
            </div>

            <p class="description">
                VERTICAL INTELLIGENCE, TRACKING, AND LOCALIZATION (fd30242)
            </p>

        </div>

    </div>

    <SCRIPT TYPE="module">

        console.log("[horizontal.php] Importing THREE, OrbitControls, MapControls, and CSS2DRenderer from libraries.");

        import * as THREE from 'three';
        window.THREE = THREE;

        import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
        window.OrbitControls = OrbitControls;

        import { MapControls } from 'three/addons/controls/MapControls.js';
        window.MapControls = MapControls;

        import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
        window.CSS2DRenderer = CSS2DRenderer;

        import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
        window.CSS2DObject = CSS2DObject;

    </SCRIPT>

    <script>

        let thisVer = "v330";
        let thisFile = "[horizontal.php] ";

        let canvas = document.getElementById("main-canvas");
        let scene, camera, renderer, myLabels, orbit;
        
        let auxElements; // we will group all lights, axes, and grids here
        let playerGroup; // we will group our player objects here
        let labelGroup; // guess what? we will group labels here

        let myTower = null;
        let myTelemetry = null;
        let flagTelemetry = null;

        let flagReplay = null;
        let myReplayData = null;

        // let myPlayers = [];

        let A = []; // this is the main array to store chunk data in
        let HUDmode = null;

        let staleThreshold = 10; // number of seconds after which offline player markers are coloured grey
        let offlineThreshold = 20; // number of seconds for which offline players are still displayed and after which online players are deleted from the map

        function init(){

            let thisFunc = "init(): ";
            let myID = thisFile + thisFunc;
            console.log(myID + "Called from <body> onLoad.");

            console.log(myID + "Calling changeTitle().");
            changeTitle(document);

            console.log(myID + "Calling main().");
            main();

            console.log(myID + "Done.");

        }

        function toggle(myObject){

            let thisFunc = "toggle(" + myObject + "): ";
            let myID = thisFile + thisFunc;
            console.log(myID + "Hi!");

            if (myObject == "tower"){

                if ((myTower == null) || (myTower == "")){ 
                    
                    myTower = new Tower; 
                    initHUD();                    
                
                } else {

                    myTower.removeTower();
                    myTower = null;
                    removeHUDFloorDisplay();

                }

            }

            if (myObject == "floor-info"){

                let floorsCont = document.getElementById("floors-hud-container");
                if (floorsCont){

                    // console.log(myID + "floorsCont found.");
                    const testFloor = floorsCont.querySelector(`.floor-entry[data-floor="0"]`);

                    if (testFloor){

                        // console.log(myID + "testFloor found.");
                        const testText = testFloor.querySelector(`.floor-info`);

                        const modeIndicator = document.getElementById("mode-indicator");

                        if (testText){

                            // console.log(myID + "testText found.");

                            removeHUDFloorDisplay();
                            initHUDFloorDisplay("");
                            // console.log(myID + "Floor infos found, establishing.");

                            modeIndicator.innerHTML = "___";
                            modeIndicator.classList.replace("mode-indicator-active", "mode-indicator-inactive");

                        } else {

                            removeHUDFloorDisplay();
                            initHUDFloorDisplay("info");
                            // console.log(myID + "Floor infos found, deactivating.");

                            modeIndicator.innerHTML = "INF";
                            modeIndicator.classList.replace("mode-indicator-inactive", "mode-indicator-active");

                        }

                    }

                }

            }

            if (myObject == "objM1A"){

                let SVG = document.getElementById("floors-strip-left");
                let hasMission = document.getElementById("M1left");

                const modeIndicator = document.getElementById("mode-indicator");

                if (SVG.contains(hasMission)){ 
                    
                    removeIndicator("M1A");
                    modeIndicator.innerHTML="___";
                    modeIndicator.classList.replace("mode-indicator-active", "mode-indicator-inactive"); 
                
                } else { 
                    
                    addIndicator("M1A");
                    modeIndicator.innerHTML="OBJ";
                    modeIndicator.classList.replace("mode-indicator-inactive", "mode-indicator-active"); 
                
                }

            }

            if (myObject == "objM1B"){

                let SVG = document.getElementById("floors-strip-right");
                let hasMission = document.getElementById("M1right");

                const modeIndicator = document.getElementById("mode-indicator");

                if (SVG.contains(hasMission)){ 
                    
                    removeIndicator("M1B");
                    modeIndicator.innerHTML="___";
                    modeIndicator.classList.replace("mode-indicator-active", "mode-indicator-inactive"); 
                
                } else { 
                    
                    addIndicator("M1B");
                    modeIndicator.innerHTML="OBJ";
                    modeIndicator.classList.replace("mode-indicator-inactive", "mode-indicator-active"); 
                
                }

            }

            if (myObject == "p2p-info"){

                let SVG = document.getElementById("floors-strip-left");
                let hasMission = document.getElementById("P2Pleft");

                const modeIndicator = document.getElementById("mode-indicator");

                if (SVG.contains(hasMission)){ 
                    
                    removeIndicator("P2P");
                    modeIndicator.innerHTML="___";
                    modeIndicator.classList.replace("mode-indicator-active", "mode-indicator-inactive"); 
                
                } else { 
                    
                    addIndicator("P2P");
                    modeIndicator.innerHTML="P2P";
                    modeIndicator.classList.replace("mode-indicator-inactive", "mode-indicator-active"); 
                
                }                

            }

            if (myObject == "rotation"){

                if (orbit.autoRotate == false){ orbit.autoRotate = true; } else { orbit.autoRotate = false; }

            }

            if (myObject == "ajax"){

                if (flagTelemetry == true){ stopAJAX(); } else { startAJAX(); }

            }

        }

        function changePlayerFocus(){

            clearFloorPlan();
            clearAllFocusSprites();

            let obj = document.getElementById("player-focus-indicator");
            let playerFocus = document.getElementById("player-focus").value;

            obj.innerHTML = playerFocus;
            obj.style.color = "#6ee7b7";

            let player = Player.roster.get(playerFocus);
            if (player) { player.addFocusSprite(); }

        }

        document.addEventListener('DOMContentLoaded', () => {
            // --- Logic for Three-State Buttons (RED, BLUE, OFF) ---
            const threeStates = ['red', 'blue', 'off'];
            const threeStateButtons = document.querySelectorAll('.control-button:not(.on-off-button)');

            threeStateButtons.forEach(button => {
                button.addEventListener('click', () => {
                    let currentState = button.getAttribute('data-state');
                    let currentIndex = threeStates.indexOf(currentState);
                    let nextIndex = (currentIndex + 1) % threeStates.length;
                    let nextState = threeStates[nextIndex];
                    
                    button.setAttribute('data-state', nextState);
                    
                    const label = button.querySelector('.button-label');
                    label.textContent = nextState.toUpperCase();
                });
            });

            // --- Logic for Two-State Buttons (ON, OFF) ---
            const onOffButtons = document.querySelectorAll('.on-off-button');

            onOffButtons.forEach(button => {
                button.addEventListener('click', () => {
                    let currentState = button.getAttribute('data-onoff');
                    let nextState = (currentState === 'on') ? 'off' : 'on';
                    
                    button.setAttribute('data-onoff', nextState);
                    
                    const label = button.querySelector('.button-label');
                    label.textContent = nextState.toUpperCase();
                });
            });
        });

    </script>

</body>

</html>