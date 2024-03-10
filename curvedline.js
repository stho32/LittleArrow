class CurvedLine {
    constructor(lineColor, lineWidth, smoothness) {
        this.type = 'curvedLine';
        this.lineColor = lineColor;
        this.lineWidth = lineWidth;
        this.smoothness = smoothness;
        this.points = []; // Array to hold points
    }

    // Method to set the start coordinates of the line
    setStart(x, y) {
        // Reset points array with the new start point
        this.points = [{ x, y }];
    }

    // Method to collect points, renamed for clarity
    addPoint(x, y) {
        if (this.shouldAddPoint(x, y)) {
            this.points.push({ x, y });
        }
    }

    shouldAddPoint(x, y) {
        const lastPoint = this.points[this.points.length - 1];
        if (!lastPoint) return true; // Always add if there are no previous points

        const smoothnessFactor = Math.max(1, this.smoothness); // Ensure smoothnessFactor is at least 1
        const maxDistance = smoothnessFactor; // Adjust this formula as needed

        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance > maxDistance;
    }

    // Method to draw the curved line with an arrow on the canvas
    draw(context) {
        if (this.points.length < 2) {
            console.error('CurvedLine draw called without enough points.');
            return;
        }

        // Setup line style
        context.strokeStyle = this.lineColor;
        context.lineWidth = this.lineWidth;
        context.lineJoin = 'round';
        context.lineCap = 'round';

        // Begin the drawing path
        context.beginPath();
        context.moveTo(this.points[0].x, this.points[0].y);

        // Draw smooth curve through the points
        for (let i = 1; i < this.points.length - 2; i++) {
            let c = (this.points[i].x + this.points[i + 1].x) / 2;
            let d = (this.points[i].y + this.points[i + 1].y) / 2;
            context.quadraticCurveTo(this.points[i].x, this.points[i].y, c, d);
        }

        // Handle the last two points
        if (this.points.length > 2) {
            let last = this.points.length - 1;
            context.quadraticCurveTo(
                this.points[last - 1].x, this.points[last - 1].y,
                this.points[last].x, this.points[last].y);
        }

        context.stroke();

        // Draw arrow at the end of the curve
        if (this.points.length > 1) {
            let end = this.points[this.points.length - 1];
            let start = this.points[this.points.length - 2];
            this.drawArrow(context, start.x, start.y, end.x, end.y);
        }
    }

    // Method to draw an arrow on the canvas
    drawArrow(context, fromx, fromy, tox, toy) {
        let headlen = 10; // length of head in pixels
        let dx = tox - fromx;
        let dy = toy - fromy;
        let angle = Math.atan2(dy, dx);

        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
        context.moveTo(tox, toy);
        context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
        context.stroke();
    }
}
