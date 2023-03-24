const bookForm = document.getElementById("book-form");
const bookInput = document.querySelector("#book-form input");
const bookList = document.getElementById("book-list");

const BOOKS_KEY = "books";

let books = [];

function saveBooks() {
  localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

function deleteBook(event) {
  //console.log(event.target.parentElement.innerText);
  //console.log(event.target.parentElement);
  const li = event.target.parentElement;
  //toDoList.removeChild(li);
  li.remove(); //위의 내용과 같음
  //console.log(li.id);
  books = books.filter((element) => element.id !== parseInt(li.id)); //forEach처럼 각각실행, true만 남음
  saveBooks();
}

function paintBook(newBook) {
  //console.log("newBook", newBook);
  const li = document.createElement("li");
  li.id = newBook.id;
  /*
  const span = document.createElement("span");
  span.innerText = ` ${newBook.text}`;
  const button = document.createElement("button");
  button.innerText = "✖";
*/
  const link = document.createElement("a");
  link.href = `${newBook.address}`;
  link.textContent = ` ${newBook.text}`;
  const button = document.createElement("button");
  //button.innerText = "✖";
  button.className += "btn-close"; //bootstrap 코드

  button.addEventListener("click", deleteBook);

  li.appendChild(button);
  //li.appendChild(span);
  li.appendChild(link);
  li.className += "link-content";
  bookList.appendChild(li);
}

function handleBookSubmit(event) {
  event.preventDefault();
  //console.log(bookInput.value);
  const userInput = prompt("Bookmark로 저장할 이름을 입력하시오");
  //console.log("userInput", userInput);
  let newBook = "";
  if (userInput === "") {
    newBook = bookInput.value; //입력값이 없으면 제목에도 url로 입력처리
    //console.log("if");
  } else {
    newBook = userInput;
    //console.log("else");
  }
  //console.log("newBook", newBook);
  //console.log("userInput", userInput);

  //const newBook = userInput;
  const https = bookInput.value;

  bookInput.value = "";
  const newBookObj = {
    text: newBook,
    address: https,
    id: Date.now(), //현재시간을 ms단위로 보여주기때문에 유니크에 가까운 랜덤숫자로 사용가능
  };
  books.push(newBookObj); //books 배열에 newBook을 push~!
  paintBook(newBookObj);
  saveBooks();
}

bookForm.addEventListener("submit", handleBookSubmit);

/*
function sayHello(item) {
  console.log("this is the turn of", item);
}
*/

const savedBooks = localStorage.getItem(BOOKS_KEY);

if (savedBooks !== null) {
  const parsedBooks = JSON.parse(savedBooks); //array 로 변환
  books = parsedBooks;
  //parsedToDos.forEach(sayHello); //array 갯수만큼 각각 실행해줌
  parsedBooks.forEach((element) => {
    paintBook(element);
    //console.log("this is the turn of...", element);
  });
}
