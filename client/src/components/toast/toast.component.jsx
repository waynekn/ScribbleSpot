import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ToastBottomRight } from "./toast.styles";

const MessageToast = ({ message }) => {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timer);
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
      </ToastBottomRight.Header>
      <ToastBottomRight.Body>{message}</ToastBottomRight.Body>
    </ToastBottomRight>
  );
};

MessageToast.propTypes = {
  message: PropTypes.string,
};

export default MessageToast;
