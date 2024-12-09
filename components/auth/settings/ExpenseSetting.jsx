import React, { useEffect, useState } from 'react'
import { Collapsible } from "../../Collapsible";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native';
import Utils from '@/components/utils/utils';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ExpenseSetting = ({ setUpdateData, userExpenseSetting }) => {

    const [expenseType, setExpenseType] = useState({
        income: false,
        expense: false,
        borrowed: false
    });
    const [isFromDatePickerVisible, setFromDatePickerVisibility] = useState(false);
    const [isToDatePickerVisible, setToDatePickerVisibility] = useState(false);
    const [readDateState, setReadDateState] = useState({ fromDate: null, toDate: null });
    const [setDateState, setSetDateState] = useState({ fromDate: null, toDate: null });


    // Set the expense type state...
    const handleExpenseTypeChange = (type) => {
        if (type === "income") setExpenseType({ ...expenseType, income: !expenseType.income });
        if (type === "expense") setExpenseType({ ...expenseType, expense: !expenseType.expense });
        if (type === "borrowed") setExpenseType({ ...expenseType, borrowed: !expenseType.borrowed });
    }

    // Set the date...
    const handleConfirmDate = (type, date) => {
        setFromDatePickerVisibility(false);
        setToDatePickerVisibility(false);
        if (type === "fromDate") {
            setReadDateState({ ...readDateState, fromDate: Utils.getIndiaTime(date) });
            setSetDateState({ ...setDateState, fromDate: date });
        }
        if (type === "toDate") {
            setReadDateState({ ...readDateState, toDate: Utils.getIndiaTime(date) });
            setSetDateState({ ...setDateState, toDate: date });
        }
    }

    // Update the global form...
    useEffect(() => {
        const trueKeys = Object.keys(expenseType).filter(key => expenseType[key]);
        const expenseTrackService = {
            expenseTrackService: {
                transactionType: trueKeys,
                filterDateType: "custom",
                customeDate: setDateState
            }
        }
        setUpdateData(expenseTrackService);
    }, [expenseType, readDateState]);



    // Set the default user setting...
    useEffect(() => {
        if (Object.keys(userExpenseSetting)?.length) {
            const { transactionType, customeDate } = userExpenseSetting;

            const updatedExpenseType = { income: false, expense: false, borrowed: false };
            transactionType?.forEach((type) => {
                if (type === "income") updatedExpenseType.income = true;
                if (type === "expense") updatedExpenseType.expense = true;
                if (type === "borrowed") updatedExpenseType.borrowed = true;
            });
            setExpenseType(updatedExpenseType);
            setReadDateState({ fromDate: Utils.getIndiaTime(customeDate?.fromDate), toDate: Utils.getIndiaTime(customeDate?.toDate) });
            setSetDateState({ fromDate: customeDate?.fromDate, toDate: customeDate?.toDate });
        }
    }, [userExpenseSetting]);


    return (
        <Collapsible title="Expense Track Service" >
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <View style={styles.transaction}>
                        <Text style={styles.boxTitle}>Transaction Type</Text>
                        <View style={styles.transactionType}>
                            <View style={styles.expenseType}>
                                <Text>Income</Text>
                                <Switch
                                    value={expenseType.income}
                                    onValueChange={(value) => handleExpenseTypeChange('income', value)}
                                />
                            </View>
                            <View style={styles.expenseType}>
                                <Text>Expense</Text>
                                <Switch
                                    value={expenseType.expense}
                                    onValueChange={(value) => handleExpenseTypeChange('expense', value)}
                                />
                            </View>
                            <View style={styles.expenseType}>
                                <Text>Borrowed</Text>
                                <Switch
                                    value={expenseType.borrowed}
                                    onValueChange={(value) => handleExpenseTypeChange('borrowed', value)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.boxContainer}>
                    <View style={styles.customDate}>
                        <Text style={styles.boxTitle}>Get Data Date</Text>

                        {/* FromDate... */}
                        <View style={styles.dateContainer}>
                            <Text style={styles.label}>From Date</Text>
                            <TouchableOpacity onPress={() => setFromDatePickerVisibility(true)}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="YYYY-MM-DD HH:MM"
                                    value={readDateState.fromDate}
                                    keyboardType="default"
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isFromDatePickerVisible}
                                mode="datetime"
                                onConfirm={(date) => { handleConfirmDate('fromDate', date) }}
                                onCancel={() => { setFromDatePickerVisibility(false) }}
                            />
                        </View>

                        {/* Todate... */}
                        <View style={styles.dateContainer}>
                            <Text style={styles.label}>To Date</Text>
                            <TouchableOpacity onPress={() => setToDatePickerVisibility(true)}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="YYYY-MM-DD HH:MM"
                                    value={readDateState.toDate}
                                    keyboardType="default"
                                    editable={false}
                                />
                            </TouchableOpacity>
                            <DateTimePickerModal
                                isVisible={isToDatePickerVisible}
                                mode="datetime"
                                onConfirm={(date) => { handleConfirmDate('toDate', date) }}
                                onCancel={() => { setToDatePickerVisibility(false) }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </Collapsible>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f8f9fa",
        borderRadius: 10,
        elevation: 10,
    },

    boxContainer: {
        paddingLeft: 8,
        marginTop: 8,

    },

    transaction: {
        marginVertical: 8,
    },

    boxTitle: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 8,
    },

    transactionType: {
        gap: 10,
    },

    expenseType: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: -10,
    },

    customDate: {},

    dateContainer: {
        gap: 0,
    },
});

export default ExpenseSetting;