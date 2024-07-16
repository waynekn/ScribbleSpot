import { useEffect, useState } from "react";
import Toast from "react-bootstrap/Toast";

const MessageToast = ({ message }) => {
  const [show, setShow] = useState(true);
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
    setDisplayTime(getTime);
  }, []);

  return (
    <Toast onClose={toggleShow} show={show} animation={false}>
      <Toast.Header>
        <strong className="me-auto">ScribbleSpot</strong>
        <small>{displayTime}</small>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

export default MessageToast;
