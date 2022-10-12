import { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import Chat from "../../components/ChatScreen/index";
import ListChat from "../../components/ListChat";
import Setting from "../../components/Setting";
import { UserContext } from "../../context/userContext";
import { Container } from "./styled";
const socket = io.connect(process.env.REACT_APP_URL);

const Home = () => {
  const [currentChat, setCurrentChat] = useState(null);
  const user = useContext(UserContext);
  const [onlineFriend, setOnlineFriend] = useState([]);
  const [setting, setSetting] = useState(false);
  useEffect(() => {
    try {
      socket.emit("addUser", user.id);
      socket.on("onlineFriend", (users) => {
        setOnlineFriend(users);
      });
    } catch (err) {
      console.log(err);
    }
  }, [user]);

  const toggleSetting = () => {
    setSetting((prev) => !prev);
  };

  return (
    <Container>
      <ListChat setCurrentChat={setCurrentChat} onlineFriend={onlineFriend} />
      {currentChat ? (
        <Chat
          currentChat={currentChat}
          socket={socket}
          setting={toggleSetting}
        />
      ) : (
        <p>Open a conversation to start a chat</p>
      )}
      {setting && <Setting />}
    </Container>
  );
};

export default Home;
