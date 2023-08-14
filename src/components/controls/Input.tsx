"use client";
import classNames from "classnames";
import { ChangeEvent, FocusEvent, FC, useId } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label?: string;
  value: string | number;
  name: string;
  placeholder: string;
  error?: boolean;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
}
const Input: FC<InputProps> = ({
  type,
  label,
  value,
  name,
  placeholder,
  onBlur,
  onChange,
  disabled,
  error,
  className,
}) => {
  const id = useId();
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        className={classNames(
          "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 transition-all duration-300 ease-in-out ",
          { " border-red-600": error }
        )}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
