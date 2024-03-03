class ArrowLine {
    constructor(lineColor, lineWidth, smoothness) {
        this.type = 'arrowLine'; // Fixed type for all instances
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.smoothness = smoothness;

        // Additional properties for start and end coordinates
        // These would be set when the line is actually drawn
        this.startX = null;
        this.startY = null;
        this.endX = null;
        this.endY = null;
    }

    // Method to set the start coordinates of the line
    setStart(x, y) {
        this.startX = x;
        this.startY = y;
    }

    // Method to set the end coordinates of the line
    setEnd(x, y) {
        this.endX = x;
        this.endY = y;
    }

    // Method to draw the line with an arrow on the canvas
    draw(context) {
        if (this.startX === null || this.startY === null || this.endX === null || this.endY === null) {
            console.error('ArrowLine draw called without setting start or end points.');
            return;
        }

        // Setup line style
        context.strokeStyle = this.lineColor;
        context.lineWidth = this.lineWidth;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // Drawing the line
        context.beginPath();
        context.moveTo(this.startX, this.startY);
        context.lineTo(this.endX, this.endY);

        // Drawing the arrow head
        var headlen = 10; // length of head in pixels
        var angle = Math.atan2(this.endY - this.startY, this.endX - this.startX);
        context.lineTo(this.endX - headlen * Math.cos(angle - Math.PI / 6), this.endY - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(this.endX, this.endY);
        context.lineTo(this.endX - headlen * Math.cos(angle + Math.PI / 6), this.endY - headlen * Math.sin(angle + Math.PI / 6));

        // Apply the stroke
        context.stroke();
    }
}