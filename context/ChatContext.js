import { createContext, useState, useEffect } from "react";
import Router from "next/router";
import { ChatContractAddress } from "../config";
import ChatAbi from "../backend/build/contracts/ChatContract.json";
import { ethers } from "ethers";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [selectedAddr, setSelectedAddr] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [searchAccount, setSearchAccount] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      console.log("Connected to " + chainId);
      const rinkebyChainId = "0x5";
      if (chainId !== rinkebyChainId) {
        console.log("Please connect to Goerli Test Network");
        setCorrectNetwork(false);
        setNetworkError(true);
        return;
      } else {
        setCorrectNetwork(true);
        setNetworkError(false);
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found accounts: ", accounts);
      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Register User from front-end onto the blockchain
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      console.log("Registering user");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        await chatContract
          .registerUser(currentAccount, username, password)
          .then((res) => {
            alert("User Registered successfully");
          });
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      alert("Error: User Already Exist!", error);
    }
  };

  // User LogIn from front-end onto the blockchain
  const loginUser = async (event) => {
    event.preventDefault();
    try {
      console.log("User LogIn");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        const tx = await chatContract.loginUser(
          currentAccount,
          username,
          password
        ); // 100ms
        const rc = await tx.wait(); // 0ms, as tx is already confirmed
        const event = rc.events.find((event) => event.event === "LoginUser");
        const [isUserLoggedIn] = await event.args;
        console.log(isUserLoggedIn);
        if (isUserLoggedIn) {
          console.log("User LoggedIn successfully");
          Router.push("/ChatHome");
        } else {
          alert("User LoggedIn failed");
        }
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // User LogOut from front-end onto the blockchain
  const logoutUser = async (event) => {
    event.preventDefault();
    try {
      console.log("User LogOut");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        const tx = await chatContract.logoutUser(currentAccount);
        const rc = await tx.wait(); // 0ms, as tx is already confirmed
        const event = rc.events.find((event) => event.event === "LogoutUser");
        const [isUserLoggedIn] = await event.args;
        if (!isUserLoggedIn) {
          console.log("User LoggedOut successfully");
          Router.push("/");
        } else {
          alert("User LoggedOut failed");
        }
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // User Search and add friend from front-end onto the blockchain
  const searchAndAddFriend = async (event) => {
    event.preventDefault();
    try {
      console.log("User Search and Add Friend");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        //Check if user exists.
        let boolcheckUser = await chatContract.checkUserExists(searchAccount);
        //If user exists and not adding self as friend.
        if (
          boolcheckUser &&
          searchAccount.toLowerCase() != currentAccount.toLowerCase()
        ) {
          //get the username of the searched account to add as friend.
          let friendUsername = await chatContract.getUsername(searchAccount);
          //check if already friends.
          console.log("friendUsername: ", searchAccount, currentAccount);

          // Add friend to the current user.
          await chatContract
            .addFriend(searchAccount, friendUsername)
            .then((res) => {
              alert("Friend Added successfully");
            });
        }
        //If user does not exist and not adding self as friend then throw error.
        else {
          if (!boolcheckUser) {
            alert("User doesn't exist");
          } else {
            alert("Can't add yourself as friend");
          }
        }
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      alert("Error: Users are Already Friends! ", error);
    }
  };

  // Show User friends to front-end from the blockchain
  const getMyFriendList = async (event) => {
    try {
      console.log("Show User friends");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        // Add friend to the current user.
        setFriendsList(await chatContract.getMyFriendList());
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Show friends Messages to front-end from the blockchain
  const sendMessage = async (friendAddr) => {
    try {
      console.log("Send Message to Friends");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        // Add friend to the current user.
        await chatContract.sendMessage(selectedAddr, messageInput);
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Show friends Messages to front-end from the blockchain
  const showMessages = async (friendAddr) => {
    try {
      console.log("Show User friends");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );

        // Add friend to the current user.
        setMessagesList(await chatContract.readMessage(friendAddr));
        setSelectedAddr(friendAddr);
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // User LogIn from front-end onto the blockchain
  const checkIsUserLogged = async (event) => {
    try {
      console.log("Check User is LoggedIn");
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const chatContract = new ethers.Contract(
          ChatContractAddress,
          ChatAbi.abi,
          signer
        );
        chatContract.checkIsUserLogged(currentAccount);
      } else {
        alert("Please connect to MetaMask");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        correctNetwork,
        setCorrectNetwork,
        networkError,
        setNetworkError,
        isUserLoggedIn,
        setIsUserLoggedIn,
        currentAccount,
        setCurrentAccount,
        connectWallet,
        setUsername,
        setPassword,
        registerUser,
        loginUser,
        logoutUser,
        searchAndAddFriend,
        setSearchAccount,
        friendsList,
        getMyFriendList,
        messagesList,
        showMessages,
        setMessageInput,
        sendMessage,
        setSelectedUserName,
        selectedUserName,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
