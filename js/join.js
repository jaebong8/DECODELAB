const form = document.querySelector("#sign_up");
const btnSubmit = form.querySelector("input[type=submit]");

btnSubmit.addEventListener("click", (e) => {
  if (!isTxt("id", 5)) {
    e.preventDefault();
  }
  if (!isPwd("pwd1", "pwd2", 6)) {
    e.preventDefault();
  }
  if (!isTxt("name", 2)) {
    e.preventDefault();
  }

  if (!isBirth("year", 4)) {
    e.preventDefault();
  }
  if (!isBirth("day", 2)) {
    e.preventDefault();
  }
  if (!isSelect("birth")) {
    e.preventDefault();
  }
  if (!isSelect("gender")) {
    e.preventDefault();
  }
  if (!isEmail("email", 8)) {
    e.preventDefault();
  }
});

function isTxt(name, len) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value.trim();

  if (txt.length > len) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(`${len}글자 이상 입력해주세요`);
    input.closest("td").append(errMsg);

    return false;
  }
}

function isEmail(name, len) {
  const input = form.querySelector(`[name=${name}]`);
  const txt = input.value;

  if (txt.length > len && /@/.test(txt)) {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("td").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(`@를 포함한 전체 이메일 주소를 ${len}글자 이상 입력해주세요`);
    input.closest("td").append(errMsg);
    return false;
  }
}

function isCheck(name) {
  const inputs = form.querySelectorAll(`[name=${name}]`);
  let isChecked = false;

  for (let input of inputs) {
    if (input.checked) isChecked = true;
  }

  if (isChecked) {
    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = inputs[0].closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) inputs[0].closest("td").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append("필수입력항목을 하나 이상 체크해주세요");
    inputs[0].closest("td").append(errMsg);
    return false;
  }
}

function isBirth(name, len) {
  const input = document.querySelector(`[name=${name}]`);
  const txt = input.value;

  if (txt.length == len) {
    const errMsgs = input.closest("div").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("div").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = input.closest("div").querySelectorAll("p");
    if (errMsgs.length > 0) input.closest("div").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(`${len}글자로 입력해주세요`);
    input.closest("div").append(errMsg);
    return false;
  }
}

function isSelect(name) {
  const sel = form.querySelector(`[name=${name}]`);
  const sel_index = sel.selectedIndex;
  const val = sel[sel_index].value;

  if (val !== "") {
    const errMsgs = sel.closest("div").querySelectorAll("p");
    if (errMsgs.length > 0) sel.closest("div").querySelector("p").remove();
    return true;
  } else {
    const errMsgs = sel.closest("div").querySelectorAll("p");
    if (errMsgs.length > 0) sel.closest("div").querySelector("p").remove();

    const errMsg = document.createElement("p");
    errMsg.append("항목을 선택해주세요");
    sel.closest("div").append(errMsg);
    return false;
  }
}

function isPwd(name1, name2, len) {
  const pwd1 = form.querySelector(`[name=${name1}]`);
  const pwd2 = form.querySelector(`[name=${name2}]`);

  const pwd1_val = pwd1.value;
  const pwd2_val = pwd2.value;

  const num = /[0-9]/;
  const eng = /[a-zA-Z]/;
  const spc = /[!@#$%^&*()_+\[\]<>]/;
  if (
    pwd1_val === pwd2_val &&
    num.test(pwd1_val) &&
    eng.test(pwd1_val) &&
    spc.test(pwd1_val) &&
    pwd1_val.length > len
  ) {
    const errMsgs = pwd1.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();
    const errMsgs2 = pwd2.closest("td").querySelectorAll("p");
    if (errMsgs2.length > 0) pwd2.closest("td").querySelector("p").remove();

    return true;
  } else if (pwd1_val !== pwd2_val) {
    const errMsgs2 = pwd2.closest("td").querySelectorAll("p");
    if (errMsgs2.length > 0) pwd2.closest("td").querySelector("p").remove();
    const errMsg2 = document.createElement("p");
    errMsg2.append(`비밀번호가 일치하지 않습니다.`);
    pwd2.closest("td").append(errMsg2);
    return false;
  } else {
    if (pwd1_val === pwd2_val) {
      const errMsgs2 = pwd2.closest("td").querySelectorAll("p");
      if (errMsgs2.length > 0) pwd2.closest("td").querySelector("p").remove();
    }
    const errMsgs = pwd1.closest("td").querySelectorAll("p");
    if (errMsgs.length > 0) pwd1.closest("td").querySelector("p").remove();
    const errMsg = document.createElement("p");
    errMsg.append(
      `비밀번호는 특수문자,영문,숫자를 모두 포함하여 ${len}글자 이상 입력해주세요`
    );
    pwd1.closest("td").append(errMsg);

    return false;
  }
}
