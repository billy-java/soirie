import React from 'react';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const Bouton1: React.FC<ButtonProps> = ({ text, type = 'button', onClick, className }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-800 transition-all ${className}`}>
        {text}
      </button>
    );
  };

export default Bouton1