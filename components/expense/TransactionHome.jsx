import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import transactions from "../../assets/data/transaction"
import TransactionOverview from "./TransactionOverview";
import TransactionList from "./TransactionList";


import { getAllExpenses } from "../../redux/slice/expenseSlice";
import { selectExpenseDetails } from "../../redux/reselect/reselectData";
import { Picker } from "@react-native-picker/picker";
import Notify from "../utils/Notify";
import { getUser } from "@/redux/slice/authSlice";

export default TransactionHome = () => {

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const { loadingStatus, loadingModal, expenseData } = useSelector(selectExpenseDetails);

    const [filterTransactionState, setFilterTransactionState] = useState("all");

    const onRefresh = () => {
        console.log("Syncing data...");
        setRefreshing(true);
        dispatch(getAllExpenses());
        Notify("Syncing data...", 0);
    };

    useEffect(() => {
        if (loadingStatus === "loading" && loadingModal === "getAllExpenses" && !refreshing) {
            onRefresh();
        }
        if (loadingStatus === "succeeded" && loadingModal === "getAllExpenses") {
            setRefreshing(false);
        }

        dispatch(getUser());
    }, [loadingStatus, loadingModal]);

    const { expensesData, expenseStats } = useMemo(() => {
        const data = {
            expensesData: transactions || [],
            expenseStats: {
                "netBalance": 0,
                "totalIncome": 0,
                "totalExpense": 0,
                "totalBorrowed": 0,
                "incomePercentage": "0",
                "expensePercentage": "0",
                "borrowedPercentage": "0"
            }
        };

        if (Array.isArray(expenseData?.expenses) && expenseData?.expenses.length > 0) {
            const filterType = filterTransactionState.toLowerCase();
            if (filterType === "all") {
                data.expensesData = expenseData.expenses;
                data.expenseStats = expenseData.stats
            } else if (filterType === "expense") {
                data.expensesData = expenseData.expenses.filter(expense => expense.transactionType === "Expense");
                data.expenseStats = expenseData.stats
            } else if (filterType === "income") {
                data.expensesData = expenseData.expenses.filter(expense => expense.transactionType === "Income");
                data.expenseStats = expenseData.stats
            } else if (filterType === "borrowed") {
                data.expensesData = expenseData.expenses.filter(expense => expense.transactionType === "Borrowed");
                data.expenseStats = expenseData.stats
            }
        }

        return data;
    }, [expenseData?.expenses, transactions, filterTransactionState]);

    return (
        <View style={[styles.container]}>

            <View style={styles.header}>
                <Text style={styles.headingText}>Transactions</Text>
            </View>

            {/* Transaction Overview */}
            <View style={styles.transactionOverview}>
                <TransactionOverview expenseStats={expenseStats} />
            </View>

            <View style={styles.transactionFilter}>
                <Text style={styles.filterLabel}>Filter</Text>
                <View style={styles.transactionFilterText}>
                    <Picker
                        selectedValue={filterTransactionState}
                        onValueChange={(value) => setFilterTransactionState(value)}
                        style={styles.picker}
                    >
                        <Picker.Item label="All" value="All" />
                        <Picker.Item label="Expense" value="Expense" />
                        <Picker.Item label="Income" value="Income" />
                        <Picker.Item label="Borrowed" value="Borrowed" />
                    </Picker>
                </View>
            </View>

            {/* Transaction List */}
            <View style={styles.transactionList}>
                <TransactionList data={expensesData} refreshing={refreshing} onRefresh={onRefresh} />
            </View>
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        backgroundColor: "#0B192C",
        height: "100%",
    },

    header: {
        marginBottom: 10,
    },

    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
        marginTop: 10,
    },

    // Transaction Overview...
    transactionOverview: {
        height: "15%",
        marginBottom: 5,
    },

    transactionFilter: {
        height: "5%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1C2A3A",
        justifyContent: "space-between",
        overflow: "hidden",
        marginBottom: 5,
    },
    transactionFilterText: {
        flexDirection: "row",
        alignItems: "center",
    },
    filterLabel: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    filterText: {
        color: "#fff",
        fontSize: 16,
    },
    picker: {
        width: 150,
        color: "#fff",
        backgroundColor: "#2B3D4F",
        borderRadius: 8,
    },

    // Transaction List...
    transactionList: {
        height: "80%",
        paddingBottom: 55,
    }
});
