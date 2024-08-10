import styled from "styled-components";

export const SignUpPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  place-items: center;
`;

export const SignUpButtonsContainer = styled.section`
  width: 40vw;
  border: 1px solid black;
  border-radius: 10px;
`;

export const SignUpHeading = styled.h2`
  text-align: center;
  margin-top: 5px;
  margin-bottom: 50px;
`;

export const ProviderButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const ProviderButton = styled.button`
  height: 40px;
  width: 50%;
  background-color: inherit;
  border: 1px solid black;
  border-radius: 10px;
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 5px #333;
  }
`;
