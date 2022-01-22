import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      'useAppSidebarState must be used within a AppSidebarContextProvider'
    );
  }

  return context;
};

export default useAppContext;
