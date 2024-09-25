import React, { useEffect } from 'react';
import styles from './Toast.module.css';

interface ToastProps {
  title: string;
  message: string[];
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.toast}>
        <div className={styles.title}>{title}</div>
        <div className={styles.message}>
          {message.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Toast;