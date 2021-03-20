const clock = document.querySelector(".clock"),
    form = document.querySelector("form"),
    loginScreen = document.querySelector(".login_screen"),
    mainScreen = document.querySelector(".main_screen"),
    signOut = document.querySelector(".sign_out");

const userName = "USER_NAME";


//로그아웃 > 로그인 페이지로 돌아가기
function removeUser() {
    setInterval(paintLoginClock, 1000);
    localStorage.removeItem(userName);
    localStorage.removeItem("Finished");
    localStorage.removeItem("Pending");
    localStorage.removeItem("Location");
    paintLoginScreen()
    init();
}
function paintLoginScreen() {
    loginScreen.classList.remove("none");
    mainScreen.classList.add("none");
    signOut.classList.add("none");
    clock.classList.add("none");
}

//시계
function makeClock() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    //  const second = date.getSeconds();
    //  console.log(second);
    clock.innerText = `${hour < 10 ? `0${hour}` : `${hour}`
        }:${minute < 10 ? `0${minute}` : `${minute}`} `;
}
function paintClock() {
    setInterval(makeClock, 1000);
    clock.classList.remove("none");
}



//이름 저장
function getName(event) {
    event.preventDefault();
    const input = form.querySelector(".input_name")
    const name = input.value;
    saveName(name);
    changeScreen();
    paintMainScreen(name);
    input.value = "";
}
function saveName(name) {
    localStorage.setItem(userName, name);
}


//메인화면으로 전환
function changeScreen() {
    loginScreen.classList.add("none");
    mainScreen.classList.remove("none");
    signOut.classList.remove("none");
    paintClock();
}
function paintMainScreen(name) {
    paintNAME(name);
}
function paintNAME(name) {
    const h1 = mainScreen.querySelector("h1");
    h1.innerText = `Hello, ${name}🙂`;
}

//로그인 시계
function paintLoginClock() {
    const h1 = loginScreen.querySelector("h1");
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    h1.innerText = `${year} ${month < 10 ? `0${month}` : `${month}`} ${day < 10 ? `0${day}` : `${day}`}\n${hour < 10 ? `0${hour}` : `${hour}`
        }:${minute < 10 ? `0${minute}` : `${minute}`} `;

}


function init() {
    const user = localStorage.getItem(userName);
    if (user) {
        changeScreen();
        paintMainScreen(user);
    } else {
        setInterval(paintLoginClock, 1000);
        form.addEventListener("submit", getName);
    }

    signOut.addEventListener("click", removeUser);
}
init()