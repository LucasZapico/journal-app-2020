import React, { useState } from 'react';
import { useThemeValue } from '../context/index';
import { IoMdMoon, IoIosSunny, IoIosCloudy } from 'react-icons/io';

const ThemeToggle = () => {
  const { theme, setTheme } = useThemeValue();
  return (
    <div className="theme-toggles">
      <label
        className="theme-toggle--container"
        onClick={() => setTheme('dark')}
      >
        <input type="checkbox" id="toggle-theme"></input>
        <span className="toggle">
          <IoMdMoon />
        </span>
      </label>
      <label
        className="theme-toggle--container"
        onClick={() => setTheme('')}
      >
        <input type="checkbox" id="toggle-theme"></input>
        <span className="toggle">
          <IoIosSunny />
        </span>
      </label>
      <label
        className="theme-toggle--container"
        onClick={() => setTheme('light')}
      >
        <input type="checkbox" id="toggle-theme"></input>
        <span className="toggle">
          <IoIosCloudy />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
