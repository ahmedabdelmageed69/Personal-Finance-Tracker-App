import React, { createContext, useContext, useState, useEffect } from "react";
import { addTransaction, getTransactions } from "@/utils/storage";

type Transaction = {
  type: "income" | "expense";
  amount: number;
  category: string;
  date: Date;
  description: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  addNewTransaction: (transaction: Transaction) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  addNewTransaction: async () => {},
});

export const TransactionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const savedTransactions = await getTransactions();
      if (savedTransactions) setTransactions(savedTransactions);
    };
    fetchTransactions();
  }, []);

  const addNewTransaction = async (newTransaction: Transaction) => {
    const updatedTransactions = [newTransaction, ...transactions];
    await addTransaction(updatedTransactions);
    setTransactions(updatedTransactions);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addNewTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => useContext(TransactionsContext);
