import AsyncStorage from "@react-native-async-storage/async-storage";

export const addTransaction = async (transactions: any) => {
  await AsyncStorage.setItem("transactions", JSON.stringify(transactions));
};

export const getTransactions = async () => {
  const transactions = await AsyncStorage.getItem("transactions");
  return transactions ? JSON.parse(transactions) : [];
};
