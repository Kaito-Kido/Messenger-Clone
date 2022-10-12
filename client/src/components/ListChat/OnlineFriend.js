import React, { useState, useEffect } from "react";
import axios from "axios";
import { WrapConver, Conver, ConverAvar } from "./styled";

const OnlineFriend = ({ currentUserId, friend, searchValue, searching }) => {
  const [name, setName] = useState("");
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const getFriend = async () => {
      try {
        const res = await axios.get(`/user/${friend.userId}`, {
          withCredentials: true,
        });
        if (
          res.data.username.toLowerCase().includes(searchValue.toLowerCase()) &&
          friend.userId !== currentUserId
        ) {
          setName(res.data.name ? res.data.name : res.data.username);
          setDisplay(true);
        } else setDisplay(false);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [currentUserId, friend, searchValue]);

  return (
    display &&
    searching && (
      <WrapConver>
        <Conver>
          <ConverAvar src={"defaultAvatar.png"} alt="avatar" />
          {/* {online() && <OnlineDot />} */}
          <p>{name}</p>
        </Conver>
      </WrapConver>
    )
  );
};

export default OnlineFriend;
