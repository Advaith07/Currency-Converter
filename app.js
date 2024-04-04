const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromcurrency=document.querySelector(".from select");
const tocurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for (let select of dropdowns) 
{
  for (currencycode in countryList) 
  {
    let newoption = document.createElement("option");
    newoption.innerText = currencycode;
    newoption.value = currencycode;
    if(select.name ==="from" && currencycode==="USD")
    {
        newoption.selected="selected";
    }
    else if(select.name==="to" && currencycode==="INR")
    {
        newoption.selected="selected";
    } 
    select.append(newoption);
  }

  select.addEventListener("change",(evt)=>{
     updateflag(evt.target);
  })

}


const updateflag =(element)=>{
    let currencycode=element.value;
    let countrycode=countryList[currencycode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};




button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountvalue=amount.value;
    if(amountvalue==="" || amountvalue<1)
    {
        amountvalue=1;
        amount.value="1";
    }

    const URL=`${BASE_URL}/${fromcurrency.value.toLowerCase()}/${tocurrency.value.toLowerCase()}.json`;
    console.log(URL);
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[tocurrency.value.toLowerCase()];
    
    let finalamount=amountvalue*rate;
    msg.innerText=`${amountvalue} ${fromcurrency.value} = ${finalamount} ${tocurrency.value}`;
});

