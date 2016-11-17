var objects = [
    {'height':50, 'width':3840, 'left': 0, 'bottom':0, 'class':'platform'},
    {'height':50, 'width':750, 'left': 500, 'bottom':50, 'class':'platform'},
    {'height':250, 'width':250, 'left': 800, 'bottom':100, 'class':'platform'},
    {'height':10, 'width':50, 'left': 690, 'bottom':100, 'class':'trampoline'},
    {'height':10, 'width':200, 'left': 50, 'bottom':50, 'class':'slow'}
];

loadLevel();
function loadLevel() {
    $.get("editor/levels/level.json", function (level) {
        objects = level;

    var objectElements = [];

    for(var i = 0; i<objects.length; i++){
        var object = document.createElement('DIV');
        object.classList.add(objects[i].class);

        object.style.height = objects[i].height + 'px';
        object.style.width = objects[i].width + 'px';
        object.style.left = objects[i].left + 'px';
        object.style.bottom = objects[i].bottom + 'px';

        var level = document.querySelector('.level');
        level.appendChild(object);

        objectElements[i] = object;
    }
    });
}