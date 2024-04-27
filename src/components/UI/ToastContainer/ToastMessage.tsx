import React, { useCallback, useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  message: string;
  success?: boolean;
  error?: boolean;
}
const ToastMessage: React.FC<Props> = ({
  message,
  success = false,
  error = false,
}) => {
  const notify = useCallback(() => {
    if (success) {
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
        transition: Bounce,
      });
    } else if (error) {
      toast.error(message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'light',
      });
    }
  }, [message, error, success]);

  useEffect(() => {
    void notify();
  }, [notify]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </>
  );
};

export default ToastMessage;
