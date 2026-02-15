import React from 'react';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  let variantClass = 'btn-primary';
  if (variant === 'secondary') variantClass = 'btn-secondary';
  
  return (
    <button className={`btn ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Input = ({ label, error, className = '', ...props }) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      {label && <label className="text-sm font-medium mb-1" style={{ color: 'var(--color-text-primary)' }}>{label}</label>}
      <input 
        className="input-field"
        {...props}
      />
      {error && <span className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>{error}</span>}
    </div>
  );
};

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};
