/**
 * PIN Input Component
 *
 * 4-digit PIN input with individual cells.
 */

'use client';

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from 'react';
import styles from './PinInput.module.scss';

export interface PinInputProps {
  onComplete: (pin: string) => void;
  disabled?: boolean;
  error?: string;
  onErrorClear?: () => void;
}

export function PinInput({ onComplete, disabled = false, error, onErrorClear }: PinInputProps) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-clear error after shake animation
  useEffect(() => {
    if (error && onErrorClear) {
      const timer = setTimeout(() => {
        onErrorClear();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [error, onErrorClear]);

  const handleChange = (index: number, value: string) => {
    // Clear error when user starts typing again
    if (error && onErrorClear) {
      onErrorClear();
    }

    // Only allow single digit
    const newValue = value.replace(/[^0-9]/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = newValue;
    setDigits(newDigits);

    // Auto-focus next input
    if (newValue && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if complete
    if (newDigits.every(d => d !== '')) {
      const pin = newDigits.join('');
      onComplete(pin);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Backspace: clear current or move to previous
    if (e.key === 'Backspace') {
      if (digits[index] === '' && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        const newDigits = [...digits];
        newDigits[index] = '';
        setDigits(newDigits);
      }
    }

    // Arrow keys navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');

    if (pastedData.length === 4) {
      const newDigits = pastedData.split('');
      setDigits(newDigits);
      inputRefs.current[3]?.focus();
      onComplete(pastedData);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.inputs} ${error ? styles.shake : ''}`}>
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={el => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            disabled={disabled}
            className={`${styles.input} ${error ? styles.error : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
