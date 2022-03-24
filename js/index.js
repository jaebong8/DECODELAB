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
let base = -50;
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
window.addEventListener("resize", setHeight);
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
