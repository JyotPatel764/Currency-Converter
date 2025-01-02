const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const buttonElement = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");

const toCurr = document.querySelector(".to select");

const msgBox = document.querySelector(".final-message");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }

        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
     }
     select.addEventListener("change" , (evt) => {
            updateFlag(evt.target);  
        });
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryId = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryId}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;
};

buttonElement.addEventListener("click" , async (evt) => {
   evt.preventDefault();
   let inputAmount = document.querySelector(".amount input");
   let amountValue = inputAmount.value;
   if (amountValue < 0 || amountValue === "") {
    console.log("enter valid");
   }
   else {
    console.log(amountValue);
   }
   
   const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

   let response = await fetch(URL);
   let finalOutput = await response.json();
   let rate = finalOutput[toCurr.value.toLowerCase()];

   let displayResult = amountValue * rate; 

   msg.innerText = `${amountValue} ${fromCurr} = ${displayResult} ${toCurr}`;
});




