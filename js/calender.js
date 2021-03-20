const cal_date = document.querySelector(".cal_date"),
    cal_table = document.querySelector(".cal_table");

const calMenu = document.querySelector(".menu__cal"),
    cal_ID = document.querySelector("#calender");

const prev = document.querySelector(".prev"),
    next = document.querySelector(".next");

const Today = new Date();
let change = Today;
/////////////////////////////////////
///////// 한 달 달력 그리기///////////
function getfirstLastDay(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = getFirstDay(year, month);
    const LastDay = getLastDay(year, month);

    prepareCal(firstDay, LastDay);
    cal_date.innerText = `${year}. ${month + 1 < 10 ? `0${month + 1}` : `${month + 1}`}`;
}
function getFirstDay(year, month) {
    return new Date(year, month, 1);
}
function getLastDay(year, month) {
    return new Date(year, month + 1, 0);
}
function prepareCal(first, Last) {
    const firstDay = first.getDay();//요일
    const LastDate = Last.getDate();//날짜
    paintCalender(firstDay, LastDate);
}
function paintCalender(firstDay, LastDate) {
    for (let i = 0; i < firstDay; i++) {
        createTH("");
    }
    switch (firstDay) {
        case 0:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
        case 1:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
        case 2:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
        case 3:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
        case 4:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
        case 5:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
        case 6:
            for (let index = 1; index <= LastDate; index++) {
                createTH(index);
            }
            break;
    }
}
function createTH(date) {
    const calBody = document.querySelector(".cal_body");
    const th = document.createElement("th");
    th.innerText = date;
    calBody.appendChild(th);
}

//////////////////////////////
///////초기화면
function makeCalender() {
    delPaintedCal(Today);
}
//////////////////////////////
//////////////////////////////
function prevBTNclicked() {
    const year = change.getFullYear();
    const month = change.getMonth();
    const prevDate = new Date(year, month - 1, 1);
    change = prevDate;
    delPaintedCal(prevDate);
}
function nextBTNclicked() {
    const year = change.getFullYear();
    const month = change.getMonth();
    const nextDate = new Date(year, month + 1, 1);
    change = nextDate;
    delPaintedCal(nextDate);
}
function delPaintedCal(newDate) {
    const calBody = document.querySelector(".cal_body")
    calBody.remove();
    const tbody = document.createElement("tbody");
    tbody.className = "cal_body";
    cal_table.appendChild(tbody);
    console.log(`new`);
    getfirstLastDay(newDate);
}

//메뉴 버튼 클릭
function calBTNclicked() {
    const cal_CN = cal_ID.className;
    if (cal_CN !== "none") {
        cal_ID.className = "none";
        //달력 원래대로 되돌리기
        change = Today;
        makeCalender();
    } else {
        cal_ID.className = "calender"
    }
}
///
function init() {
    makeCalender();
    calMenu.addEventListener("click", calBTNclicked);

    prev.addEventListener("click", prevBTNclicked);
    next.addEventListener("click", nextBTNclicked);
}
init();