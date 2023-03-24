const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  //console.log(event.target.parentElement.innerText);
  //console.log(event.target.parentElement);
  const li = event.target.parentElement;
  //toDoList.removeChild(li);
  li.remove(); //위의 내용과 같음
  //console.log(li.id);
  toDos = toDos.filter((element) => element.id !== parseInt(li.id)); //forEach처럼 각각실행, true만 남음
  saveToDos();
}

function paintToDo(newTodo) {
  //console.log("newTodo", newTodo);
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = ` ${newTodo.text}`;
  const button = document.createElement("button");
  //button.innerText = "✖";
  button.className += "btn-close"; //bootstrap 코드

  button.addEventListener("click", deleteToDo);

  li.appendChild(button);
  li.appendChild(span);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  //console.log(toDoInput.value);
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(), //현재시간을 ms단위로 보여주기때문에 유니크에 가까운 랜덤숫자로 사용가능
  };
  toDos.push(newTodoObj); //toDos 배열에 newTodo를 push~!
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

/*
function sayHello(item) {
  console.log("this is the turn of", item);
}
*/

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos); //array 로 변환
  toDos = parsedToDos;
  //parsedToDos.forEach(sayHello); //array 갯수만큼 각각 실행해줌
  parsedToDos.forEach((element) => {
    paintToDo(element);
    //console.log("this is the turn of...", element);
  });
}
