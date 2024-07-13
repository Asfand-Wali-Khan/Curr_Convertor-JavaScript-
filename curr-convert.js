let base_url = "https://latest.currency-api.pages.dev/v1/currencies";
let dropdowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let message = document.querySelector(".message");
for (let select of dropdowns) {
  for (let currCodes in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCodes;
    newOption.value = currCodes;
    if (select.name === "from" && currCodes === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCodes === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
const updateflag = (element) => {
  let currCodes = element.value;
  let countryCode = countryList[currCodes];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
button.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtValue = amount.value;
  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = "1";
  }
  let URL = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtValue * rate;
  message.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
