import {
  useState,
  useEffect,
  useRef,
  createContext,
  MutableRefObject,
  Dispatch,
  SetStateAction,
} from "react";
import ThemeButton from "./components/ThemeButton";
import usersData from "./data/usersData";
import "./App.css";

export interface AppContextValue {
  appRef: MutableRefObject<HTMLElement | null>;
  isMobile: boolean;
  theme: "dark" | "light";
  setTheme: Dispatch<SetStateAction<"dark" | "light">>;
}
export const AppContext = createContext<AppContextValue | null>(null);

const App = () => {
  /* Is mobile mecanic */
  const appRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  /* Color theme state */
  useEffect(() => {
    if (cardContainerRef.current) {
      if (theme === "light") {
        for (let element of cardContainerRef.current.children) {
          (element as HTMLElement).classList.add("light");
        }
        return;
      }
      for (let element of cardContainerRef.current.children) {
        (element as HTMLElement).classList.remove("light");
      }
    }
  }, [theme]);

  /* Render cards */
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const [cardContainerContent, setCardContainerContent] = useState<
    JSX.Element[] | string | null
  >(null);
  useEffect(() => {
    /* Is mobile mecanic */
    if (appRef.current) {
      window.addEventListener("resize", () => {
        const width: number = (appRef.current as HTMLDivElement).clientWidth;
        const newIsMobileValue = width <= 400;
        setIsMobile(newIsMobileValue);
      });
    }

    /* Render cards */
    let newCardContainerContent: JSX.Element[] | string = "Fetching users...";
    if (usersData.length === 0) {
      newCardContainerContent = "No users yer :[";
    } else {
      newCardContainerContent = usersData.map((userData, index) => {
        return (
          <div
            key={index}
            className={`user-card ${theme === "light" ? "light" : ""}`.trim()}
          >
            <span>{userData.name}</span> <span>{userData.age}</span>
          </div>
        );
      });
    }
    setCardContainerContent(newCardContainerContent);
  }, []);

  return (
    <AppContext.Provider
      value={{
        appRef,
        isMobile,
        theme,
        setTheme,
      }}
    >
      <div
        ref={appRef}
        className={`App ${theme === "light" ? "light" : ""}`.trim()}
      >
        <div className="button-container">
          <ThemeButton />
        </div>
        <div className="card-container" ref={cardContainerRef}>
          {cardContainerContent}
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
