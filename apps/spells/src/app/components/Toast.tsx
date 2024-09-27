import React, { useEffect } from 'react';
import styles from '../styles/Toast.module.css';

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

  const renderText = (text: string) => {
    return text.split(/(:[^:\s]+:)/).map((segment, index) => {
      if (segment.match(/^:[^:\s]+:$/)) {
        const emoji = segment.slice(1, -1);
        return (
          <span key={index} role="img" aria-label={getEmojiDescription(emoji)}>
            {segment}
          </span>
        );
      }
      return segment;
    });
  };

  const getEmojiDescription = (emoji: string) => {
    const emojiDescriptions: { [key: string]: string } = {
      '🎃': 'Jack-o-lantern',
      '✨': 'Sparkles',
      '🧙‍♀️': 'Witch',
      '🌙': 'Crescent moon',
      '🌑': 'New moon',
    };
    return emojiDescriptions[emoji] || 'Emoji';
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.toast} role="alert">
        <div className={styles.title}>{renderText(title)}</div>
        <div className={styles.message}>
          {message.map((line, index) => (
            <p key={index}>{renderText(line)}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Toast;
