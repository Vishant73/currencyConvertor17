const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector('form button');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD") {
            newOption.selected = "selected";
        } else if (select.name == "to" && currCode == "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}
const updateExchangeRate = async () =>{
     let amount = document.querySelector('.amount input');
    let amtVal = amount.value;
    if (amtVal == "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();

    // new API: fetch the full fromCode JSON file
    const URL = `${BASE_URL}${fromCode}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    // access nested object -> data[fromCode][toCode]
    let rate = data[fromCode][toCode];
    if (!rate) {
        msg.innerText = `Rate not available for ${fromCode.toUpperCase()} → ${toCode.toUpperCase()}`;
        return;
    }

    let finalAmount = amtVal * rate;

    msg.innerText = `${amtVal} ${fromCode.toUpperCase()} = ${finalAmount} ${toCode.toUpperCase()}`;
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]; // IN, EU
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
};

btn.addEventListener("click",  (event) => {
    event.preventDefault();
    updateExchangeRate();

});


window.addEventListener("load", ()=>{
  updateExchangeRate();
})
