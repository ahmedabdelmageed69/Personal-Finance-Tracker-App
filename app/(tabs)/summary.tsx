import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "@/context/TransactionsContext";
import { generateColor } from "@/utils/generateColor";
import { FontAwesome5 } from "@expo/vector-icons";

type Transaction = {
  type: "income" | "expense";
  amount: number;
  category: string;
  date: string;
  description: string;
};

const Summary = () => {
  const { transactions } = useTransactions();

  const screenWidth = Dimensions.get("window").width;

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const categories = transactions
    .filter((trans) => trans.type === "expense")
    .reduce((acc, t) => {
      const categoryName = `Exp: ${t.category}`;
      acc[categoryName] = (acc[categoryName] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.keys(categories).map((key) => ({
    name: key,
    amount: categories[key],
    color: generateColor(key),
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Summary</Text>

      <View style={styles.summaryCards}>
        <View style={[styles.card, styles.incomeCard]}>
          <FontAwesome5 name="money-bill-wave" size={24} color="green" />
          <Text style={styles.cardText}>Income: ${totalIncome}</Text>
        </View>
        <View style={[styles.card, styles.expenseCard]}>
          <FontAwesome5 name="shopping-cart" size={24} color="red" />
          <Text style={styles.cardText}>Expenses: ${totalExpenses}</Text>
        </View>
      </View>

      {chartData.length > 0 && (
        <View style={styles.chartContainer}>
          <PieChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            chartConfig={{
              color: () => `rgba(0,0,0,1)`,
              labelColor: () => `black`,
            }}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="10"
            absolute
          />
        </View>
      )}

      <View style={styles.legendContainer}>
        {chartData.map((item) => (
          <View key={item.name} style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: item.color }]}
            />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  summaryCards: {
    marginBottom: 20,
    width: "100%",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  incomeCard: {
    backgroundColor: "#cfffd3",
  },
  expenseCard: {
    backgroundColor: "#ffd3da",
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#000",
  },
  chartContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.05)",
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
    color: "#7F7F7F",
  },
});

export default Summary;
