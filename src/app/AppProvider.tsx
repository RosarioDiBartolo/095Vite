import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext, useEffect  } from 'react';

// Define the type for the context state and setter function
type AppContextType = { game: [boolean, Dispatch<SetStateAction<boolean>>];   };

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const game = useState<boolean>(false); // useState to manage the boolean state
  

  return (
    <AppContext.Provider value={{ game  }}>
      {children}
    </AppContext.Provider>
  );
};

export const useScrollDelta = () => {
  const [scrollDir, setScrollDir] = useState("scrolling down");

useEffect(() => {
  const threshold = 0;
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  const updateScrollDir = () => {
    const scrollY = window.pageYOffset;

    if (Math.abs(scrollY - lastScrollY) < threshold) {
      ticking = false;
      return;
    }
    setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
    lastScrollY = scrollY > 0 ? scrollY : 0;
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDir);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll);
  console.log(scrollDir);

  return () => window.removeEventListener("scroll", onScroll);
}, [scrollDir]);
return scrollDir;

};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;

 };

export default AppProvider;
