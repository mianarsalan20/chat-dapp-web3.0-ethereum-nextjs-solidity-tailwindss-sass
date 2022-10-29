const ChatContract = artifacts.require("ChatContract");

module.exports = function (deployer) {
  deployer.deploy(ChatContract);
};
