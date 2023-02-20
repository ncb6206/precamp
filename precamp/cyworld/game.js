const inputword = () => {
  let inputvalue = document.getElementById("myword").value;
  let wordvalue = document.getElementById("word").innerText;

  let lastword = wordvalue[wordvalue.length - 1];
  let firstword = inputvalue[0];

  if (lastword === firstword) {
    document.getElementById("result").innerText = "정답입니다!";
    document.getElementById("word").innerText = inputvalue;
    document.getElementById("myword").value = "";
  } else {
    document.getElementById("result").innerText = "땡!";
    document.getElementById("myword").value = "";
  }
};
