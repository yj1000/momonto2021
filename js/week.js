const sun_form = document.querySelector(".sun_form"),
    mon_form = document.querySelector(".mon_form"),
    tue_form = document.querySelector(".tue_form"),
    wed_form = document.querySelector(".wed_form"),
    thu_form = document.querySelector(".thu_form"),
    fri_form = document.querySelector(".fri_form"),
    sat_form = document.querySelector(".sat_form");
const weekMenu = document.querySelector(".menu__week"),
    weekID = document.querySelector("#week");
const mon = "Monday",
    tue = "Tuesday",
    wed = "Wednesday",
    thu = "Thursday",
    fri = "Friday",
    sat = "Saturday",
    sun = "Sunday";
let monList = [],
    tueList = [],
    wedList = [],
    thuList = [],
    friList = [],
    satList = [],
    sunList = [];


//\/\/\/\/\/\/\/\menu버튼/\/\/\/\/\/\/\
function weekBTNclicked() {
    const weekCN = weekID.className;
    if (weekCN !== "none") {
        weekID.className = "none";
    } else {
        weekID.className = "week";
    }
}
///\/\/\/\//\/\/\/\/\/\/\/\/\/\/\/\/\/\

function init() {


    weekMenu.addEventListener("click", weekBTNclicked);
}
init();