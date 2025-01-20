import { createContext, ReactNode, useContext } from "react";
import usePageState from "./usePageState";
import { PageType } from "../types";

type AppStateContextType = ReturnType<typeof usePageState>;

const AppStateContext = createContext<AppStateContextType>(
  {} as AppStateContextType
);

type AppStateProvider = {
  children: ReactNode;
  initialPage: PageType;
};

export const AppStateProvider = ({
  children,
  initialPage,
}: AppStateProvider) => {
  const pageStateHandler = usePageState(initialPage);
  return (
    <AppStateContext.Provider value={pageStateHandler}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
