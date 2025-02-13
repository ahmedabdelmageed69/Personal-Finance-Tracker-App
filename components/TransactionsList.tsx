import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTransactions } from "../context/TransactionsContext";

type TransactionsListProps = {
  type: "income" | "expense";
};

const TransactionsList = ({ type }: TransactionsListProps) => {
  const [filterBy, setFilterBy] = useState<"date" | "amount">("date");
  const { transactions } = useTransactions();

  const filteredTransactions = useMemo(() => {
    return transactions.filter((trans) => trans.type === type);
  }, [transactions, type]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      if (filterBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });
  }, [filterBy, filteredTransactions]);

  if (sortedTransactions.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No transactions found.</Text>
      </View>
    );
  }

  return (
    <View>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilterBy("date")}>
          <Text
            style={[
              styles.filterText,
              { color: filterBy === "date" ? "blue" : "#333" },
            ]}
          >
            Sort by Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterBy("amount")}>
          <Text
            style={[
              styles.filterText,
              { color: filterBy === "amount" ? "blue" : "#333" },
            ]}
          >
            Sort by Amount
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortedTransactions}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.transactionHeader}>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.dateText}>
                {new Date(item.date).toLocaleDateString()}
              </Text>
            </View>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <Text
              style={{
                fontSize: 14,
                color: item.type === "income" ? "green" : "red",
              }}
            >
              {item.type === "income"
                ? `+ $${item.amount}`
                : `- $${item.amount}`}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default TransactionsList;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "700",
  },
  transactionItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  transactionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "700",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
});
