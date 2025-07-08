"use client";

import React, { useState, useEffect } from "react";

export function StatefulButton({ 
  children, 
  onClick, 
  disabled = false, 
  loadingText = "Loading...",
  className = "",
  style = {},
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Simple rotation animation for loading spinner
  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setRotation(prev => (prev + 30) % 360);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleClick = async (e) => {
    if (isLoading || disabled) return;
    
    setIsLoading(true);
    try {
      if (onClick) {
        await onClick(e);
      }
    } catch (error) {
      console.error('Button action failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || disabled}
      className={className}
      style={{
        position: 'relative',
        cursor: isLoading || disabled ? 'not-allowed' : 'pointer',
        opacity: disabled && !isLoading ? 0.5 : 1,
        ...style
      }}
      {...props}
    >
      {isLoading ? (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <div 
            style={{
              width: '16px',
              height: '16px',
              border: '2px solid transparent',
              borderTop: '2px solid currentColor',
              borderRadius: '50%',
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.05s linear'
            }}
          />
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
}
