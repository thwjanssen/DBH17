var ConvertLib = artifacts.require("./ConvertLib.sol");
var Tender = artifacts.require("./Tender.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Tender);
  deployer.deploy(Tender);
};
