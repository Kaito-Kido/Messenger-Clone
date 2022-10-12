import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin-top: 40px;
  font-size: 40px;
`;
export const Label = styled.label`
  margin-bottom: -10px;
  z-index: 1;
  background-color: white;
  padding: 0 5px;
  width: fit-content;
  margin-left: 5px;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 5px;
`;

export const Input = styled.input`
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  font-size: 20px;
  font-weight: 300;

  &:focus {
    border-color: #0084ff;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: var(--main-color);
  width: fit-content;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 18px;
  align-self: center;
  margin-top: 20px;
  cursor: pointer;
`;

export const Error = styled.p`
  color: red;
`;

export const Regist = styled.span`
  :hover {
    cursor: pointer;
    color: #0084ff;
  }
`;
