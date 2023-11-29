// ===========================Quote Generator=========================
const quote =document.getElementById("quote")
const author =document.getElementById("author")
const apiUrl = "https://api.quotable.io/random";



async function getQuote(url){
    const response = await fetch(url);
    var data = await response.json();
   
    quote.innerHTML = `"`+data.content+`"`
    author.innerHTML = "- "+data.author
}
getQuote(apiUrl)



// ======================To-do list==================================
const addUserBtn = document.getElementById("addUser");
const btnText = addUserBtn.innerText;
const usernameTextField = document.getElementById("username");
let recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem('user');

if (objStr != null) {
    userArray = JSON.parse(objStr);
}
displayInfo();

addUserBtn.onclick = () => {
    const name = usernameTextField.value;

    if (edit_id !== null) {
        // edit
        userArray.splice(edit_id, 1, { 'name': name, 'completed': userArray[edit_id].completed || false });
        edit_id = null;
    } else {
        // insert
        userArray.push({ 'name': name, 'completed': false });
    }

    saveInfo(userArray);
    usernameTextField.value = '';
    displayInfo();
    addUserBtn.innerText = btnText;
}

usernameTextField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addUser();
    }
});

function addUser() {
    const name = usernameTextField.value;
    if (edit_id !== null) {
        // edit
        userArray.splice(edit_id, 1, { 'name': name, 'completed': userArray[edit_id].completed || false });
        edit_id = null;
    } else {
        // insert
        userArray.push({ 'name': name, 'completed': false });
    }

    saveInfo(userArray);
    usernameTextField.value = '';
    displayInfo();
    addUserBtn.innerText = btnText;
}

function saveInfo(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('user', str);
}

function displayInfo() {
    let statement = '';
    userArray.forEach((user, i) => {
        statement += `<tr id="userRow_${i}" class="list">
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        <td><i class=" btn text-white fa fa-edit btn-info mx-2"  onclick="editInfo(${i})"></i> <i class="btn btn-danger text-white fa fa-trash-o"  onclick="deleteInfo(${i})"></i></td> <td> <div class="form-check">
        <input class="form-check-input check-box" type="checkbox" ${user.completed ? 'checked' : ''} id="flexCheckDefault"  onclick="completed(${i})">
      </div></td>
      </tr>`;
    });

    recordsDisplay.innerHTML = statement;
}

function editInfo(id) {
    edit_id = id;
    usernameTextField.value = userArray[id].name;
    addUserBtn.innerText = "Save the task";
}

function deleteInfo(id) {
    userArray.splice(id, 1);
    saveInfo(userArray);
    displayInfo();
}

function completed(id) {

    userArray[id].completed = !userArray[id].completed;
    
   
    saveInfo(userArray);

 
    displayInfo();
    }














