const body = document.querySelector("body");

const key = "AIzaSyAzYVJDYEW0ZMkEgOcf0HsPuzMOc9k-g-4";

const main = document.querySelector(".main");

const playListId = "PLCCz4evGBSLWajFB9WT7n3RrP7yYrDzRI";
let num = 4;
crateItem(num);

main.addEventListener("click", (e) => {
  createPop(e);

  if (e.target.className == "more") {
    removeAllchild(main);
    num += 4;
    crateItem(num);
  }
});

body.addEventListener("click", (e) => {
  removePop(e);
});

function crateItem(num) {
  let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      let items = json.items;
      let result = "";

      items.forEach((item) => {
        let tit = item.snippet.title;
        let desc = item.snippet.description;
        let date = item.snippet.publishedAt.split("T")[0];

        if (tit.length > 50) {
          tit = tit.substr(0, 50) + "...";
        }
        if (desc.length > 150) {
          desc = desc.substr(0, 150) + "...";
        } else if (desc.length == 0) {
          desc = "No Description";
        }

        result += `
          <article>
              <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
                  <img src="${item.snippet.thumbnails.high.url}">
              </a>
              <div class="con">
                  <h2 data-vid="${item.snippet.resourceId.videoId}">
                      ${tit}
                  </h2>
                  <p>${desc}<p>
                  <span>${date}</span>
              </div>
          </article>
          
          `;
      });
      main.innerHTML = result;

      const more = document.createElement("span");
      more.classList.add("more");
      more.innerText = "VIEW MORE";
      main.append(more);
      if (num > items.length) {
        more.remove();
      }
    });
}

function createPop(e) {
  e.preventDefault();
  /* 이벤트 위임 때문에 생기는 에러.
    article 밖을 선택하면 main이 클릭된다. main 위에 a 태그가 없으므로
    getAttribute 에러가 발생.
    a 태그가 없으면 리턴하는 구문 추가
    */
  if (!e.target.closest("a")) return;
  const vidId = e.target.closest("a").getAttribute("data-vid");
  let pop = document.createElement("aside");
  pop.classList.add("youtube_aside");
  pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen>
      </iframe>
      <span class="btnClose">CLOSE</span>
      `;

  body.append(pop);
}

function removePop(e) {
  const pop = document.querySelector("aside");
  if (pop === null) return;

  const close = pop.querySelector("span");
  if (e.target == close) {
    e.target.closest("aside").remove();
  }
}

function removeAllchild(elementName) {
  while (elementName.hasChildNodes()) {
    elementName.removeChild(elementName.firstChild);
  }
}
