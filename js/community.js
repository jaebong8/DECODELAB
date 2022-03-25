const frame = document.querySelector(".community");
const moreBtns = frame.querySelectorAll(".fa-plus");

moreBtns.forEach((moreBtn) => {
  moreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const detail = e.currentTarget.closest("div").nextElementSibling;
    const short = e.currentTarget.closest(".short");
    short.classList.toggle("on");
    detail.classList.toggle("on");
    if (detail.classList.contains("on")) {
      moreBtn.className = "fas fa-minus";
    } else {
      moreBtn.className = "fas fa-plus";
    }
  });
});
