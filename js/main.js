const btnCall = document.querySelector(".btnCall");
const menuMo = document.querySelector(".menuMo");
const brand = document.querySelector("#brand");
const brandDiv = brand.querySelector(".img1");
const brandAudio = brandDiv.querySelector("audio");

//visual auto typing
const visualH2 = document.querySelector("#visual .inner h2");
const H2Txt = "Are you ready";
const strTxt = "To get Hypno'ed?";
let typingBool = false;
let typingIdx = 0;
let typingIdx2 = 0;

//btnCall을 클릭했을 때
btnCall.onclick = function (e) {
  //링크이동금지
  e.preventDefault();

  //btnCall에 on이 있으면 제거, 없으면 추가
  btnCall.classList.toggle("on");
  //menuMo에 on이 있으면 제거, 없으면 추가
  menuMo.classList.toggle("on");
};

//visual auto typing
const TypingTxt = H2Txt.split("");
const TypingStr = strTxt.split("");

if (typingBool == false) {
  typingBool = true;
  Typing();
}
function Typing() {
  setTimeout(() => {
    let TypingInt = setInterval(() => {
      if (typingIdx < TypingTxt.length) {
        visualH2.append(TypingTxt[typingIdx]);
        typingIdx++;
      } else {
        let brTag = document.createElement("br");
        visualH2.appendChild(brTag);
        clearInterval(TypingInt);
        let strongTag = document.createElement("strong");
        visualH2.appendChild(strongTag);
        let TypingInt2 = setInterval(() => {
          if (typingIdx2 < TypingStr.length) {
            strongTag.append(TypingStr[typingIdx2]);
            typingIdx2++;
          } else {
            clearInterval(TypingInt2);
          }
        }, 100);
      }
    }, 100);
  });
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

brandDiv.addEventListener("click", () => {
  brandAudio.muted = false;
  brandAudio.play();
});
brandDiv.addEventListener("mouseleave", () => {
  brandAudio.load();
  brandAudio.pause();
});
