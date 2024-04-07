function TextObject(text, x, y, font, color) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font || "20px 'Comic Sans MS', cursive, sans-serif";
    this.color = color || "#000000";
    this.type = 'textObject';

    this.draw = function(context) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";

        // Split the text into lines
        const lines = this.text.split('\n');

        // Calculate the height of the text to adjust the starting y position
        const lineHeight = context.measureText('M').width * 1.2; // Rough estimate of line height
        let startY = this.y - (lineHeight * (lines.length - 1) / 2);

        // Draw each line with an appropriate vertical offset
        for (let i = 0; i < lines.length; i++) {
            context.fillText(lines[i], this.x, startY + (i * lineHeight));
        }
    };
}
