import React, { useState } from 'react';
import PropTypes from 'prop-types';

const EditText = ({ 
  placeholder = '', 
  value = '', 
  onChange, 
  type = 'text',
  disabled = false,
  leftImage = null,
  rightImage = null,
  className = '',
  ...props 
}) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e) => {
    setInputValue(e?.target?.value);
    if (onChange) {
      onChange(e);
    }
  };

  const baseClasses = 'w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center';
  
  const inputClasses = `
    ${baseClasses}
    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'}
    ${className}
  `?.trim()?.replace(/\s+/g, ' ');

  return (
    <div className={inputClasses}>
      {leftImage && (
        <img 
          src={leftImage?.src} 
          alt="" 
          className={`w-[${leftImage?.width}px] h-[${leftImage?.height}px] mr-2`}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        disabled={disabled}
        className="flex-1 bg-transparent border-none outline-none text-inherit placeholder-current"
        {...props}
      />
      {rightImage && (
        <img 
          src={rightImage?.src} 
          alt="" 
          className={`w-[${rightImage?.width}px] h-[${rightImage?.height}px] ml-2`}
        />
      )}
    </div>
  );
};

EditText.propTypes = {
  placeholder: PropTypes?.string,
  value: PropTypes?.string,
  onChange: PropTypes?.func,
  type: PropTypes?.string,
  disabled: PropTypes?.bool,
  leftImage: PropTypes?.shape({
    src: PropTypes?.string?.isRequired,
    width: PropTypes?.number,
    height: PropTypes?.number
  }),
  rightImage: PropTypes?.shape({
    src: PropTypes?.string?.isRequired,
    width: PropTypes?.number,
    height: PropTypes?.number
  }),
  className: PropTypes?.string
};

export default EditText;