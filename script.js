import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopiilist-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")

const input = document.getElementById("input")
const btnAdd = document.getElementById("btnAdd")
const shoppingList = document.getElementById("shopping-list")

onValue(shoppingListDB, (snapshot) => {
  let listArray = Object.entries(snapshot.val())
  
  clearList()

  for (let i in listArray) {
    let currentItem = listArray[i] 
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    renderList(currentItemValue)
  }
})

const getInput = () => {
  let inputValue = input.value.trim()

  if (inputValue.length) {
    //add item to firebase database
    push(shoppingListDB, inputValue)
  } 
}

const renderList = (inputValue) => {
  shoppingList.innerHTML += `
    <li>${inputValue}</li>
  `
}

const clearList = () => {
  shoppingList.innerHTML = ''
  input.value = ''
  input.focus()
}

btnAdd.addEventListener('click', getInput)

