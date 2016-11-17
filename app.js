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
        /*****************************
        INPUT
         *****************************/
        var keys = [];

        window.addEventListener("keydown",
            function(e){
                keys[e.keyCode] = e.keyCode;
                var keysArray = getNumberArray(keys);
            },
            false);

        window.addEventListener('keyup',
            function(e){
                keys[e.keyCode] = false;
            },
            false);

        function getNumberArray(arr){
            var newArr = new Array();
            for(var i = 0; i < arr.length; i++){
                if(typeof arr[i] == "number"){
                    newArr[newArr.length] = arr[i];
                }
            }
            return newArr;
        }

        /*****************************
         MAIN
         *****************************/
        //PLAYER STATS
        var HP = 10;
        var SPD =  4;
        var jumpHeight = 7;

        var currentPositionX = 0;
        var currentPositionY = 0;
        var velocityY = 0;
        var velocityX = 0;
        var grounded = false;

        //Get elements
        var hero = document.querySelector(".hero");
        var level = document.querySelector(".level");
        //var platforms = document.querySelectorAll(".platform");
        var platforms = objectElements;

        restartPosition();

        setInterval(function(){ update();}, 15);
        function update() {
            // Get input
            // Right D
            if (keys[68]) { walk(true); }
            // Left A
            if (keys[65]) { walk(false); }
            // Up W
            if (keys[87]) { jump(); }
            // Restart R
            if (keys[82]) {
                restartPosition();
            }

            //console.log(keys[82]);

            //Get current hero's position
            currentPositionX = toNumber(hero.style.left);
            currentPositionY = toNumber(hero.style.top);

            //Move view to player
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            window.scrollTo(currentPositionX - w/2, h/2);

            //Stop from going outside the level on left side
            if (currentPositionX < 0) {
                hero.style.left = 0;
            }
            //Stop from going outside the level on right side
            if (currentPositionX + hero.offsetWidth >= level.offsetWidth) {
                hero.style.left = toNumber(level.offsetWidth) - toNumber(hero.offsetWidth) + "px";
            }

            //Apply gravitational force
            velocityY += 0.3;

            //Check collisions in characters new position
            checkCollisions();

            //Fall
            hero.style.top = toNumber(hero.style.top) + velocityY + 'px';
            //Move hero
            hero.style.left = currentPositionX + velocityX + "px";
            //Add friction to hero
            if (velocityX != 0) { velocityX *= .9; }
        }

        /*****************************
         MOVEMENT FUNCTIONS
         *****************************/

        function walk(toRight) {
            var acceleration = 0.1;
            if (velocityX > -5 && velocityX < 5) {
                if (toRight) {
                    velocityX += SPD * acceleration;
                } else {
                    velocityX += -SPD * acceleration;
                }
            }
        }

        function jump() {
            if (velocityY == 0) {
                velocityY = -jumpHeight;
                hero.style.top = toNumber(hero.style.top) - 1 + 'px';
            }
        }

        /*****************************
         HELPER FUNCTIONS
         *****************************/

        function toNumber(fromNumber) {
            var returnValue = Number(fromNumber);
            if(isNaN(returnValue)){
                returnValue = parseFloat(fromNumber);
            }
            return returnValue;
        }

        function restartPosition() {
            //Set players start position
            hero.style.top = 370 + 'px';
            hero.style.left = 350 + 'px';
            velocityX = 0;
            velocityY = 0;
        }

        function checkCollisions() {
            //Check for collisions with each platform
            for (var i = 0; i < platforms.length; i++) {
                //NOTE: after getBoundingClientRect() a  + window.scrollX/Y is needed, because getBoundingClientRect() returns position relative to view
                var platform = platforms[i];
                var collided = false;
                //Check for collision with current velocity
                //Check on X axis
                if (isCollide(platform, velocityX, 0)) {
                    velocityX = 0;
                    collided = true;
                }
                //Check on Y axis
                if (isCollide(platform,0, velocityY)) {
                    velocityY = 0;
                    collided = true;
                }
                //If there was no collision on X and Y, check on diagonal
                if (!collided) {
                    if (isCollide(platform, velocityX, velocityY)) {
                        velocityX = 0;
                        velocityY = 0;
                        collided = true;
                    }
                }
                //If collided with current platform, depending on it's class do an action
                if (collided) {
                    switch (platform.className) {
                        case 'platform':
                            break;
                        case 'trampoline':
                            velocityY = - 12.5;
                            break;
                        case 'slow':
                            velocityX *= .7;
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        function isCollide(platform, currentX, currentY) {
            var platformX = platform.getBoundingClientRect().left + window.scrollX;
            var platformY = platform.getBoundingClientRect().top + window.scrollY;
            // Move the players position by his velocity depending on axis to check future collision
            var heroX = currentPositionX + currentX;
            var heroY = currentPositionY + currentY;

            var collided = !(
                ((heroY + hero.offsetHeight) < (platformY)) ||
                (heroY > (platformY + platform.offsetHeight)) ||
                ((heroX + hero.offsetWidth) < platformX) ||
                (heroX > (platformX + platform.offsetWidth))
            );
            return collided;
        }
    });
}