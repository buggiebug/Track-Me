import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from "react-native";
import Utils from "../utils/utils";
import GetImage from "../utils/GetImage";
import { CustomModal } from "../layout/CustomModal";
import { useState } from "react";
import { FontAwesomeIcons } from "../utils/Icons";
import { Button } from "react-native";
import { useRouter } from "expo-router";

export default function TransactionList({ data, refreshing, onRefresh }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState({});
  const openTransaction = (item) => {
    setModalVisible(true);
    setContent(item);
  };

  const router = useRouter();

  const handlePayBorrowedBill = async (bill) => {
    if (Object.keys(bill).length) {
      setModalVisible(false);
      router.push({ pathname: "/transaction/add-transaction", params: { bill: JSON.stringify(bill) } });
    }
  }

  // ................ Render Transaction ................
  const renderTransaction = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        openTransaction(item);
      }}
    >
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.imageContainer}>
            {GetImage(
              String(item.payUsing || item.lenderName)
                .toLowerCase()
                .split(" ")
                .join(""),
              styles.bankLogo
            )}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.transactionDetails}>{item.description}</Text>
            <Text style={styles.transactionDate}>
              {Utils.getIndiaTime(item.transactionDate)}
            </Text>
            <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Text style={[styles.payUsing]}>
                {item.lenderName && "Borrow from "}{item.payUsing || item.lenderName}
              </Text>
              <Text style={[styles.payUsing, {}]}>
                {item.borrowed && item.totalBorrowedAmount ? `Total: ${item.totalBorrowedAmount}` : ""}
              </Text>
            </View>
          </View>

          <View style={styles.amountContainer}>
            <Text
              style={[
                styles.amount,
                item.amount < 0 ? styles.expense : styles.income,
                (item?.borrowed && Number(item.amount) > 0) && styles.borrowedText,
              ]}
            >
              <FontAwesomeIcons name="rupee" /> {item.amount}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // ................ Render ................
  return (
    <>
      {/* ................ Modal ............... */}
      <CustomModal
        title={"Transaction Details"}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <View>
          <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", gap: 20 }]}>
            <View style={styles.imageContainer}>
              {GetImage(
                String(content.payUsing || content.lenderName)
                  .toLowerCase()
                  .split(" ")
                  .join(""),
                styles.bankLogo
              )}
            </View>
            <Text style={styles.title}>
              {content.payUsing || content.lenderName}
            </Text>
          </View>
          <Text>Transaction Type : {content.transactionType}</Text>
          <Text>Description: {content.description}</Text>
          {content.notes && <Text>Notes: {content.notes}</Text>}
          {content.recurring && <Text>Recurring: Yes</Text>}
          {content.borrowed && (
            <>
              <Text>Borrowed: {content.borrowed ? "Yes" : "No"}</Text>
              <Text>Borrow For: {content.borrowedType}</Text>
              <Text>Lender Name: {content.lenderName}</Text>
              <Text>Settled: {content.isSettled ? "Yes" : "No"}</Text>
              <Text>Total Borrowed: {content.totalBorrowedAmount}</Text>
              <Text>Last Paid: {content.lastPaidAmount}</Text>
              <Text>Remaining Amount: {content.amount}</Text>
            </>
          )}
          {!content.borrowed && <Text>Amount: {content.amount}</Text>}
          <Text>Status: {content.status}</Text>
          <Text>Transaction Date: {Utils.getIndiaTime(content.transactionDate)}</Text>

          {
            content.borrowed && !content.isSettled && (
              <View style={{ marginVertical: 40 }}>
                <Button title="Pay Bill" onPress={() => { handlePayBorrowedBill(content) }} color={"green"} />
              </View>
            )
          }
        </View>
      </CustomModal>

      {/* ................ FlatList ............... */}
      <FlatList
        data={data}
        renderItem={renderTransaction}
        keyExtractor={(item, idx) => `${item.id}-${idx}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>No transactions found.</Text>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // ................ Container ................
  container: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  box: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // ................ Section 1 ................
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#d9e2ec",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dotted",
  },

  bankLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  // ................ Section 2 ................
  // Transaction Details...
  detailsContainer: {
    flex: 2,
    paddingLeft: 10,
  },

  transactionDetails: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  transactionDate: {
    fontSize: 12,
    color: "#888",
  },

  payUsing: {
    fontSize: 12,
    color: "#555",
    fontStyle: "italic",
  },

  // ................ Section 3 ................
  // Amount...
  amountContainer: {
    alignItems: "flex-end",
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  icon: {
    marginRight: 5,
    color: "#333",
  },

  expense: {
    color: "red",
  },

  income: {
    color: "green",
  },

  borrowedText: {
    color: "orange",
  },

  emptyListText: {
    color: "yellow",
  }
});
