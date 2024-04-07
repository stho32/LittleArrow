class HighlightTool {
    constructor(lineColor, lineWidth) {
        this.type = 'highlight';
        this.lineColor = lineColor;
        this.lineWidth = Math.max(20, lineWidth); // Ensuring a minimum width for visibility
        this.start = null;
        this.end = null;
    }

    // Method to set the start point of the highlight
    setStart(x, y) {
        this.start = { x, y };
    }

    addPoint(x, y) {
        this.setEnd(x, y);
    }

    // Method to set the end point of the highlight
    setEnd(x, y) {
        this.end = { x, y };
    }

    // Converts a hex color to an RGBA string with the specified alpha value
    hexToRgba(hex, alpha = 0.5) {
        // Remove the hash at the start if it's there
        hex = hex.replace(/^#/, '');
        
        // Parse the hex string into rgb values
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);

        // Return the rgba color string
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Method to draw the highlight on the canvas
    draw(context) {
        if (!this.start || !this.end) {
            console.error('HighlightTool draw called without proper start or end.');
            return;
        }

        // Convert hex color to RGBA for semi-transparent drawing
        const transparentColor = this.hexToRgba(this.lineColor);

        // Setup highlight style
        context.strokeStyle = transparentColor;
        context.lineWidth = this.lineWidth;
        context.lineJoin = 'square';
        context.lineCap = 'square';
        context.globalCompositeOperation = 'multiply'; // Blend mode that works well for highlights

        // Draw the highlight
        context.beginPath();
        context.moveTo(this.start.x, this.start.y);
        context.lineTo(this.end.x, this.end.y);
        context.stroke();

        // Resetting composite operation to default
        context.globalCompositeOperation = 'source-over';
    }
}
