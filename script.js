import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopiilist-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")

const input = document.getElementById("input")
const btnAdd = document.getElementById("btnAdd")
const shoppingList = document.getElementById("shopping-list")

const getInput = () => {
  alert('teste')
  let inputValue = input.value.trim()
  console.log(inputValue)

  if (inputValue.length) {
    
    //add item to firebase database
    push(shoppingListDB, inputValue)

    renderList(inputValue)
    cleanInput()
  } 
}

const renderList = (inputValue) => {
  shoppingList.innerHTML += `
      <li>${inputValue}</li>
    `
}

const cleanInput = () => {
  input.value = ''
  input.focus()
}

btnAdd.addEventListener('click', getInput)

