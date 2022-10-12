import axios from "axios";
import React, { useEffect, useState } from "react";
import { Conver, ConverAvar, OnlineDot, WrapConver } from "./styled";

const Conversation = ({
  avatarLink,
  conver,
  currentUserId,
  onlineFriend,
  searchValue,
}) => {
  const [name, setName] = useState("");
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    const friendId = conver.members.find((f) => f !== currentUserId);
    const getFriend = async () => {
      try {
        const res = await axios.get(`/user/${friendId}`, {
          withCredentials: true,
        });
        if (
          res.data.username.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          setDisplay(true);
          setName(res.data.name ? res.data.name : res.data.username);
        } else {
          setDisplay(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [currentUserId, conver, searchValue]);

  const online = () => {
    const friendId = conver.members.find((f) => f !== currentUserId);
    return onlineFriend.some((friend) => {
      return friend.userId === friendId;
    });
  };

  return (
    display && (
      <WrapConver>
        <Conver>
          <ConverAvar
            src={avatarLink ? avatarLink : "defaultAvatar.png"}
            alt="avatar"
          />
          {online() && <OnlineDot />}
          <p>{name}</p>
        </Conver>
      </WrapConver>
    )
  );
};

export default Conversation;
