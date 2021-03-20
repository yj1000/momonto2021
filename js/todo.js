const todoMenu = document.querySelector(".menu__todo"),
    //  todoDiv = document.querySelector(".to_do_list"),
    todoID = document.querySelector("#to_do_list"),
    pending = document.querySelector(".pending"),
    finished = document.querySelector(".finished"),
    pendingForm = pending.querySelector("form"),
    finishedForm = finished.querySelector("form");

const PENDING = "Pending",
    FINISHED = "Finished",
    none_CN = "none";
let pendingList = [];
let finishedList = [];


//버튼 클릭시 닫고 열기 기능
function todoBTNclick() {
    //메뉴 버튼
    const todoCN = todoID.className;
    if (todoCN !== "none") {
        todoID.className = "none";
    } else {
        todoID.className = "to_do_list";
        PaintTodoList();
    }
}


//저장된 리스트 화면에 불러오기
function loadLists() {
    const loadedPending = localStorage.getItem(PENDING);
    if (loadedPending !== null) {
        const parsedPending = JSON.parse(loadedPending);
        parsedPending.forEach((element) => {
            createPendingList(element.text);
        });
    }

    const loadedFinish = localStorage.getItem(FINISHED);
    if (loadedFinish !== null) {
        const parsedFinish = JSON.parse(loadedFinish);
        parsedFinish.forEach((element) => {
            createFinishedList(element.text);
        });
    }
}

//입력
function PaintTodoList() {
    pendingForm.addEventListener("submit", pendingInput);
    finishedForm.addEventListener("submit", finishedInput);
}
function pendingInput(event) {
    event.preventDefault();
    const input = pendingForm.querySelector("input")
    const inputValue = input.value;
    input.value = "";
    createPendingList(inputValue);
}
function finishedInput(event) {
    event.preventDefault();
    const input = finishedForm.querySelector("input")
    const inputValue = input.value;
    input.value = "";
    createFinishedList(inputValue);
}
function createPendingList(inputValue) {
    const li = makeList(inputValue);
    pending.prepend(li);
    const todoObj = makeObj(li);
    pendingList.push(todoObj);
    savePendingList();

    const none_backbtn = li.querySelector(".backbtn");
    none_backbtn.classList.add(none_CN);
}
function createFinishedList(inputValue) {
    const li = makeList(inputValue);
    finished.prepend(li);
    const finishedObj = makeObj(li);
    finishedList.push(finishedObj);
    saveFinishedList();

    const none_checkbtn = li.querySelector(".checkbtn");
    none_checkbtn.classList.add(none_CN);
}

//makeList
function makeObj(li) {
    const text = li.querySelector("span").innerText;
    const id = li.id;
    const liObj = {
        text,
        id
    };

    return liObj;
}
function makeList(text) {
    const newID = Math.floor(Math.random() * 100000000000);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const buttons = document.createElement("div");
    const checkBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    const backBtn = document.createElement("button");
    buttons.setAttribute("class", "buttons");
    backBtn.setAttribute("class", "backbtn");
    checkBtn.setAttribute("class", "checkbtn");
    delBtn.setAttribute("class", "delbtn");
    backBtn.innerText = "♻";
    checkBtn.innerText = "✔";
    delBtn.innerText = "✖";
    span.innerText = text;
    li.appendChild(span);
    buttons.appendChild(checkBtn);
    buttons.appendChild(backBtn);
    buttons.appendChild(delBtn);
    li.appendChild(buttons);
    li.setAttribute("id", newID);

    backBtn.addEventListener("click", backBtnClicked);
    checkBtn.addEventListener("click", checkBtnClicked);
    delBtn.addEventListener("click", delBtnClicked);
    return li;
}

//리스트 버튼 클릭
function selectedLi(event) {
    const clickedBtn = event.target.parentNode;
    const list = clickedBtn.parentNode;
    return list;
}
function backBtnClicked(event) {
    const list = selectedLi(event);
    const backListObj = makeObj(list);
    createPendingList(backListObj.text);
    delFinishedList(list);
}
function checkBtnClicked(event) {
    const list = selectedLi(event);
    const checkedListObj = makeObj(list);
    createFinishedList(checkedListObj.text);
    delPendingList(list);
}
function delBtnClicked(event) {
    console.log("clicked delete button");
    const deletedList = selectedLi(event);
    deleted(deletedList);
}

//저장
function savePendingList() {
    localStorage.setItem(PENDING, JSON.stringify(pendingList));
}
function saveFinishedList() {
    localStorage.setItem(FINISHED, JSON.stringify(finishedList));
}

//delete
function delFinishedList(list) {
    finished.removeChild(list);
    const newFinishedList = finishedList.filter(function (fn_one) {
        return fn_one.id !== list.id;
    });
    finishedList = newFinishedList;
    saveFinishedList();
}
function delPendingList(list) {
    pending.removeChild(list);
    const newPendingList = pendingList.filter(function (pd_one) {
        return pd_one.id !== list.id;
    });
    pendingList = newPendingList;
    savePendingList();
}
function deleted(deletedList) {
    const parent = deletedList.parentNode;
    parent.removeChild(deletedList);
    const className = parent.className;
    if (className === "pending") {
        const newPendingList = pendingList.filter(function (li) {
            return li.id !== deletedList.id;
        });
        pendingList = newPendingList;
        savePendingList();
    } else if (className === "finished") {
        const newFinishedList = finishedList.filter(function (li) {
            return li.id !== deletedList.id;
        });
        finishedList = newFinishedList;
        saveFinishedList();
    }
}



function init() {
    loadLists();
    //BTNclick();
    todoMenu.addEventListener("click", todoBTNclick);


}
init();