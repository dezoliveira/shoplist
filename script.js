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

window.onload = () => {
  let online = navigator.onLine;
  if (!online) {
    alert('Verifique a sua conexão com a internet!')
  }
}

onValue(shoppingListDB, (snapshot) => {
  
  //Firebase verification
  if (snapshot.exists()) {
   
    let listArray = Object.entries(snapshot.val())

    clearList()

    shoppingList.innerHTML = `
      <p>Items da Lista:</p>
    `

    for (let i in listArray) {
      let currentItem = listArray[i] 
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]

      renderList(currentItem)
    }
  
  } else {
    shoppingList.innerHTML = `
      <p>Nenhum item na lista. 😅</p>
    `
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
  
  icon.addEventListener('click', function() {
    // let itemOnFirebase = ref(database, `/shoppingList/${itemID}`)
    // remove(itemOnFirebase)
    modalToggle(itemID)

  })

  shoppingList.append(element)
}

const modalToggle = (itemID) => {
  let id = itemID
  const modal = document.querySelector('.backdrop')
  modal.classList.remove('hide')
  modal.classList.add('show')
  
  const buttons = [ 
    '.close-button', 
    '#btn-cancel', 
    '#btn-confirm'
  ]
  
  buttons.forEach((item) => {
    document.querySelector(item).addEventListener('click', () => {
      if (item === '#btn-confirm') {
        let itemOnFirebase = ref(database, `/shoppingList/${id}`)
        remove(itemOnFirebase)
        modal.classList.remove('show')
        modal.classList.add('hide')
      } else {
        modal.classList.remove('show')
        modal.classList.add('hide')
        id = null
      }
    })
  })
}

const clearList = () => {
  shoppingList.innerHTML = ''
  input.value = ''
  // input.focus()
}

btnAdd.addEventListener('click', getInput)

