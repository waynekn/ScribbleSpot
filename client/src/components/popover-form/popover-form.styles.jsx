import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9999;
`;

export const PopoverContainer = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  max-width: 400px;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10000;
  padding: 20px;
  box-sizing: border-box;
`;

export const FormField = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #b0bec5;
    color: #ffffff;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    color: #ff0000;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 5px 0 0;
`;
