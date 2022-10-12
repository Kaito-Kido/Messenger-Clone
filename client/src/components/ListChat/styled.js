import styled from "styled-components/macro";

export const Container = styled.div`
  flex-direction: column;
  display: flex;
  height: 100vh;
  width: 350px;
  box-sizing: border-box;
`;

export const HeadUser = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: relative;
`;
export const Avatar = styled.img`
  border-radius: 50%;
  aspect-ratio: 1;
  width: 40px;
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 96%;
  height: fit-content;
  padding: 3px;
  border-radius: 10px;
  top: 100%;
  left: 12px;
  background-color: white;
  box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.1);
`;

export const LogoutButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 100%;
  height: fit-content;
  padding: 5px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  background-color: white;
  &:hover {
    background-color: rgb(242, 242, 242);
  }

  svg {
    border-radius: 50%;
    padding: 5px;
    background-color: #e8e8e8;
    font-size: 30px;
  }
`;

export const SearchBarContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: fit-content;
  padding: 10px 20px;
  align-items: center;
  padding-bottom: 0;
`;
export const Search = styled.div`
  display: flex;
  border-radius: 30px;
  width: 100%;
  padding: 5px 20px;
  background: rgba(134, 142, 153, 0.1);
  gap: 5px;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  background: rgba(134, 142, 153, 0.03);
  width: 100%;
  border: none;
  outline: none;
`;
export const Line = styled.div`
  height: 0.5px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 10px;
`;

export const WrapConver = styled.div`
  padding: 0 10px;
`;

export const Conver = styled.div`
  padding: 0 10px;
  width: 100%;
  height: 75px;
  border-radius: 10px;
  &:hover {
    background: rgb(242, 242, 242);
  }
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  position: relative;
`;

export const ConverAvar = styled.img`
  border-radius: 50%;
  height: 48px;
  width: 48px;
  object-fit: cover;
`;

export const ContainConver = styled.div`
  width: 100%;
  height: fit-content;
  overflow-y: scroll;
  :hover {
    cursor: pointer;
  }
`;

export const OnlineDot = styled.div`
  position: absolute;
  bottom: 23%;
  left: 14%;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  background-color: #55ca36;
  padding: 1px;
`;

export const BackArrow = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 50%;
  &:hover {
    background-color: rgb(242, 242, 242);
  }
`;

export const SearchArea = styled.div`
  display: flex;
  align-items: center;
`;

export const Divide = styled.div`
  padding: 0px 20px;
  width: 100%;
  p {
    font-weight: 600;
    margin-bottom: 0;
  }
  span {
    font-weight: 300;
  }
`;

export const ListConverArea = styled.div`
  height: 100%;
`;
