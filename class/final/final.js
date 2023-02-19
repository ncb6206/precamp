const changeFocus1 = () => {
  let phone1 = document.getElementById("p1").value;
  if (phone1.length === 3) {
    document.getElementById("p2").focus();
  }
};

const changeFocus2 = () => {
  let phone2 = document.getElementById("p2").value;
  if (phone2.length === 4) {
    document.getElementById("p3").focus();
  }
};

const setAuth = () => {
  let phone3 = document.getElementById("p3").value;
  if (phone3.length === 4) {
    document.getElementById("authTransmit").removeAttribute("disabled");
    document.getElementById("authTransmit").style =
      "color: #0068ff; background: #ffffff; cursor:pointer";
  } else {
    document.getElementById("authTransmit").setAttribute("disabled", "true");
    document.getElementById("authTransmit").style = "background: #f1f1f1; color: #8d8d8d;";
  }
};

const authTransmits = () => {
  let ifStarted = false;
  let timer = 5;
  let minute, second, countTimer;
  let authNumber = String(~~(Math.random() * 100000));

  document.getElementById("sixNumber").innerText = authNumber.padStart(6, "0");
  document.getElementById("authTransmit").setAttribute("disabled", "true");
  document.getElementById("authTransmit").style = "background: #f1f1f1; color: #8d8d8d;";
  document.getElementById("authFinish").removeAttribute("disabled");
  document.getElementById("authFinish").style =
    "color: #ffffff; background: #0068ff; cursor:pointer";

  if (ifStarted === false) {
    ifStarted = true;
    countTimer = setInterval(function () {
      if (timer >= 0) {
        minute = String(~~(timer / 60));
        second = String(timer % 60).padStart(2, "0");
        document.getElementById("timer").innerText = `${minute}:${second}`;
        timer -= 1;
      } else {
        document.getElementById("authFinish").setAttribute("disabled", "true");
        document.getElementById("authFinish").style = "background: #f1f1f1; color: #8d8d8d;";
        document.getElementById("authTransmit").removeAttribute("disabled");
        document.getElementById("authTransmit").style =
          "color: #0068ff; background: #ffffff; cursor:pointer";
        ifStarted = false;
        clearInterval(countTimer);
      }
    }, 1000);
  } else {
  }
};
