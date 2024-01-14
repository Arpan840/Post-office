let ShowAddress = document.querySelector(".ipAddress");
let lat = document.querySelector(".lat");
let long = document.querySelector(".long");
let map = document.querySelector(".map");
let city = document.querySelector(".city");
let region = document.querySelector(".region");
let org = document.querySelector(".org");
let timezone = document.querySelector(".timezone");
let dateTime = document.querySelector(".dateTime");
let Pincode = document.querySelector(".Pincode");
let Message = document.querySelector(".message");
let postOffice = document.querySelector(".post-office");
let searchPostOffice = document.querySelector(".searchPostOffice");
let searchBar = document.querySelector(".searchBar");

let latitude;
let longitude;
let ipAddress;

fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    ipAddress = data.ip;
    console.log("Your public IP address is:", ipAddress);
    ShowAddress.innerText = ipAddress;
    findingLocation(ipAddress);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const getStarted = document.querySelector(".getStarted");

async function findingLocation(ipAddress) {
  let response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
  if (response.ok) {
    let data = await response.json();
    console.log("successful", response.status, "data", data);
    let details = {
      lat: data.latitude,
      long: data.longitude,
      city: data.city,
      region: data.region,
      org: data.org,
      timezone: data.timezone,
      pincode: data.postal,
    };
    lat.innerText = details.lat;
    long.innerHTML = details.long;
    city.innerHTML = details.city;
    org.innerHTML = details.org;
    region.innerHTML = details.region;
    timezone.innerHTML = details.timezone;
    Pincode.innerHTML = details.pincode;
    let timeZoneValue = details.timezone;
    const now = new Date();
    const options = {
      timeZoneValue,
      hour12: false,
      timeStyle: "long",
    };
    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);

    dateTime.innerHTML = formattedTime;
    findPostOfficeNearBy(details.pincode);
    locateInMap(details.lat, details.long);
  } else {
    console.log("Bad request", response.status);
  }
}

addEventListener("DOMContentLoaded", findingLocation);

function locateInMap(latitude, longitude) {
  map.innerHTML = ` <iframe
  class="my-5"
    src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed""
    width="1500"
    height="450"
    style="border: 0"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  ></iframe>`;
}
addEventListener("DOMContentLoaded", locateInMap);

async function findPostOfficeNearBy(pincode) {
  let response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  if (response.ok) {
    let data = await response.json();
    console.log("postOffice list", data);

    Message.innerHTML = data[0].Message;
    console.log("Successful", response.status);
    postOfficeList(data);
  } else {
    console.log("Data not found", response.status, response.statusText);
  }
}

function postOfficeList(data) {
  console.log(data[0].PostOffice, "list");
  let postOfficeList = "";
  data[0].PostOffice.map((i) => {
    postOfficeList += `
    <div class=" text-light w-45 bg-gray px-4 py-3 rounded gap-5" >
                    <p class="d-flex gap-3">Name: <span class="Name">${i.Name}</span></p>
                    <p class="d-flex gap-3">Branch Type: <span class="BranchType">${i.BranchType}</span></p>
                    <p class="d-flex gap-3">Delivery Status: <span class="DeliveryStatus">${i.DeliveryStatus}</span></p>
                    <p class="d-flex gap-3">District: <span class="District">${i.District}</span></p>
                    <p class="d-flex gap-3">Division: <span class="Division">${i.Division}</span></p>
                   
                </div>
    `;
  });
  postOffice.innerHTML = postOfficeList;
}

function filterPostOffice()
{
  console.log(searchBar.value)
}

searchBar.addEventListener('keyup',filterPostOffice)


 


