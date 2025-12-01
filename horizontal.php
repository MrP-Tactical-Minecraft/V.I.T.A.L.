<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[MrP] Sepia-3D</title>
    <LINK REL="STYLESHEET" HREF="styles/horizontal.css">
    <LINK REL="STYLESHEET" HREF="styles/controls.css">
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
    <SCRIPT src="javascript/jquery.min.js">/* for the AJAX contruct */</SCRIPT>
</head>

<body onload="init();">

    <div class="main-container">
        
        <!-- 1. Left Panel (30% width) -->
        <div class="left-panel">
            <h2 class="title">
                Control Panel
            </h2>
            <p class="description">
                This fixed-width sidebar (30%) is designed for navigation, settings, or displaying detailed metadata. It maintains consistency regardless of the right panel's dynamic content.
            </p>
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
            <span id="typing-text"></span>

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
                            <div class="label-position"></div>
                            <div class="label-wing"></div>
                        </div>

                        <div class="panel-buttons">
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('rotation');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
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
                            <div class="label-wing">FORTRESS</div>
                            <div class="label-position">YACHT</div>
                            <div class="label-wing">FACTORY</div>
                        </div>

                        <div class="panel-buttons">
                            <button class="control-button on-off-button" data-onoff="off" onClick="toggle('tower');">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
                                <span class="button-label">OFF</span>
                            </button>
                            <button class="control-button on-off-button" data-onoff="off">
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
                
            <div class="panel-dropdown-group">
                <label for="system-select" class="dropdown-label">SYSTEM SELECT</label>
                <div class="dropdown-wrapper">
                    <select id="system-select" class="cockpit-dropdown">
                        <option value="nav">NAV/GPS</option>
                        <option value="com1">COM 1</option>
                        <option value="xfdr">TRANSPONDER</option>
                        <option value="fuel">FUEL SYSTEM</option>
                    </select>
                </div>
            </div>

        </div>

        <!-- 2. Right Panel (remaining width) -->
        <div class="right-panel">
            
            <!-- Header Content -->
            <header>
                <h2 class="title">
                    Main Visualization Area
                </h2>
                <p class="description">
                    The remaining 70% of the screen is dedicated to the primary content, maximizing space for the canvas element below. This area dynamically adjusts its size.
                </p>
            </header>

            <!-- Canvas Element - Fills the rest of the available height -->
            <div class="canvas-container">
                <canvas id="main-canvas"></canvas>
            </div>
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
        let scene, camera, renderer, orbit;
        let axes, grid;

        let myTower = null;
        let myTelemetry = null;
        let flagTelemetry = null;

        let myPlayers = [];

        function init(){

            let thisFunc = "init(): ";
            let myID = thisFile + thisFunc;
            console.log(myID + "Called from <body> onLoad.");

            console.log(myID + "Calling changeTitle().");
            changeTitle(document);

            console.log(myID + "Calling startTypingEffect().");
            const text = "Watch me appear one character at a time!";
            startTypingEffect(document, 'typing-text', text);

            console.log(myID + "Calling main().");
            main();

            console.log(myID + "Done.");

        }

        function toggle(myObject){

            let thisFunc = "toggle(" + myObject + "): ";
            let myID = thisFile + thisFunc;
            console.log(myID + "Hi!");

            if (myObject == "tower"){

                if ((myTower == null) || (myTower == "")){ myTower = new Tower; } else {

                    myTower.removeTower();
                    myTower = null;

                }

            }

            if (myObject == "rotation"){

                if (orbit.autoRotate == false){ orbit.autoRotate = true; } else { orbit.autoRotate = false; }

            }

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