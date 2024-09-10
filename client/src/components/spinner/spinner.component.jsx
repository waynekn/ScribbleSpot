import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  border: 8px solid #fff;
  border-top: 8px solid #aaa;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${spin} 1.5s linear infinite;
`;

const Spinner = () => (
  <LoaderContainer>
    <Loader />
  </LoaderContainer>
);

export default Spinner;
