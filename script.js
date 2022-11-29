//bring in form and qrcode div
const form = document.getElementById("form");
const qr = document.getElementById("qrcode");

const generateSubmit = (e) => {
  //preventDefault() so the form doesn't submit
  e.preventDefault();
  clearUI();
  //get the URL input, .value since it's an input
  const url = document.getElementById("url").value;
  //if url box is empty, alert the user
  if (url === "") {
    alert("Please Enter a URL");
  } else {
    generateQrCode(url);
    //setTimeout for the savebtn since generateQrCode is not going to be available right away.
    setTimeout(() => {
      //create a variable to get the source(link) off the created QRcode
      const save = qr.querySelector("img").src;
      saveBtn(save);
    }, 50);
  }
};

//code taken from qrcode.js
const generateQrCode = (url) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: 300,
    height: 300,
  });
};
//clearUI removes the created qrcode/btn off the DOM
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) saveBtn.remove();
};

//creating the saveBtn element though JS, once the QR Code is generated
//e will be the link you'll get from const save (see line 19)
const saveBtn = (e) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = "saveCode";
  link.href = e;
  link.download = "qrcode";
  link.innerHTML = "Save";
  //add link to the qr code div after it's generated
  document.getElementById("generated").appendChild(link);
};

//function runs when btn is clicked
form.addEventListener("submit", generateSubmit);
