const key = "17f2ef76ce03c5752741a248b065c8ca";
const traffic_off = document.querySelectorAll(".traffic li")[1];
const traffic_on = document.querySelectorAll(".traffic li")[2];

const branch_btns = document.querySelectorAll(".branch li");
var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.497952, 127.027619), //지도의 중심좌표.
  level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

const markerOptions = [
  {
    title: "본사",
    latlng: new kakao.maps.LatLng(37.497952, 127.027619),
    imgSrc: "img/marker1.png",
    imgSize: new kakao.maps.Size(232, 99),
    imgPos: { offset: new kakao.maps.Point(116, 99) },
    button: branch_btns[0],
  },
  {
    title: "마곡 사옥",
    latlng: new kakao.maps.LatLng(37.5619185, 126.826919),
    imgSrc: "img/marker2.png",
    imgSize: new kakao.maps.Size(232, 99),
    imgPos: { offset: new kakao.maps.Point(116, 99) },
    button: branch_btns[1],
  },
  {
    title: "판교 사옥",
    latlng: new kakao.maps.LatLng(37.394776, 127.11116),
    imgSrc: "img/marker3.png",
    imgSize: new kakao.maps.Size(232, 99),
    imgPos: { offset: new kakao.maps.Point(116, 99) },
    button: branch_btns[2],
  },
  {
    title: "제주 사옥",
    latlng: new kakao.maps.LatLng(33.4890113, 126.4983023),
    imgSrc: "img/marker4.png",
    imgSize: new kakao.maps.Size(232, 99),
    imgPos: { offset: new kakao.maps.Point(116, 99) },
    button: branch_btns[3],
  },
];

for (let i = 0; i < markerOptions.length; i++) {
  new kakao.maps.Marker({
    map: map,
    position: markerOptions[i].latlng,
    title: markerOptions[i].title,
    image: new kakao.maps.MarkerImage(
      markerOptions[i].imgSrc,
      markerOptions[i].imgSize,
      markerOptions[i].imgPos
    ),
  });

  markerOptions[i].button.addEventListener("click", (e) => {
    e.preventDefault();

    for (let btn of branch_btns) {
      btn.classList.remove("on");
    }
    branch_btns[i].classList.add("on");
    moveTo(markerOptions[i].latlng);
  });
}
//반응형
window.addEventListener("resize", () => {
  let active_btn = document.querySelector(".branch li.on");
  let active_index = active_btn.getAttribute("data-index");
  map.setCenter(markerOptions[active_index].latlng);
});

//교텅정보 버튼
traffic_off.addEventListener("click", (e) => {
  e.preventDefault();

  if (traffic_off.classList.contains("on")) return;
  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

  traffic_off.classList.add("on");
  traffic_on.classList.remove("on");
});

traffic_on.addEventListener("click", (e) => {
  e.preventDefault();

  if (traffic_on.classList.contains("on")) return;
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);

  traffic_on.classList.add("on");
  traffic_off.classList.remove("on");
});

function moveTo(target) {
  var moveLatLon = target;

  map.setCenter(moveLatLon);
}
