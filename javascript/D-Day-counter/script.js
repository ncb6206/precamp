let start;
const IntervalIdArr = [];
const container = document.querySelector(".d-day-container");
const newContainer = document.querySelector(".d-day-message");
const savedDate = localStorage.getItem("saved-date");

container.style.display = "none";
newContainer.innerHTML = `<h3>D-Day를 입력해 주세요.</h3>`;

const dateFormMaker = () => {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  return dateFormat;
};

const countMaker = (data) => {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }
  const nowDate = new Date();
  const targetDate = new Date(data);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    clearInterval(start);
    console.log("타이머가 종료되었습니다.");
    container.style.display = "none";
    newContainer.innerHTML = `<h3>타이머가 종료되었습니다.</h3>`;
    newContainer.style.display = "flex";
    localStorage.removeItem("saved-date");
    return;
  } else if (isNaN(remaining)) {
    clearInterval(start);
    console.log("유효한 시간대가 아닙니다.");
    container.style.display = "none";
    newContainer.innerHTML = `<h3>유효하지 않은 시간대입니다.</h3>`;
    newContainer.style.display = "flex";
    localStorage.removeItem("saved-date");
    return;
  }

  const remainingObj = {
    remainingDate: ~~(remaining / 3600 / 24),
    remainingHours: ~~((remaining / 3600) % 24),
    remainingMin: ~~((remaining / 60) % 60),
    remainingSec: ~~(remaining % 60),
  };

  //   const documentObj = {
  //     days: document.getElementById("days"),
  //     hours: document.getElementById("hours"),
  //     min: document.getElementById("min"),
  //     sec: document.getElementById("sec"),
  //   };

  const documentArr = ["days", "hours", "min", "sec"];
  const timeKeys = Object.keys(remainingObj);
  //   const docKeys = Object.keys(documentObj);

  const format = (time) => {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  //   for (let i = 0; i < timeKeys.length; i++) {
  //     documentObj[docKeys[i]].textContent = remainingObj[timeKeys[i]];
  //   }

  //   let i = 0;
  //   for (let key in documentObj) {
  //     documentObj[key].textContent = remainingObj[timeKeys[i]];
  //     i++;
  //   }
};

const startCount = (targetDateInput) => {
  if (!targetDateInput) {
    targetDateInput = dateFormMaker();
  }
  container.style.display = "flex";
  newContainer.style.display = "none";
  setClearInterval();
  countMaker(targetDateInput);
  start = setInterval(() => countMaker(targetDateInput), 1000); // 함수에 인자가 있을 경우 화살표 함수를 안써주면 한번 밖에 실행 안됨
  IntervalIdArr.push(start);
};

const setClearInterval = () => {
  clearInterval(start);
};

const resetTimer = () => {
  container.style.display = "none";
  newContainer.innerHTML = `<h3>D-Day를 입력해 주세요.</h3>`;
  newContainer.style.display = "flex";
  document.querySelector("#target-year-input").value = "";
  document.querySelector("#target-month-input").value = "";
  document.querySelector("#target-date-input").value = "";
  localStorage.removeItem("saved-date");
  setClearInterval();
};

if (savedDate) {
  startCount(savedDate);
} else {
  container.style.display = "none";
  newContainer.innerHTML = `<h3>D-Day를 입력해 주세요.</h3>`;
}
