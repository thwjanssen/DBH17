var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function newOffer() {
  var seller = document.getElementById("seller").value;
  var Bill = parseInt(document.getElementById("Bill").value);
  var time = parseInt(document.getElementById("time").value);
    
  setStatus("Bezig met transactie... (even wachten aub)");
  Tender.deployed().then(function(contract) {contract.newOffer(seller, Bill, time, {from: seller})}).then(function(offerId) {
    setStatus("Aanbieding Geplaatst");
    }).catch(function(e) {
    console.log(e);
    setStatus("Error; zie log.");
  });
};

function ShowOfferItemID() {
  var offerNumber = parseInt(document.getElementById("offerNumber").value);

  Tender.deployed().then(function(contract) {return contract.getOfferItemID.call(offerNumber)}).then(function(value) {
    var offer_element = document.getElementById("offerItemID");
    offer_element.innerHTML = value.valueOf();
    console.log(value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting description; see log.");
  });
};

function ShowOfferDelTime() {
  var offerNumber = parseInt(document.getElementById("offerNumber").value);

  Tender.deployed().then(function(contract) {return contract.getOfferDelTime.call(offerNumber)}).then(function(value) {
    var offer_element = document.getElementById("offerDelTime");
    offer_element.innerHTML = value.valueOf();
    console.log(value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting description; see log.");
  });
};


function ShowOfferBill() {
  var offerNumber = parseInt(document.getElementById("offerNumber").value);

  Tender.deployed().then(function(contract) {return contract.getOfferBill.call(offerNumber)}).then(function(value) {
    var offer_element = document.getElementById("offerBill");
    offer_element.innerHTML = value.valueOf();
    console.log(value);
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting description; see log.");
  });
};

function acceptOffer() {
  var offerNumber = document.getElementById("offerNumber").value;
  var buyer = document.getElementById("buyer").value;
  var supplier = document.getElementById("supplier").value;
 // var Bill = parseInt(document.getElementById("Bill").value);
  Tender.deployed().then(function(contract) {return contract.getOfferBill.call(offerNumber, {from: buyer})}).then(function(Bill) {
  setStatus("Bezig met transactie... (even wachten aub)");
  Tender.deployed().then(function(contract) {contract.acceptOffer(offerNumber, buyer, supplier, {from: buyer, value: web3.toWei(Bill, "finney")})}).then(function(offerId) {
    setStatus("Product Gekocht");
    }).catch(function(e) {
    console.log(e);
    setStatus("Error; zie log.");
   });
 });
};

function signSupplier() {
  var offerNumber = document.getElementById("offerNumber").value;
  var supplier = document.getElementById("supplier").value;
    
  setStatus("Bezig met transactie... (even wachten aub)");
  Tender.deployed().then(function(contract) {contract.signSupplier(offerNumber, {from: supplier})}).then(function(offerId) {
    setStatus("Geleverd");
    }).catch(function(e) {
    console.log(e);
    setStatus("Error; zie log.");
  });
};

function signBuyer() {
  var offerNumber = document.getElementById("offerNumber").value;
  var buyer = document.getElementById("buyer").value;
    
  setStatus("Bezig met transactie... (even wachten aub)");
  Tender.deployed().then(function(contract) {contract.signBuyer(offerNumber, {from: buyer})}).then(function(offerId) {
    setStatus("Product aangekomen");
    }).catch(function(e) {
    console.log(e);
    setStatus("Error; zie log.");
  });
};

function executeOffer() {
  var offerNumber = document.getElementById("offerNumber").value;
    
  setStatus("Bezig met transactie... (even wachten aub)");
  Tender.deployed().then(function(contract) {contract.executeOffer(offerNumber)}).then(function(offerId) {
    setStatus("Contract uitbetaald");
    }).catch(function(e) {
    console.log(e);
    setStatus("Error; zie log.");
  });
};


window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];

  });
}
