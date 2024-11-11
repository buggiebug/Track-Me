import { View, Text, StyleSheet } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import transactions from "../../assets/data/transaction"
import TransactionOverview from "./TransactionOverview";
import TransactionList from "./TransactionList";


import { getAllExpenses } from "../../redux/slice/expenseSlice";
import { selectExpenseDetails } from "../../redux/reselect/reselectData";

export default TransactionHome = () => {

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const { loadingStatus, loadingModal, expenseData } = useSelector(selectExpenseDetails);


    const onRefresh = () => {
        console.log("Syncing data...");
        setRefreshing(true);
        dispatch(getAllExpenses());
    };

    useEffect(() => {
        if (loadingStatus === "loading" && loadingModal === "getAllExpenses" && !refreshing) {
            onRefresh();
        }
        if (loadingStatus === "succeeded" && loadingModal === "getAllExpenses") {
            setRefreshing(false);
        }
    }, [loadingStatus, loadingModal]);

    const { expensesData, expenseStats } = useMemo(() => {
        if (Array.isArray(expenseData?.expenses) && expenseData?.expenses.length > 0) {
            return {
                expensesData: expenseData.expenses,
                expenseStats: expenseData.stats
            };
        } else {
            return {
                expensesData: transactions,
                expenseStats: {
                    "totalIncome": 1200,
                    "totalExpense": 156.25,
                    "totalBorrowed": 500,
                    "incomePercentage": 88,
                    "expensePercentage": 12,
                    "borrowedPercentage": 0,
                }
            };
        }
    }, [expenseData?.expenses, transactions]);



    return (
        <View style={[styles.container]}>
            
            <View style={styles.header}>
                <Text style={styles.headingText}>Transactions</Text>
            </View>

            {/* Transaction Overview */}
            <View style={styles.transactionOverview}>
                <TransactionOverview expenseStats={expenseStats} />
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
        marginBottom: 10,
    },

    // Transaction List...
    transactionList: {
        height: "85%",
        paddingBottom: 50,
    }
});
