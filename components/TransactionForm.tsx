// components/TransactionForm.tsx
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import DatePicker from "react-native-date-picker";
import TransactionsTypeTabs from "./TransactionsTypeTabs";
import { useTransactions } from "../context/TransactionsContext";

const TransactionForm = ({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (value: boolean) => void;
}) => {
  const [type, setType] = useState<"income" | "expense">("income");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const { addNewTransaction } = useTransactions();

  const handlePress = async () => {
    if (!amount || !category || !description) {
      alert("Please fill in all fields.");
      return;
    }

    const newTransaction = {
      type,
      amount: parseFloat(amount),
      category,
      date,
      description,
    };

    await addNewTransaction(newTransaction);

    // Reset form fields
    setType("income");
    setAmount("");
    setCategory("");
    setDate(new Date());
    setDescription("");
    setVisible(false);
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add Transaction</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <AntDesign name="closecircleo" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <TransactionsTypeTabs
            type={type}
            setType={setType}
            height={40}
            padding={5}
          />

          <View>
            <Text style={styles.label}>Amount:</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter amount"
            />
          </View>

          <View>
            <Text style={styles.label}>Category:</Text>
            <TextInput
              style={styles.input}
              value={category}
              onChangeText={setCategory}
              placeholder="Enter category"
            />
          </View>

          <View>
            <Text style={styles.label}>Date:</Text>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <View style={styles.dateInput}>
                <Text>{date.toLocaleDateString()}</Text>
              </View>
            </TouchableOpacity>
            <DatePicker
              modal
              open={openDatePicker}
              date={date}
              mode="date"
              onConfirm={(selectedDate) => {
                setOpenDatePicker(false);
                setDate(selectedDate);
              }}
              onCancel={() => {
                setOpenDatePicker(false);
              }}
            />
          </View>

          <View>
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter description"
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handlePress}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionForm;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
  label: {
    marginBottom: 6,
    fontSize: 12,
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 4,
    height: 35,
    justifyContent: "center",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f00044",
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
