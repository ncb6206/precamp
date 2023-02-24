const savedWeatherData = JSON.parse(localStorage.getItem("saved-weather"));
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

const savedTodoList = JSON.parse(localStorage.getItem("saved-items"));

const createTodo = (storageData) => {
  let todoContents = todoInput.value;
  if (storageData) {
    todoContents = storageData.contents;
  }

  const newLi = document.createElement("li");
  const newSpan = document.createElement("span");
  const newBtn = document.createElement("button");

  newBtn.addEventListener("click", () => {
    newLi.classList.toggle("complete");
    saveItemsFn();
  });

  newLi.addEventListener("dblclick", () => {
    newLi.remove();
    saveItemsFn();
  });

  //storageData뒤에 ?를 붙이면 storageData가 정상적인 값이 아닐때는 접근 시도조차 하지 않는다는 것을 의미
  if (storageData?.complete) {
    newLi.classList.add("complete");
  }

  // 위랑 아래랑 같은 기능을 한다.
  //   if(storageData && storageData.complete){
  //     newLi.classList.add("complete");
  //   }

  newSpan.textContent = todoContents;
  newLi.appendChild(newBtn);
  newLi.appendChild(newSpan);
  todoList.appendChild(newLi);
  todoInput.value = "";
  saveItemsFn();
};

const keyCodeCheck = () => {
  if (window.event.keyCode === 13 && todoInput.value.trim() !== "") {
    createTodo();
  }
};

const deleteAll = () => {
  const liList = document.querySelectorAll("li");

  for (let i = 0; i < liList.length; i++) {
    liList[i].remove();
  }
  saveItemsFn();
};

const saveItemsFn = () => {
  const saveItems = [];

  for (let i = 0; i < todoList.children.length; i++) {
    const todoObj = {
      contents: todoList.children[i].querySelector("span").textContent,
      complete: todoList.children[i].classList.contains("complete"),
    };
    saveItems.push(todoObj);
  }

  saveItems.length === 0
    ? localStorage.removeItem("saved-items")
    : localStorage.setItem("saved-items", JSON.stringify(saveItems));

  //   if (saveItems.length === 0) {
  //     localStorage.removeItem("saved-items");
  //   } else {
  //     localStorage.setItem("saved-items", JSON.stringify(saveItems));
  //   }
};

if (savedTodoList) {
  for (let i = 0; i < savedTodoList.length; i++) {
    createTodo(savedTodoList[i]);
  }
}

const weatherDataActive = ({ location, weather }) => {
  const weatherMainList = ["Clear", "Clouds", "Drizzle", "Rain", "Snow", "Thunderstorm"];
  weather = weatherMainList.includes(weather) ? weather : "Fog";
  const locationNameTag = document.querySelector("#location-name-tag");
  locationNameTag.textContent = location;
  document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;
  if (
    !savedWeatherData ||
    savedWeatherData.location !== location ||
    savedWeatherData.weather !== weather
  ) {
    localStorage.setItem("saved-weather", JSON.stringify({ location, weather }));
  }
};

const weatherSearch = ({ latitude, longitude }) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=306620db464e6fc86a309740430a67a7`
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      const weatherData = {
        location: json.name,
        weather: json.weather[0].main,
      };
      weatherDataActive(weatherData);
    })
    .catch((err) => {
      console.error(err);
    });
};

// const weatherSearch = (position) => {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=306620db464e6fc86a309740430a67a7`
//   )
//     .then((res) => {
//       return res.json();
//     })
//     .then((json) => {
//       console.log(json.name, json.weather[0].main);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// };

// 구조분해할당을 이용하여 position 쓸 필요없이 바로 coords에 접근 가능, coords에서 구조분해할당을 이용하여 latitude, longitude 바로 뽑아냄
const askForLocation = () => {
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const { latitude, longitude } = coords;
      // shorthand property
      const positionObj = {
        latitude,
        longitude,
      };

      weatherSearch(positionObj);
    },
    (err) => {
      console.log(err);
    }
  );
};

// const askForLocation = () => {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const positionObj = {
//         latitude: position.coords.latitude,
//         longitude: position.coords.longitude,
//       };

//       weatherSearch(positionObj);
//     },
//     (err) => {
//       console.log(err);
//     }
//   );
// };

askForLocation();

if (savedWeatherData) {
  weatherDataActive(savedWeatherData);
}
