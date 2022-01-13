const body = document.querySelector("body");
const loginChangeBG = document.querySelector(".login_screen__change_bg");
const imgNumber = 6;

function makeNumber() {
    return Math.floor(Math.random() * imgNumber);
}

function paintBG() {
    const imgNum = makeNumber();
    console.log(imgNum);
    const img = new Image();
    img.classList.add("bg_img");
    img.src = `js/img/${imgNum}.jpg`;
    body.prepend(img);
}
function removeBG(usedImg) {
    body.removeChild(usedImg);
    console.log("del");
}
function changeBG() {
    const usedImgList = body.querySelectorAll(".bg_img");
    if (usedImgList.length === 1) {
        const usedImg = body.querySelector(".bg_img");
        removeBG(usedImg);
        paintBG();
    } else if (usedImgList.length > 1) {
        for (let i = 0; i < usedImgList.length; i++) {
            const usedImg = body.querySelector(".bg_img");
            body.removeChild(usedImg);
        }
        paintBG();
    } else {
        paintBG();
    }
}

function init() {
    paintBG();
    loginChangeBG.addEventListener("click", changeBG);
    //setInterval(changeBG, 10000);
}

init();
