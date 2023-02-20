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
  let phone1 = document.getElementById("p1").value;
  let phone2 = document.getElementById("p2").value;
  let phone3 = document.getElementById("p3").value;
  if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
    document.getElementById("authTransmit").removeAttribute("disabled");
    document.getElementById("authTransmit").style =
      "color: #0068ff; background: #ffffff; cursor:pointer";
  } else {
    document.getElementById("authTransmit").setAttribute("disabled", "true");
    document.getElementById("authTransmit").style = "background: #f1f1f1; color: #8d8d8d;";
  }
};

let countTimer;

const authTransmits = () => {
  let timer = 10;
  let minute, second;
  let authNumber = String(~~(Math.random() * 100000)).padStart(6, "0");

  document.getElementById("sixNumber").innerText = authNumber;
  document.getElementById("authTransmit").setAttribute("disabled", "true");
  document.getElementById("authTransmit").style = "background: #f1f1f1; color: #8d8d8d;";
  document.getElementById("authFinish").removeAttribute("disabled");
  document.getElementById("authFinish").style =
    "color: #ffffff; background: #0068ff; cursor:pointer";

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
      document.getElementById("sixNumber").innerText = "000000";
      document.getElementById("timer").innerText = `3:00`;
      clearInterval(countTimer);
    }
  }, 1000);
};

const transmit = () => {
  clearInterval(countTimer);
  alert("인증이 완료되었습니다.");
  document.getElementById("authFinish").style = "background-color: #FFFFFF; cursor: default;";
  document.getElementById("authFinish").setAttribute("disabled", "true");
  document.getElementById("signup").removeAttribute("disabled");
  document.getElementById("signup").style =
    "background: #ffffff; border: 1px solid #0068ff; color: #0068ff; cursor:pointer";
};

const signup = () => {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;
  const area = document.getElementById("area").value;
  const genderWoman = document.getElementById("gender__woman").checked;
  const genderMan = document.getElementById("gender__man").checked;

  let isValid = true;
  if (email.includes("@") === false) {
    document.getElementById("emailError").innerText = "이메일이 올바르지 않습니다.";
    isValid = false;
  } else {
    document.getElementById("emailError").innerText = "";
  }

  if (name === "") {
    document.getElementById("nameError").innerText = "이름이 올바르지 않습니다.";
    isValid = false;
  } else {
    document.getElementById("nameError").innerText = "";
  }

  if (password === "") {
    document.getElementById("passwordError").innerText = "비밀번호를 입력해 주세요.";
    isValid = false;
  } else {
    document.getElementById("passwordError").innerText = "";
  }

  if (passwordConfirm === "") {
    document.getElementById("passwordConfirmError").innerText = "비밀번호를 입력해 주세요.";
    isValid = false;
  } else {
    document.getElementById("passwordConfirmError").innerText = "";
  }

  if (password !== passwordConfirm) {
    document.getElementById("passwordError").innerText = "비밀번호1과 비밀번호2가 동일해야 합니다.";
    document.getElementById("passwordConfirmError").innerText =
      "비밀번호1과 비밀번호2가 동일해야 합니다.";
    isValid = false;
  }

  if (area !== "서울" && area !== "경기" && area !== "인천") {
    document.getElementById("areaError").innerText = "지역을 선택해 주세요.";
    isValid = false;
  } else {
    document.getElementById("areaError").innerText = "";
  }

  if (!(genderWoman || genderMan)) {
    document.getElementById("genderError").innerText = "성별을 선택해 주세요.";
    isValid = false;
  } else {
    document.getElementById("genderError").innerText = "";
  }

  if (isValid) {
    alert("코드캠프 가입을 축하합니다. 🎉");
  }
};
