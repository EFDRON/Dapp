import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Web3 from "web3";

interface Web3ContextType {
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  account?: string | undefined;
  connect: () => Promise<string | undefined>;
}

export const Web3Context = createContext<Web3ContextType>({
  trigger: false,
  setTrigger: () => {},
  account: undefined,
  connect: async () => undefined,
});

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [trigger, setTrigger] = useState<boolean>(false);

  const connect = async () => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      return accounts[0];
    } else {
      alert("Please install MetaMask");
      return undefined;
    }
  };

  return (
    <Web3Context.Provider value={{ trigger, setTrigger, account, connect }}>
      {children}
    </Web3Context.Provider>
  );
};
