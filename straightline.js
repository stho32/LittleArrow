class StraightLine {
    constructor(lineColor, lineWidth) {
        this.type = 'straightLine';
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.start = null; // Object to hold the start point
        this.end = null; // Object to hold the end point
    }

    // Method to set the start point of the line
    setStart(x, y) {
        this.start = { x, y };
    }

    // Method to set the end point of the line
    setEnd(x, y) {
        this.end = { x, y };
    }

    // Method to draw the straight line on the canvas
    draw(context) {
        if (!this.start || !this.end) {
            console.error('StraightLine draw called without proper start or end.');
            return;
        }

        // Setup line style
        context.strokeStyle = this.lineColor;
        context.lineWidth = this.lineWidth;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // Draw the line
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();
    }
}
