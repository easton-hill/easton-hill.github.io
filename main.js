$(document).ready(() => {
    size();
    main();
    setInterval(main, 1000);
});

$(window).resize(() => {
    size();
    main();
});

function size() {
    // adjust canvas size & time display position based on window size
    const canvas = document.getElementById('clock');
    const width = $(window).width();
    canvas.width = width;
    canvas.height = $(window).height();
    const displayWidth = $('#digital-clock-container').width();
    $('#digital-clock-container').css("left", `${width / 2 - displayWidth / 2}px`);
}

function main() {
    const canvas = document.getElementById('clock');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();

    const hBar = new Bar(0, 10, 24, hour, "#e27d60");
    const mBar = new Bar(12, 10, 60, min, "#e8a87c");
    const sBar = new Bar(24, 10, 60, sec, "#c38d9e");
    hBar.show();
    mBar.show();
    sBar.show();

    $("#hour").text(`${(hour && hour !== 12 ? hour % 12 : 12).toString().padStart(2, "0")}:`);
    $("#min").text(`${min.toString().padStart(2, "0")}:`);
    $("#sec").text(`${sec.toString().padStart(2, "0")}`);
    $("#suffix").text(hour >= 12 ? "PM" : "AM");
}