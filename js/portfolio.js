//   https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
// const buddy =
//   "http://farm{icon-farm}.staticflickr.com/{icon-server}/buddyicons/{nsid}.jpg";
// const buddy2 = "https://www.flickr.com/images/buddyicon.gif";

// const rest =
//   "https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value";
const body = document.querySelector("body");
const portfolioFrame = document.querySelector(".portfolio");
const gallery = document.querySelector("#gallery");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");
const loading = document.querySelector(".loading");
const base = "https://www.flickr.com/services/rest/?";
const method_interest = "flickr.interestingness.getList";
const method_search = "flickr.photos.search";
const key = "28e7d1179792950a30beae3c69e7d9dd";
const secret = "d8ebfc267e56a4ec";
const per_page = 50;
const url = `${base}method=${method_interest}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
const colorChange = document.querySelector(".colorChange");
const ball = colorChange.querySelector(".ball");

callData(url);
ball.addEventListener("click", (e) => {
  portfolioFrame.classList.toggle("white");
  ball.classList.toggle("on");
  colorChange.classList.toggle("on");
  if (portfolioFrame.classList.contains("white")) {
    loading.setAttribute("src", "img/loading2.gif");
  } else {
    loading.setAttribute("src", "img/loading.gif");
  }
});

btnSearch.addEventListener("click", () => {
  getTags();
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getTags();
  }
});

gallery.addEventListener("click", (e) => {
  e.preventDefault();
  createAside(e);
});

body.addEventListener("click", (e) => {
  removeAside(e);
});

function callData(url) {
  gallery.classList.remove("on");
  loading.classList.remove("off");
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      const items = json.photos.photo;

      createList(items);
      imgLoaded();
    });
}

function createList(items) {
  let htmls = "";

  items.forEach((data) => {
    htmls += `
        <article class="item">
            <div>
                <a data-owner="${data.owner}" data-profile_src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg" class="pic" href ="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">
                    <img class="thumbnail" src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">
                </a>
                <p>${data.title}</p>             
            </div>
        </article>
      `;
  });
  gallery.innerHTML = htmls;
}

function imgLoaded() {
  const thumbs = document.querySelectorAll(".pic img");
  const len = thumbs.length;
  let count = 0;

  thumbs.forEach((thumb) => {
    thumb.onerror = () => {
      thumb.setAttribute("src", "img/flickr1.jpg");
    };
    thumb.onload = () => {
      count++;
      if (count == len) {
        new Isotope(gallery, {
          itemSelector: ".item",
          columnWidth: ".item",
          transitionDuration: "0.8s",
        });

        gallery.classList.add("on");
        loading.classList.add("off");
      }
    };
  });

  const buddies = document.querySelectorAll(".profile img");

  buddies.forEach((buddy) => {
    buddy.onerror = () => {
      buddy.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    };
  });
}

function getTags() {
  let tag = input.value;
  tag = tag.trim();
  tag = tag.split(" ");
  tag = tag.join(",");
  if (tag == "") {
    alert("검색어를 입력해주세요");
    return;
  }
  const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;
  callData(url);
}

function createAside(e) {
  if (e.target.className == "thumbnail") {
    let imgSrc = e.target.closest("a").getAttribute("href");
    let title = e.target.closest("div").querySelector("p").innerText;
    let owner = e.target.closest("a").dataset.owner;
    let profileSrc = e.target.closest("a").dataset.profile_src;

    let el = "";
    const aside = document.createElement("aside");
    aside.classList.add("gallery_aside");
    el += `
        <div class="popImg">
            <img src="${imgSrc}"></img>
            
            <div class="profile">
                <img src="${profileSrc}">
                <span>${owner}</span>
            </div>
            <p>${title}</p>
        </div>
        <div class="btnClose">
        
        </div>
        
        
        `;
    aside.innerHTML = el;
    body.append(aside);
    body.style.overflow = "hidden";
  }
}
function removeAside(e) {
  if (e.target.className === "btnClose") {
    let btnClose = document.querySelector(".btnClose");
    btnClose.classList.add("on");
    let aside = document.querySelector(".gallery_aside");
    setTimeout(() => {
      aside.classList.add("off");
    }, 1000);
    setTimeout(() => {
      aside.remove();
      body.style.overflow = "auto";
    }, 2000);
  }
}
