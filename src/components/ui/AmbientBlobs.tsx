'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './AmbientBlobs.module.css';

export function AmbientBlobs() {
  return (
    <div className={styles.container}>
      <motion.div
        className={`${styles.blob} ${styles.blob1}`}
        animate={{
          x: [0, 50, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className={`${styles.blob} ${styles.blob2}`}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      <motion.div
        className={`${styles.blob} ${styles.blob3}`}
        animate={{
          x: [0, 30, -50, 0],
          y: [0, -20, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />
    </div>
  );
}
