import "../styles/globals.css";
import "../styles/style.scss";
import { ChatProvider } from "../context/ChatContext";

function MyApp({ Component, pageProps }) {
  return (
    <ChatProvider>
      <Component {...pageProps} />
    </ChatProvider>
  );
}

export default MyApp;
