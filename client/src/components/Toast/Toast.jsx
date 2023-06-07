import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../../context/GlobalState';

function Toast() {
  const { error } = useStateValue();

  const customId = 'custom-id-yes';
  if (error !== '') {
    toast.error(error, { toastId: customId });
    return (
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop="true"
        closeOnClick="true"
        rtl={false}
        pauseOnFocusLoss={false}
      />
    );
  }

  return <></>;
}

export default Toast;
