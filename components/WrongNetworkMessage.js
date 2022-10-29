const WrongNetworkMessage = () => (
  <div className="formContainer">
    <div className="formWrapper">
      {/* Prompt to change network to Rinkeby */}
      <div>----------------------------------------</div>
      <div>Please connect to the Goerli Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
    </div>
  </div>
);

export default WrongNetworkMessage;
