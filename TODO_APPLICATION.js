let todoContainer = document.getElementById("todoContainer");

function getTodoListFromLocalStorage() {
    let stringifiedList = localStorage.getItem("todoList");
    let parsedList = JSON.parse(stringifiedList);
    if (parsedList === null) {
        return [];
    } else {
        return parsedList;
    }
}

let todoList = getTodoListFromLocalStorage();

let todoCount = todoList.length;

function statusChecked(labelId, todoId) {
    let labelCheck = document.getElementById(labelId);
    labelCheck.classList.toggle("checked");
    let itemIndex = todoList.findIndex(function(item) {
        return "todo" + item.uniqueId === todoId;
    });
    let todoObject = todoList[itemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function deleteItem(todoId) {
    let todoElement = document.getElementById(todoId);
    todoContainer.removeChild(todoElement);
    let deletedItemIndex = todoList.findIndex(function(item) {
        if ("todo" + item.uniqueId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedItemIndex, 1);
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodo(TODO) {
    let checkboxId = "checkbox" + TODO.uniqueId;
    let labelId = "label" + TODO.uniqueId;
    let todoId = "todo" + TODO.uniqueId;

    let listElement = document.createElement("li");
    listElement.id = todoId;
    listElement.classList.add("list-item-container", "d-flex", "flex-row");
    todoContainer.appendChild(listElement);

    let inputElement = document.createElement("input");
    inputElement.classList.add("input-style");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = TODO.isChecked;
    listElement.appendChild(inputElement);

    inputElement.onclick = function() {
        statusChecked(labelId, todoId);
    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    listElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("label-input");
    labelElement.id = labelId;
    labelElement.textContent = TODO.text;
    if (TODO.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("deleteiconcontainer");
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function() {
        deleteItem(todoId);
    };
    localStorage.setItem("todoList", JSON.stringify(todoList));

}

for (let i of todoList) {
    addTodo(i);
}

function addItem() {
    let userInput = document.getElementById("userInput");
    let userInputValue = userInput.value;
    if (userInputValue === "") {
        alert("Enter a Valid Input!");
        return;
    }
    todoCount = todoCount + 1;
    let TODO = {
        text: userInputValue,
        uniqueId: todoCount,
        isChecked: false
    };
    todoList.push(TODO);
    addTodo(TODO);
    userInput.value = "";
}

let addBtn = document.getElementById("addBtn");
addBtn.onclick = function() {
    addItem();
};

let userInput = document.getElementById("userInput");
userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
})