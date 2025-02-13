import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const TransactionsTypeTabs = ({ type, setType, height = 60, padding = 5 }) => {
  return (
    <View
      style={{
        height: height,
        backgroundColor: "#f00044",
        width: "100%",
        borderRadius: 40,
        padding: 5,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{
          height: height - padding * 2,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: type === "income" ? "#fff" : "transparent",
          borderRadius: 40,
        }}
        onPress={() => setType("income")}
      >
        <Text
          style={{
            color: type === "income" ? "#333" : "#eee",
            fontWeight: type === "income" ? "700" : "600",
            fontSize: 16,
          }}
        >
          Income
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: height - padding * 2,
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          borderRadius: 40,
          backgroundColor: type === "expense" ? "#fff" : "transparent",
        }}
        onPress={() => setType("expense")}
      >
        <Text
          style={{
            color: type === "expense" ? "#333" : "#eee",
            fontWeight: type === "expense" ? "700" : "600",
            fontSize: 16,
          }}
        >
          Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TransactionsTypeTabs;

const styles = StyleSheet.create({});
