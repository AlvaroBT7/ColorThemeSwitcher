import { useRef, useState, useEffect, useContext } from "react";
import { AppContext, AppContextValue } from "../App";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import "../styles/ThemeButton.css";

const ThemeButton = () => {
  const { theme, isMobile, setTheme } = useContext(
    AppContext
  ) as AppContextValue;

  const [className, setClassName] = useState<string | null>(null);
  useEffect(() => {
    const classArray = ["ThemeButton"];
    if (theme === "light") classArray.push(theme);
    if (isMobile) classArray.push("is-mobile");
    const newClassNameValue = classArray.join(" ");
    setClassName(newClassNameValue);
  }, [theme, isMobile]);

  const data = useRef({
    dark: ["Dark Theme", <BiMoon />],
    light: ["Light Theme", <BiSun />],
  });

  const handleClick = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  return (
    <button onClick={handleClick} className={className ? className : undefined}>
      {isMobile ? null : data.current[theme][0]}
      {data.current[theme][1]}
    </button>
  );
};

export default ThemeButton;
