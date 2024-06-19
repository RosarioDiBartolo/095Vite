import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext   } from 'react';

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
 

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;

 };

export default AppProvider;
