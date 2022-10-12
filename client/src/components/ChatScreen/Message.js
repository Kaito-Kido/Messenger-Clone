import React from "react";
import { Avatar, Mes, OnlyMessage } from "./styled";

const Message = ({ text, own }) => {
  return (
    <Mes own={own}>
      <Avatar own={own} src="https://i.pravatar.cc/300" alt="avatar" />
      <OnlyMessage own={own}>{text}</OnlyMessage>
    </Mes>
  );
};

export default Message;
