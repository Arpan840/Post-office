let ShowAddress = document.querySelector(".ipAddress");
let userIp = document.querySelector(".userIp");



fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    const ipAddress = data.ip;
    console.log("Your public IP address is:", ipAddress);
    ShowAddress.innerText = ipAddress;
    userIp.innerText = ipAddress;
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function showApiInfo() {
  const apiInfoElement = document.querySelector(".ApiInfo");
  const frontElement = document.querySelector(".fornt");

  apiInfoElement.style.display = "block";
  frontElement.style.display = "none";
}

const getStarted = document.querySelector(".getStarted");
getStarted.addEventListener("click", showApiInfo);
