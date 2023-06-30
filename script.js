import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
  databaseURL: "https://shopiilist-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, "shoppingList")

const input = document.getElementById("input")
const btnAdd = document.getElementById("btnAdd")
const shoppingList = document.getElementById("shopping-list")
const listTitle = document.getElementsByTagName("p")
console.log(listTitle)
let listArray = []

onValue(shoppingListDB, (snapshot) => {
  
  listArray = Object.entries(snapshot.val() || [])

  if(!listArray.length) {
    listTitle[0].style.display = "none" 
  } else {
    listTitle[0].style.display = "block"
  }
    
  clearList()

  for (let i in listArray) {
    let currentItem = listArray[i] 
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]

    renderList(currentItem)
  }
})

const getInput = () => {
  let inputValue = input.value.trim()

  if (inputValue.length) {
    //add item to firebase database
    push(shoppingListDB, inputValue)
  } 
}

const renderList = (item) => {
  let itemID = item[0]
  let itemValue = item[1]

  let element = document.createElement('li') 
  element.textContent = itemValue

  let icon = document.createElement('i')
  icon.className = "fa-regular fa-circle-xmark"

  element.append(icon)
  
  element.addEventListener('click', function() {
    // let itemOnFirebase = ref(database, `/shoppingList/${itemID}}`)
    // console.log(itemOnFirebase)
    // remove(itemOnFirebase)
    let itemOnFirebase = ref(database, `/shoppingList/${itemID}`)
    remove(itemOnFirebase)
  })

  shoppingList.append(element)
}

const clearList = () => {
  shoppingList.innerHTML = ''
  input.value = ''
  input.focus()
}

btnAdd.addEventListener('click', getInput)

