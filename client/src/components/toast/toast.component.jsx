import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastBottomRight } from "./toast.styles";

const MessageToast = ({ message }) => {
  const [show, setShow] = useState(false);
  const [displayTime, setDisplayTime] = useState("");
  const toggleShow = () => setShow(!show);

  const getTime = () => {
    const date = new Date(Date.now());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds} hrs`;
  };

  useEffect(() => {
    setDisplayTime(getTime());
    setShow(true);
  }, [message]);

  return (
    <ToastBottomRight
      onClose={toggleShow}
      show={show}
      animation={false}
      className="toast-bottom-right"
    >
      <ToastBottomRight.Header>
        <strong className="me-auto">ScribbleSpot</strong>
        <small>{displayTime}</small>
      </ToastBottomRight.Header>
      <ToastBottomRight.Body>{message}</ToastBottomRight.Body>
    </ToastBottomRight>
  );
};

MessageToast.propTypes = {
  message: PropTypes.string,
};

export default MessageToast;
