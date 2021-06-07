function sendData() {
  var http = new XMLHttpRequest();
  http.open("GET", "http://localhost:9001/api/sendData", false);
  http.send(null);
}

setInterval(() => {
  sendData();
}, 5000);
