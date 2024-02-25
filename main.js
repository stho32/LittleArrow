document.addEventListener("DOMContentLoaded", function() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var drawing = false;
    var points = []; // Store points to draw a smooth curve
    var textContent = ''; // Store the current text content

    function getLineSettings() {
        return {
            color: document.getElementById('lineColor').value,
            width: parseInt(document.getElementById('lineWidth').value, 10),
        };
    }

    function startDrawing(e) {
        drawing = true;
        points.push({ x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop });
    }

    function stopDrawing() {
        drawing = false;
        if (points.length > 1) {
            drawSmoothCurveAndArrow(points);
            points = []; // Reset points array for the next drawing
        }
        if (textContent) {
            drawText(true);
        }
    }

    function draw(e) {
        if (!drawing) return;
        var point = { x: e.clientX - canvas.offsetLeft, y: e.clientY - canvas.offsetTop };
        points.push(point);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawTemporaryLine(points);
        drawText(true);
    }

    function drawTemporaryLine(points) {
        var settings = getLineSettings();
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.width;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (var i = 1; i < points.length - 2; i++) {
            var c = (points[i].x + points[i + 1].x) / 2;
            var d = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
        }

        // Draw last two points
        if (points.length > 2) {
            var last = points.length - 1;
            ctx.quadraticCurveTo(points[last - 1].x, points[last - 1].y, points[last].x, points[last].y);
        }

        ctx.stroke();
    }

    function drawSmoothCurveAndArrow(points) {
        var settings = getLineSettings();
        ctx.strokeStyle = settings.color;
        ctx.lineWidth = settings.width;
                
        if (points.length < 3) return; // Need at least 3 points to draw a smooth curve

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        // Draw smooth curve
        for (var i = 1; i < points.length - 2; i++) {
            var c = (points[i].x + points[i + 1].x) / 2;
            var d = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, c, d);
        }

        // Draw last part of the curve and the arrow at the end
        var last = points.length - 1;
        ctx.quadraticCurveTo(points[last - 1].x, points[last - 1].y, points[last].x, points[last].y);

        // Arrow drawing
        var end = points[last];
        var start = points[last - 1];
        drawArrow(ctx, start.x, start.y, end.x, end.y);

        ctx.stroke();
    }

    // Improved arrow drawing function
    function drawArrow(ctx, fromx, fromy, tox, toy) {
        var headlen = 15; // Length of the head in pixels
        var dx = tox - fromx;
        var dy = toy - fromy;
        var angle = Math.atan2(dy, dx);
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 7), toy - headlen * Math.sin(angle - Math.PI / 7));
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 7), toy - headlen * Math.sin(angle + Math.PI / 7));
    }

    // New function to draw text
    function drawText(keepContent = false) {
        if (!keepContent) ctx.clearRect(0, 0, canvas.width, canvas.height); // Optionally clear the canvas

        var text = document.getElementById('textInput').value;
        textContent = keepContent ? textContent : text; // Update text content if not keeping previous

        if (!textContent) return; // Don't draw if the text is empty

        // Set text properties
        ctx.font = '24px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate position
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;

        // Draw the text
        ctx.fillText(textContent, centerX, centerY);
    }

    // Function to update and draw text from the input field
    function updateText() {
        textContent = document.getElementById('textInput').value; // Get the text from the input
        // Redraw everything to update the text on canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (points.length > 1) drawTemporaryLine(points); // Redraw the line if it exists
        drawText(true); // Draw the text without clearing the canvas
    }

    window.drawText = updateText; // Make updateText function accessible from the button's onclick


    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
});
