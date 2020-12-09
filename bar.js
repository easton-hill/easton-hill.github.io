class Bar {
    constructor(padding, size, inc, value, color) {
        this.padding = padding;
        this.size = size;
        this.inc = inc;
        this.value = value;
        this.color = color;
    }

    show() {
        const canvas = document.getElementById('clock');
        const context = canvas.getContext('2d');
        context.lineWidth = 4;
        context.fillStyle = this.color;

        const docWidth = document.body.clientWidth;
        const docHeight = document.body.clientHeight;
        const display = $('#digital-clock-container').width() + $('#suffix').width();
        const left = $('#digital-clock-container').css("left");
        const start = display + parseInt(left.substring(0, left.length - 2));

        // width on either side of display
        const topWidth = docWidth - start - this.padding;
        const botWidth = docWidth - 2 * this.padding;
        const height = docHeight - 2 * this.padding;
        const totalLength = topWidth + botWidth + 2 * height + (start - display - this.padding);
        const increment = totalLength / this.inc;
        const length = this.value * increment;

        // draw line
        if (length > topWidth + 2 * height + botWidth) {
            context.fillRect(start, this.padding, topWidth, this.size);
            context.fillRect(docWidth - this.padding - this.size, this.padding, this.size, height);
            context.fillRect(docWidth - this.padding, docHeight - this.padding, -(botWidth), -this.size)
            context.fillRect(this.padding, docHeight - this.padding, this.size, -(height));
            context.fillRect(this.padding, this.padding, (length - topWidth - 2 * height - botWidth), this.size);
        } else if (length > topWidth + height + botWidth) {
            context.fillRect(start, this.padding, topWidth, this.size);
            context.fillRect(docWidth - this.padding - this.size, this.padding, this.size, height);
            context.fillRect(docWidth - this.padding, docHeight - this.padding, -(botWidth), -this.size)
            context.fillRect(this.padding, docHeight - this.padding, this.size, -(length - topWidth - height - botWidth));
        } else if (length > topWidth + height) {
            context.fillRect(start, this.padding, topWidth, this.size);
            context.fillRect(docWidth - this.padding - this.size, this.padding, this.size, height);
            context.fillRect(docWidth - this.padding, docHeight - this.padding, -(length - topWidth - height), -this.size)
        } else if (length > topWidth) {
            context.fillRect(start, this.padding, topWidth, this.size);
            context.fillRect(docWidth - this.padding - this.size, this.padding, this.size, length - topWidth);
        } else {
            context.fillRect(start, this.padding, length, this.size);
        }
    }
}
