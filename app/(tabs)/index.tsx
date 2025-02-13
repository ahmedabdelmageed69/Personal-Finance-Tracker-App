import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionsList from "@/components/TransactionsList";
import Feather from "@expo/vector-icons/Feather";
import TransactionForm from "@/components/TransactionForm";
import TransactionsTypeTabs from "@/components/TransactionsTypeTabs";

const Transactions = () => {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [showForm, setShowForm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.transactionTitle}>Transactions</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setShowForm(true)}
        >
          <Feather name="plus-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TransactionForm visible={showForm} setVisible={setShowForm} />

      <TransactionsTypeTabs
        type={type}
        setType={setType}
        height={60}
        padding={5}
      />
      <TransactionsList type={type} />
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  addBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  transactionTitle: { fontSize: 16, fontWeight: "600" },
  container: { padding: 8, flex: 0.85 },
});
