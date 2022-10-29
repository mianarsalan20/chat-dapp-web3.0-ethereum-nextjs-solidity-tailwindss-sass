const ConnectWalletButton = ({ connectWallet }) => (
  <div className="formContainer">
    <button
      className="connectButton"
      // Add an onClick functionality
      onClick={connectWallet}
    >
      Connect Wallet
    </button>
  </div>
);

export default ConnectWalletButton;
