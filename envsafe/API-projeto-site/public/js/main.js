let baseOffsetY = document.getElementById('baseYToMenu').offsetTop;

let time;

inactivityTime = () => {
    time = 0;
    setInterval(() => {
        time++
        if (time > 3 && document.getElementById('sec-menu').classList.contains('visible')) {
            document.getElementById('sec-menu').classList.remove('visible');
        }
    }, 1000);
}

resetTimer = () => {
    setTimeout(() => {
        time = 0;
    }, 1000)

}


window.onload = () => {
    inactivityTime();

}


window.onscroll = (e) => {
    let currentY = Math.round(window.scrollY);
    resetTimer();

    if (currentY >= baseOffsetY) {
        document.getElementById('sec-menu').classList.add('visible');


    } else {
        if (document.getElementById('sec-menu').classList.contains('visible')) {
            document.getElementById('sec-menu').classList.remove('visible');
        }
    }
}


