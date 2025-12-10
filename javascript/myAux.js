let myAuxFile = "[myAux.js] ";

function changeTitle(myDocument){

    let myFunc = "changeTitle(document): ";
    let myID = myAuxFile + myFunc;

    myDocument.title = myDocument.title + " (" + thisVer + ")";

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