import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Avatar,
  BackArrow,
  ContainConver,
  Container,
  Conver,
  Divide,
  Dropdown,
  HeadUser,
  Line,
  ListConverArea,
  LogoutButton,
  Search,
  SearchArea,
  SearchBarContainer,
  SearchInput,
} from "./styled";
import { HiSearch } from "react-icons/hi";
import Conversation from "./Conversation";
import { BiLogOut } from "react-icons/bi";
import { logOut, refresh } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ChangeUserContext, UserContext } from "../../context/userContext";
import { BiArrowBack } from "react-icons/bi";
import OnlineFriend from "./OnlineFriend";

const ListChat = ({ setCurrentChat, onlineFriend }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [conver, setConver] = useState([]);
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const ref = useRef();
  const openDropdown = () => {
    setShowDrop(!showDrop);
  };
  const setUser = useContext(ChangeUserContext);
  const user =
    useContext(UserContext) || JSON.parse(localStorage.getItem("user"));

  const Logout = async () => {
    try {
      const res = await logOut();
      localStorage.clear();
      setUser(null);
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      localStorage.clear();
      setUser(null);
    }
  };

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`/conversation/${user.id}`, {
          withCredentials: true,
        });
        if (res.status === 200) setConver(res.data);
      } catch (err) {
        console.log(err);
        localStorage.clear();
        setUser(null);
      }
    };
    getConversation();
  }, [searching]);

  const checkConver = (friendId) => {
    for (const e of conver) {
      if (e.members.includes(friendId)) {
        return false;
      }
    }
    return true;
  };

  const createConver = async (friendId) => {
    console.log(friendId);
    try {
      const m = { members: [friendId, user.id] };
      const res = await axios.post(`/conversation`, m, {
        withCredentials: true,
      });
      setCurrentChat(res.data);
      setSearching(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setSearching(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Container>
      <HeadUser>
        <p>Chats</p>
        <Avatar
          src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-1/264133104_612414676569447_6896182851680130145_n.jpg?stp=dst-jpg_p100x100&_nc_cat=109&ccb=1-7&_nc_sid=7206a8&_nc_ohc=52EyVdrsisUAX8JN6aU&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn19-1.fna&oh=00_AT9otWhrnSsNvShVzKGUXCGRFtWRStggKFjTI45Pp0Dlow&oe=63273774"
          alt="avatar"
          onClick={openDropdown}
        />
        {showDrop && (
          <Dropdown>
            <LogoutButton onClick={Logout}>
              <BiLogOut />
              <p>Log out</p>
            </LogoutButton>
          </Dropdown>
        )}
      </HeadUser>
      <ListConverArea ref={ref}>
        <SearchBarContainer>
          <SearchArea>
            {searching && (
              <BackArrow
                onClick={() => {
                  setSearching(false);
                }}
              >
                <BiArrowBack />
              </BackArrow>
            )}
            <Search>
              {!searching && <HiSearch />}
              <SearchInput
                placeholder="Search Messenger"
                value={searchValue}
                onFocus={() => setSearching(true)}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </Search>
          </SearchArea>
          {!searching && <Line />}
        </SearchBarContainer>
        <ContainConver>
          {conver.map((c) => {
            return (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  conver={c}
                  currentUserId={user.id}
                  onlineFriend={onlineFriend}
                  searchValue={searchValue}
                />
              </div>
            );
          })}
        </ContainConver>
        {searching && (
          <Divide>
            <Line />
            <p>Online people</p>
            <span>Choose to start a conversation</span>
          </Divide>
        )}
        <ContainConver>
          {onlineFriend.map((f) => {
            if (f.userId !== user.id && checkConver(f.userId)) {
              return (
                <div key={f.userId} onClick={() => createConver(f.userId)}>
                  <OnlineFriend
                    currentUserId={user.id}
                    friend={f}
                    searchValue={searchValue}
                    searching={searching}
                  />
                </div>
              );
            }
          })}
        </ContainConver>
      </ListConverArea>
    </Container>
  );
};

export default ListChat;
