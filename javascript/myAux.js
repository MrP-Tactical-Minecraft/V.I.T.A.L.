let myAuxFile = "[myAux.js] ";

function changeTitle(myDocument){

    let myFunc = "changeTitle(document): ";
    let myID = myAuxFile + myFunc;

    myDocument.title = myDocument.title + " (" + thisVer + ")";

    console.log(myID + "Done.");

}

function startTypingEffect(myDocument, elementId, textToType, speed = 75) {
    
    let myFunc = "startTypingEffect(): ";
    let myID = myAuxFile + myFunc;

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

    console.log(myID + "Done.");

}

function resizeCanvas(){

    let thisFunc = "resizeCanvas(): ";
    let thisID = thisFile + thisFunc;    

    const container = canvas.parentElement;

    // 1. Get the actual rendered size of the parent container
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // 2. Set the canvas's internal drawing buffer size to match the container's size
    canvas.width = containerWidth;
    canvas.height = containerHeight;  

    renderer.setSize(canvas.width, canvas.height);

    console.log(thisID + "Done.");

}