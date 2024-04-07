function TextObject(text, x, y, font, color) {
    this.text = text;
    this.x = x; // This x position now represents the start of the text (left-aligned)
    this.y = y; // Central y position of the entire text block
    this.font = font || "20px 'Comic Sans MS', cursive, sans-serif";
    this.color = color || "#000000";
    this.type = 'textObject';
    this.maxWidth = 760; // Adjust this to fit your canvas or specific design needs

    this.draw = function(context) {
        context.font = this.font;
        context.fillStyle = this.color;
        context.textAlign = "center";
        context.textBaseline = "middle";

        const lineHeight = context.measureText('M').width * 1.2;

        // Split the text into lines considering newline characters
        let paragraphs = this.text.split('\n');
        let lines = [];

        paragraphs.forEach((paragraph) => {
            let words = paragraph.split(' ');
            let line = '';

            words.forEach((word) => {
                let testLine = line + word + ' ';
                let metrics = context.measureText(testLine);
                let testWidth = metrics.width;

                if (testWidth > this.maxWidth && line !== '') {
                    lines.push(line);
                    line = word + ' ';
                } else {
                    line = testLine;
                }
            });

            lines.push(line);
        });

        // Adjust startY based on the total height of the text block to center it vertically
        let totalTextHeight = lineHeight * lines.length;
        let startY = this.y - (totalTextHeight / 2) + (lineHeight / 2); // Adjust to start drawing from the first baseline

        // Draw each line with the adjusted start position
        lines.forEach((line, i) => {
            context.fillText(line.trim(), this.x, startY + (i * lineHeight));
        });
    };
}
