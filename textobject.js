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
        context.fillText(this.text, this.x, this.y);
    };
}
