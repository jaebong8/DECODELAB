const body = document.querySelector("body");
const brand = document.querySelector("#brand");
const brandDiv = brand.querySelector(".img1");
const brandAudio = brandDiv.querySelector("audio");
const works = document.querySelector("#works");
const lists = works.querySelectorAll("ul li");
const wraps = works.querySelectorAll(".wrap2");
// scroll
const scrollSections = document.querySelectorAll(".scroll_section");
const scroll_nav = document.querySelector(".scroll_nav");
const scroll_lis = scroll_nav.querySelectorAll("li");
let heightArr = [];
let base = -100;
let enableClick = true;

//visual auto typing
const visualH2 = document.querySelector("#visual .inner h2");
const H2Txt = "Are you ready";
const strTxt = "To get Hypno'ed?";
let typingBool = false;
let typingIdx = 0;
let typingIdx2 = 0;
//visual auto typing
const TypingTxt = H2Txt.split("");
const TypingStr = strTxt.split("");

// 스와이퍼
const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  speed: 1000,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

//svg 제어
const pie1 = document.querySelector(".pie1");
const pie2 = document.querySelector(".pie2");
const pie3 = document.querySelector(".pie3");
const circleBoxs = document.querySelectorAll(".circle_box");

// % 채우기

const circleSpan1 = document.querySelector(".circle__span1");
const circleSpan2 = document.querySelector(".circle__span2");
const circleSpan3 = document.querySelector(".circle__span3");

//쿠키 팝업
const popup = document.querySelector("#popup");
const weekBtn = popup.querySelector(".weekLater");
const agreeBtn = popup.querySelector(".agree");
const closeBtn = popup.querySelector(".pop-close");
const isCookie = document.cookie.indexOf("pop=done");

if (isCookie == -1) {
  popup.style.display = "flex";
} else {
  popup.style.display = "none";
}

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closePopup();
});

agreeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setCookie("pop", "done", 365);
  closePopup();
});
weekBtn.addEventListener("click", (e) => {
  e.preventDefault();
  setCookie("pop", "done", 7);
  closePopup();
});

window.addEventListener("scroll", () => {
  if (brand.classList.contains("on")) {
    // % 채우기
    counter(circleSpan1, 93, 1500);
    counter(circleSpan2, 87, 1500);
    counter(circleSpan3, 83, 1500);
    circleBoxs.forEach((box) => {
      if (box.classList.contains("active")) return;
      box.classList.add("active");
    });
  } else {
    circleSpan1.innerText = 0;
    circleSpan2.innerText = 0;
    circleSpan3.innerText = 0;
    circleBoxs.forEach((box) => {
      box.classList.remove("active");
    });
  }
});

// window.addEventListener("scroll", () => {
//   let bodyHeight = body.scrollHeight;
//   let scroll = window.scrollY || window.pageYOffset;
//   let percent = parseInt((scroll / (bodyHeight - window.innerHeight)) * 100);

//   // 전체 화면 20%~ 34% 구간에서 이벤트 발생
//   if (percent >= 20 && percent <= 34) {
//     let cScroll1 = percent - 20;
//     let cScroll2 = percent - 20;
//     let cScroll3 = percent - 20;
//     cScroll1 = cScroll1 * 31;
//     cScroll2 = cScroll2 * 29;
//     cScroll3 = cScroll3 * 27;

//     pie1.style.strokeDashoffset = 471 + cScroll1;
//     pie2.style.strokeDashoffset = 471 + cScroll2;
//     pie3.style.strokeDashoffset = 471 + cScroll3;
//   }
// });

//btnCall을 클릭했을 때
btnCall.onclick = function (e) {
  //링크이동금지
  e.preventDefault();

  //btnCall에 on이 있으면 제거, 없으면 추가
  btnCall.classList.toggle("on");
  //menuMo에 on이 있으면 제거, 없으면 추가
  menuMo.classList.toggle("on");
};

// 오토타이핑
if (typingBool == false) {
  typingBool = true;
  Typing();
}

//음악 재생

brandDiv.addEventListener("click", () => {
  brandAudio.muted = false;
  brandAudio.play();
});
brandDiv.addEventListener("mouseleave", () => {
  brandAudio.load();
  brandAudio.pause();
});

lists.forEach((el, index) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const isOn = el.classList.contains("on");
    if (isOn) return;
    for (list of lists) {
      list.classList.remove("on");
    }
    el.classList.add("on");

    wraps.forEach((wrap) => {
      wrap.classList.remove("on");
    });
    wraps[index].classList.add("on");
  });
});

// 스크롤 액션 --------------------------------------
setHeight();
window.addEventListener("resize", () => {
  setHeight();
  let bodyHeight = body.scrollHeight;
  let scroll = window.scrollY || window.pageYOffset;
  let percent = parseInt((scroll / (bodyHeight - window.innerHeight)) * 100);
});
scroll_lis.forEach((li, index) => {
  li.addEventListener("click", (e) => {
    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;
    if (enableClick) {
      enableClick = false;
      moveScroll(index);
    }
  });
});

window.addEventListener("scroll", activation);

//쿠키 생성
function setCookie(name, val, due) {
  const today = new Date();
  const day = today.getDate();
  today.setDate(day + due);
  const duedate = today.toGMTString();
  document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}

function setHeight() {
  heightArr = [];
  scrollSections.forEach((section, index) => {
    heightArr.push(section.offsetTop);
  });
  const active = scroll_nav.querySelector("li.on");
  const activeIndex = Array.from(scroll_lis).indexOf(active);
  window.scroll(0, heightArr[activeIndex]);
}

function moveScroll(index) {
  new Anime("window", {
    prop: "scroll",
    value: heightArr[index],
    duration: 1000,
    callback: () => {
      enableClick = true;
    },
  });
}
function activation() {
  let scroll = window.scrollY || window.pageYOffset;

  scrollSections.forEach((section, index) => {
    if (scroll >= heightArr[index] + base) {
      scroll_lis.forEach((el) => {
        el.classList.remove("on");
      });

      scroll_lis[index].classList.add("on");
      for (let section of scrollSections) {
        section.classList.remove("on");
      }

      scrollSections[index].classList.add("on");
    }
  });
}

// 오토 타이핑
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

function closePopup() {
  new Anime(popup, {
    prop: "bottom",
    value: "-20",
    duration: 1000,
    callback: () => {
      popup.remove();
    },
  });
}

function counter(el, target, time) {
  let current_num = parseInt(el.innerText);
  let count_num = target - current_num;
  let interval = time / count_num;

  let timer = setInterval(() => {
    if (current_num >= target) {
      current_num = target;
      clearInterval(timer);
      return;
    }
    current_num++;
    el.innerText = current_num + "%";
  }, interval);
}
