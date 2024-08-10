import styled from "styled-components";
import Toast from "react-bootstrap/Toast";

export const ToastBottomRight = styled(Toast)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: auto;
  max-width: 300px;
  z-index: 1050;
`;
