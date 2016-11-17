//Get the buttons and give it listeners for function
var generateObjectBtn = document.querySelector('#generateObject');
generateObjectBtn.addEventListener("click", generateObject);
//Get the buttons and give it listeners for function
var exportLevelBtn = document.querySelector('#exportLevel');
exportLevelBtn.addEventListener("click", exportLevel);

var preview = document.querySelector(".preview");

function generateObject(event) {
    event.preventDefault();
    //Get the stats from input fields
    var height = document.querySelector('input[name="height"]').value;
    var width = document.querySelector('input[name="width"]').value;
    var type = document.querySelector('select[name="type"]').value;

    var newObject = document.createElement("div");

    //Apply the stats to element
    newObject.style.height = height+"px";
    newObject.style.width = width+"px";
    newObject.classList.add("object");
    newObject.classList.add(type);
    newObject.setAttribute("draggable", true);

    //Add the element to HTML
    preview.appendChild(newObject);

    //Drag events
    newObject.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData('Text', this.class);
    });
    preview.addEventListener("dragover", dragObject);
    newObject.addEventListener("dragend", dropObject);

}

var newX;
var newY;
var gridScale = 50;
function dragObject(event) {
    var previewRect = event.target.getBoundingClientRect();
    newX = event.pageX - (previewRect.left + window.scrollX);
    newY = event.pageY - (previewRect.top + window.scrollY);
    //console.log(newX+","+newY);
}

function dropObject(event) {
    var element = event.target;
    element.style.left = roundBy(newX, gridScale)+"px";
    element.style.top = roundBy(newY, gridScale)+"px";
}

function exportLevel(event) {
    event.preventDefault();
    var objects = document.querySelectorAll('.object');
    var jsonObjects = [];
    for (i=0; i < objects.length; i++) {
        var object = objects[i];
        var height = object.offsetHeight;
        var width = object.offsetWidth;
        var left = toNumber(object.style.left);
        var bottom = preview.offsetHeight - (toNumber(object.style.top) + object.offsetHeight);
        var type = object.className;
        type = type.replace("object ", "");
        var jsonObject = {
            'height':height,
            'width':width,
            'left':left,
            'bottom':bottom,
            'class':type
        };
        jsonObjects[i] = jsonObject;
    }
    saveLevel(jsonObjects);
}

function saveLevel(objectArray) {
    var arrayAsString = JSON.stringify(objectArray);
    $.ajax("ajax.php", {
        data:{"arrayAsString":arrayAsString},
        dataType:"json"
    }).done(function (response) {
        console.log(response);
    }).fail(function (response) {
        console.log(response);
    })
}

//HELPER FUNCTIONS
function roundBy(fromNumber, roundNumber) {
    gridScale = document.querySelector('input[name="gridsize"]').value;
    return Math.round(fromNumber/roundNumber)*roundNumber;
}

function toNumber(fromNumber) {
    var returnValue = Number(fromNumber);
    if(isNaN(returnValue)){
        returnValue = parseFloat(fromNumber);
    }
    return returnValue;
}
