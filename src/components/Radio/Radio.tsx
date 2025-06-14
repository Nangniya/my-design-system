import React from 'react';

type RadioProps = {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  name?: string;
  value?: string;
};

const Radio = ({
  checked = false,
  onChange,
  disabled = false,
  children,
  name,
  value,
}: RadioProps) => {
  return (
    <label
      className={`inline-flex items-center gap-2 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <span className="relative flex items-center justify-center w-5 h-5">
        <input
          type="radio"
          className="peer appearance-none w-5 h-5 rounded-full border-2 border-gray-30 checked:border-primary-50 checked:bg-primary-0 transition-colors focus:ring-2 focus:ring-primary-40"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          name={name}
          value={value}
        />
        <span className="pointer-events-none absolute w-3 h-3 rounded-full bg-primary-50 opacity-0 peer-checked:opacity-100 transition-opacity"></span>
      </span>
      {children && <span className="text-gray-90">{children}</span>}
    </label>
  );
};

export default Radio;
