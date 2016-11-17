<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
<form action="">
    <div>
        <label for="height">Height</label>
        <input type="text" name="height">
    </div>
    <div>
        <label for="width">Width</label>
        <input type="text" name="width">
    </div>
    <div>
        <label for="gridsize">Gridsize</label>
        <input type="text" name="gridsize">
    </div>
    <div>
        <label for="type">Type</label>
        <select name="type">
            <option value="platform">Platform</option>
            <option value="trampoline">Trampoline</option>
            <option value="slow">Slow</option>
        </select>
    </div>
    <button id="generateObject">
        Generate object
    </button>
    <button id="exportLevel">
        Export level
    </button>
</form>
<div class="preview"></div>
<script
        src="https://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous">
</script>
<script src="app.js"></script>
</body>
</html>