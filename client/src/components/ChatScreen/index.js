import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import {
  Container,
  DisplayChat,
  HeadChat,
  Image,
  Input,
  InputBar,
  NameChat,
  OptionButton,
  SendButton,
} from "./styled";
import { IoIosSend } from "react-icons/io";
import Message from "./Message";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { BsThreeDots } from "react-icons/bs";

const Chat = ({ currentChat, socket, setting }) => {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useContext(UserContext);
  const scrollRef = useRef();
  const [name, setName] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(`/message/${currentChat._id}`, {
          withCredentials: true,
        });
        setMessage(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    const friendId = currentChat.members.find((f) => f !== user.id);
    const getFriend = async () => {
      try {
        const res = await axios.get(`/user/${friendId}`, {
          withCredentials: true,
        });
        setName(res.data.name ? res.data.name : res.data.username);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
    if (currentChat !== null) {
      getMessage();
    }
  }, [currentChat, user]);

  const handleSubmit = useCallback(async () => {
    if (newMessage !== "") {
      const mess = {
        conversationId: currentChat._id,
        senderId: user.id,
        text: newMessage,
      };
      setNewMessage("");

      const receiverId = currentChat.members.find(
        (member) => member !== user.id
      );

      socket.emit("sendMessage", {
        senderId: user.id,
        receiverId: receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post(`/message`, mess, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setMessage([...message, res.data]);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessage([
        ...message,
        {
          senderId: data.senderId,
          text: data.text,
          createAt: Date.now(),
        },
      ]);
    });
  }, [message, socket]);

  useEffect(() => {
    const enter = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        handleSubmit();
      }
    };
    document.addEventListener("keydown", enter);
    return () => document.removeEventListener("keydown", enter);
  }, [handleSubmit]);

  return (
    <Container>
      <HeadChat>
        <NameChat>
          <Image src="https://i.pravatar.cc/300" alt="avatar" />
          <p>{name}</p>
        </NameChat>
        <OptionButton onClick={setting}>
          <BsThreeDots />
        </OptionButton>
      </HeadChat>
      <DisplayChat>
        {message.map((m) => {
          return (
            <div key={m._id} ref={scrollRef}>
              <Message own={user.id === m.senderId} text={m.text} />
            </div>
          );
        })}
      </DisplayChat>
      <InputBar>
        <Input
          placeholder="Aa"
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <SendButton onClick={handleSubmit}>
          <IoIosSend />
        </SendButton>
      </InputBar>
    </Container>
  );
};

export default Chat;
