let isStarted = false;

const changeNum = () => {
  if (isStarted === false) {
    isStarted = true;

    let ranNumber = String(Math.floor(Math.random() * 100000));
    let rgb = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)})`;
    document.getElementById("sixNum").innerText = ranNumber.padStart(6, "0");
    document.getElementById("sixNum").style.color = rgb;

    let time = 180;
    let timer;

    timer = setInterval(function () {
      if (time >= 0) {
        minute = ~~(time / 60);
        second = String(time % 60).padStart(2, "0");
        document.getElementById("timer").innerText = `${minute}:${second}`;
        time -= 1;
      } else {
        document.getElementById("auth").disabled = true;
        isStarted = false;
        clearInterval(timer);
      }
    }, 1000);
  } else {
  }
};
