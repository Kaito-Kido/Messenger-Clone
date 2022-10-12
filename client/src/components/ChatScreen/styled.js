import styled from "styled-components/macro";

export const Container = styled.div`
  flex: 1;
  /* width: 100%; */
  height: 100vh;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

export const HeadChat = styled.div`
  width: 100%;
  height: fit-content;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 0.5px 5px rgba(0, 0, 0, 0.1);

  svg {
    color: #0084ff;
  }
`;

export const NameChat = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Image = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

export const InputBar = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  padding: 20px 10px;
  gap: 10px;
  align-items: center;
`;

export const Input = styled.input`
  border: none;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  width: 100%;
  padding: 5px 10px;
  align-items: center;
  height: fit-content;
  font-size: 16px;
  max-height: 200px;
  overflow-y: scroll;
`;

export const SendButton = styled.button`
  border-radius: 50%;
  padding: 4px;
  border: none;
  align-items: center;
  justify-content: center;
  background-color: white;
  svg {
    width: 16px;
    height: 16px;
    font-size: 24px;
    color: #0084ff;
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const DisplayChat = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 20px;
  overflow-y: scroll;
`;

export const OnlyMessage = styled.p`
  background-color: ${(props) =>
    props.own ? "rgb(0, 132, 255)" : "rgba(0, 0, 0, 0.1)"};
  padding: 5px 10px;
  border-radius: 20px;
  color: ${(props) => (props.own ? "white" : "black")};
  max-width: 700px;
  margin: 0;
  margin-top: 15px;
`;

export const Avatar = styled.img`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  display: ${(props) => (props.own ? "none" : "block")};
`;

export const Mes = styled.div`
  display: flex;
  justify-content: ${(props) => (props.own ? "flex-end" : "flex-start")};
  align-items: center;
  gap: 10px;
  align-items: flex-end;
`;

export const OptionButton = styled.div`
  border-radius: 50%;
  :hover {
    background-color: #f2f2f2;
  }
  height: 36px;
  width: 36px;
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: center;
  cursor: pointer;
`;
