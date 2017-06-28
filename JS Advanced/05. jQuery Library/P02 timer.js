function timer() {

    $('#start-timer').click(function () {
        if(!clicked){
            interval = setInterval(step,1000);
        }
        clicked = true;
    });

    $('#stop-timer').click(function () {
        clearInterval(interval);
        clicked = false;
    });

    let time = 0;
    let clicked = false;
    let interval;
    
    function step() {
        time++;
        let seconds = ('0' + time % 60).slice(-2);
        $('#seconds').text(seconds);
        let minutes = ('0' + Math.floor(time / 60)).slice(-2);
        if (minutes >= 60){
            minutes -=60;
            minutes = ('0' + minutes).slice(-2);
        }
        $('#minutes').text(minutes);
        let hours = ('0' + Math.floor(time / 60 / 60)).slice(-2);
        $('#hours').text(hours);
    }
}