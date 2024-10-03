import React, { useState, useEffect } from 'react';
import styles from '../styles/SparkleEffect.module.css';

interface SparkleEffectProps {
  spellName: string;
}

const SparkleEffect: React.FC<SparkleEffectProps> = ({ spellName }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    setPosition({ x, y });
  }, []);

  return (
    <div
      className={styles.sparkleContainer}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className={styles.sparkle}>✨</div>
      <div className={styles.spellName}>{spellName}</div>
    </div>
  );
};

export default SparkleEffect;
