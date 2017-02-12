pragma solidity ^0.4.8;
contract Tender {
    /* Contract Variables and events */
    Offer[] public offers;
    uint public numOffers;
    
    enum State {Created, Accepted, Executed}
    
    struct Offer {
        address seller;
        address buyer;
        address supplier;
        uint amount;
        uint bill;
	uint time;
        State state;
        bool signBuyer;
        bool signSupplier;
    }
    
    /* Function to create a new offer */
    function newOffer(address beneficiary, uint etherAmount, uint delTime) returns (uint offerID) {
        offerID = offers.length++;
        Offer p = offers[offerID];
        p.seller = beneficiary;
        p.amount = etherAmount;
        p.bill = etherAmount * 1 finney;
        p.time = delTime;
        p.state = State.Created;
        p.signBuyer = false;
        p.signSupplier = false;
        numOffers = offerID+1;
    }

        function getOfferDelTime(uint offerNumber) constant returns (uint _time) {
		Offer p = offers[offerNumber];
		return p.time;
	}

        function getOfferBill(uint offerNumber) constant returns (uint _amount) {
		Offer p = offers[offerNumber];
		return p.amount;
	}

        function getOffersSignBuyer(uint offerNumber) constant returns (bool _signBuyer) {
		Offer p = offers[offerNumber];
		return p.signBuyer;
	}

        function getOffersSignSupplier(uint offerNumber) constant returns (bool _signSupplier) {
		Offer p = offers[offerNumber];
		return p.signSupplier;
	}
        
    
    function acceptOffer(uint offerNumber, address consumer, address adrsupplier) payable returns (uint offerID)
    {
        Offer p = offers[offerNumber];
            if (p.state != State.Created) {
                throw;
            }
            if(msg.value != p.bill) throw;
            
      p.buyer = consumer;
      p.supplier = adrsupplier;
        /* Check if the proposal can be executed */

        p.state = State.Accepted;
            
     }
    
    function signSupplier(uint offerNumber) returns (int result) {
        Offer p = offers[offerNumber];
        /* Check if the proposal can be executed */

            if (p.state != State.Accepted) {
                throw;
            }
            if(msg.sender != p.supplier) throw;
            
            p.signSupplier = true;
    }
            
    function signBuyer(uint offerNumber) returns (int result) {
        Offer p = offers[offerNumber];
        /* Check if the proposal can be executed */

            if (p.state != State.Accepted) {
                throw;
            }
            if(msg.sender != p.buyer) throw;
           
            p.signBuyer = true;
            
    }
    
    function executeOffer(uint offerNumber) returns (int result) {
        Offer p = offers[offerNumber];
        /* Check if the proposal can be executed */

            if (p.state != State.Accepted) {
                throw;
            }
            if (p.signBuyer != true) {
                throw;
            }
            if (p.signSupplier != true) {
                throw;
            }

            if (!p.seller.send(p.bill)) {
                throw;
            }
            
            p.state = State.Executed;
            
    }
    
    
}
