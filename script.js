// DOM Elements Creation
const container = document.createElement("div");
container.className = "container p-3";

const title = document.createElement("h2");
title.className = "text-center";
title.innerText = "DOM Calculator";

const calcBox = document.createElement("div");
calcBox.className = "card p-4 shadow rounded mx-auto";
calcBox.style.maxWidth = "400px";

const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("readonly", "readonly");
input.className = "form-control mb-3 text-end fs-4";
input.id = "calc-display";

const btnValues = [
  "7", "8", "9", "/", 
  "4", "5", "6", "*", 
  "1", "2", "3", "-", 
  "0", ".", "=", "+",
  "C", "%", "M+", "M-",
  "MC"
];

const btnGrid = document.createElement("div");
btnGrid.className = "row row-cols-4 g-2";

// Create buttons dynamically
btnValues.forEach(value => {
  const col = document.createElement("div");
  col.className = "col";
  
  const btn = document.createElement("button");
  btn.className = "btn btn-outline-dark w-100";
  btn.innerText = value;

  btn.addEventListener("click", () => handleClick(value));

  col.appendChild(btn);
  btnGrid.appendChild(col);
});

calcBox.appendChild(input);
calcBox.appendChild(btnGrid);
container.appendChild(title);
container.appendChild(calcBox);
document.body.appendChild(container);

let memory = localStorage.getItem("calcMemory") || "0";

function handleClick(value) {
  let display = document.getElementById("calc-display");
  switch (value) {
    case "=":
      try {
        display.value = eval(display.value);
      } catch {
        display.value = "Error";
      }
      break;
    case "C":
      display.value = "";
      break;
    case "M+":
      localStorage.setItem("calcMemory", eval(display.value));
      break;
    case "M-":
      localStorage.setItem("calcMemory", "0");
      break;
    case "MC":
      display.value = localStorage.getItem("calcMemory") || "0";
      break;
    default:
      display.value += value;
  }
}

// Keyboard event listener
document.addEventListener("keydown", (event) => {
  const key = event.key;
  const allowed = /[0-9+\-*/%=.]/;
  if (allowed.test(key)) {
    input.value += key;
  } else if (key === "Enter") {
    try {
      input.value = eval(input.value);
    } catch {
      input.value = "Error";
    }
  } else if (key === "Backspace") {
    input.value = input.value.slice(0, -1);
  } else {
    alert("Only numbers are allowed");
    event.preventDefault();
  }
});
