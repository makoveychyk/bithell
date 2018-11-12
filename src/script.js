let data;
const bitCard = ".bitcoin";
const etherCard = ".ethereum";
const liteCard = ".litecoin";

function getData(url, done) {
  let xhr = new XMLHttpRequest();

  xhr.open("GET", url);
  xhr.send();

  xhr.onload = function() {
    if (xhr.status === 200) {
      let json = JSON.parse(xhr.response);
      console.log(json);
      done(json);
    } else {
      console.log(xhr.statusText);
    }
  };
};

function addData(json, card = bitCard) {
  let cardSelector = document.querySelector(card);
  let cardPrice = document.querySelector(card + " .priseCripta");
  let cardToggler = document.querySelector(card + " .input");
  let cardChenges = document.querySelector(card + " .price-chenges");

  for (let i = 0; i < 4; i++) {
    if (json.changes.price[Object.keys(json.changes.price)[i]] < 0) {
      cardChenges.children[i].innerHTML =
        json.changes.price[Object.keys(json.changes.price)[i]] + "$";
      cardChenges.children[i].style.color = "red";
    } else {
      cardChenges.children[i].innerHTML =
        json.changes.price[Object.keys(json.changes.price)[i]] + "$";
    }
  }

  cardToggler.onchange = e => {
    if (cardToggler.hasAttribute("checked")) {
      cardToggler.removeAttribute("checked");
      for (let i = 0; i < 4; i++) {
        if (json.changes.price[Object.keys(json.changes.price)[i]] < 0) {
          cardChenges.children[i].innerHTML =
            json.changes.price[Object.keys(json.changes.price)[i]] + "$";
          cardChenges.children[i].style.color = "red";
        } else {
          cardChenges.children[i].innerHTML =
            json.changes.price[Object.keys(json.changes.price)[i]] + "$";
        }
      }
    } else {
      cardToggler.setAttribute("checked", "");
      for (let i = 0; i < 4; i++) {
        if (json.changes.percent[Object.keys(json.changes.percent)[i]] < 0) {
          cardChenges.children[i].innerHTML =
            json.changes.percent[Object.keys(json.changes.percent)[i]] + "%";
          cardChenges.children[i].style.color = "red";
        } else {
          cardChenges.children[i].innerHTML =
            json.changes.percent[Object.keys(json.changes.percent)[i]] + "%";
        }
      }
    }
  };
  cardPrice.innerHTML = json.high;
  
};

getData(
  "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",
  function(json) {
    addData(json);
    data = json;
  }
);

getData(
  "https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHUSD",
  function(json) {
    addData(json, card = etherCard);
    data = json;
  }
);
getData(
  "https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCUSD",
  function(json) {
    addData(json, card = liteCard);
    data = json;
  }
);



