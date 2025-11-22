import React, { createContext, useContext, useEffect } from "react";
import { initBlockchain, getReports, storeOnBlockchain } from "../services/blockchainService";

const BlockchainContext = createContext();

export function BlockchainProvider({ children }) {
  useEffect(() => {
    initBlockchain(); // Initialize when app starts
  }, []);

  return (
    <BlockchainContext.Provider value={{ getReports, storeOnBlockchain }}>
      {children}
    </BlockchainContext.Provider>
  );
}

export function useBlockchain() {
  return useContext(BlockchainContext);
}

