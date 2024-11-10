import { TouchableOpacity, FlatList, StyleSheet, Text, View, RefreshControl } from "react-native";
import Icons from "../utils/Icons";
import Utils from "../utils/utils";
import GetImage from "../utils/GetImage";

export default function TransactionList({ data, refreshing, onRefresh }) {

  return (
    <FlatList
      data={data}
      renderItem={renderTransaction}
      key={data.id + 1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const openTransaction = (item) => {
  alert(JSON.stringify(item));
}

const renderTransaction = ({ item }) => (
  <TouchableOpacity onPress={() => { openTransaction(item); }}>
    <View style={styles.container}>
      <View style={styles.box}>

        <View style={styles.imageContainer}>
          {GetImage(String(item.payUsing || item.lenderName).toLowerCase().split(" ").join(""), styles.bankLogo)}
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.transactionDetails}>{item.description}</Text>
          <Text style={styles.transactionDate}>{Utils.getIndiaTime(item.transactionDate)}</Text>
          <Text style={[styles.payUsing]}>{item.payUsing || item.lenderName}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[styles.amount, item.amount < 0 ? styles.expense : styles.income, item?.borrowed && styles.borrowedText]}>
            {Icons('rupee', styles.icon)} {item.amount}
          </Text>
        </View>

      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({

  // ................ Conatiner ................
  container: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
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
    width: '100%',
    height: '100%',
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
    fontWeight: 'bold',
    color: '#333',
  },

  transactionDate: {
    fontSize: 12,
    color: "#888",
  },

  payUsing: {
    fontSize: 12,
    color: '#555',
    fontStyle: 'italic',
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
    color: '#333',
  },

  expense: {
    color: 'red',
  },

  income: {
    color: 'green',
  },

  borrowedText: {
    color: 'orange',
  },
});

