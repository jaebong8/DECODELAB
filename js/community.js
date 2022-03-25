const frame = document.querySelector(".community");
const moreBtn = frame.querySelector(".fa-plus");

moreBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const detail = e.currentTarget.closest("div").nextElementSibling;

  detail.classList.toggle("on");
  if (detail.classList.contains("on")) {
    moreBtn.className = "fas fa-minus";
  } else {
    moreBtn.className = "fas fa-plus";
  }
});
