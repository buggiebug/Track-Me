import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, TextInput, Button, Switch, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import Utils from '../utils/utils';
import TransactionValidate from './validation/payload';
import Notify from "@/components/utils/Notify";
import { selectExpenseDetails } from "../../redux/reselect/reselectData";
import { clearState, createExpense, getAllExpenses } from '../../redux/slice/expenseSlice';

export default AddTransaction = () => {

    const { bill } = useLocalSearchParams();
    const router = useRouter();

    const { loadingStatus, loadingModal } = useSelector(selectExpenseDetails);

    // Dynamic form
    const dynamicFor = "Borrowed";

    const dispatch = useDispatch();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [readDateState, setReadDateState] = useState('');
    const [oldBillData, setOldBillData] = useState({});

    const formInitialState = {
        description: '',
        amount: '',
        transactionType: 'Expense',
        isSettled: false,
        oldBillId: '',
        lenderName: "",
        borrowedType: "Self",
        discount: '',
        cashback: '',
        payUsing: '',
        category: '',
        recurring: false,
        location: '',
        notes: '',
        upiId: '',
        accountNumber: '',
        status: 'Completed',
        transactionDate: '',
    }
    const [formData, setFormData] = useState({ ...formInitialState });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleConfirmDate = (date) => {
        handleInputChange('transactionDate', String(date));
        setReadDateState(Utils.getIndiaTime(date));
        setDatePickerVisibility(false)
    }

    const handleClearForm = () => {
        setFormData({ ...formInitialState });
        setReadDateState("");
        router.setParams({bill:""});
        setOldBillData({ ...formInitialState });
    }

    const submitForm = () => {
        const { errors, data } = TransactionValidate(formData);
        // console.log(errors, data);
        if (errors.length > 0) {
            Notify(errors[0], 1);
        } else {
            dispatch(createExpense({ formData }));
            dispatch(clearState());
            handleClearForm();
        }
    };

    useEffect(() => {
        if(loadingStatus==="succeeded" && loadingModal === "createExpense"){
            dispatch(getAllExpenses());
        }
    },[loadingStatus, loadingModal]);

    useEffect(() => {
        if (!bill) return;
        const billData = JSON.parse(bill);
        setOldBillData(billData);
    }, [bill]);

    useEffect(() => {
        if (oldBillData?._id) {
            setFormData({
                ...formInitialState,
                description: oldBillData?.description,
                amount: String(oldBillData?.amount),
                transactionType: oldBillData?.transactionType,
                isSettled: true,
                oldBillId: oldBillData?._id,
                lenderName: oldBillData?.lenderName,
                borrowedType: oldBillData?.borrowedType,
                payUsing: oldBillData?.payUsing,
                notes: oldBillData?.notes,
                upiId: oldBillData?.upiId,
                accountNumber: oldBillData?.accountNumber,
                recurring: oldBillData?.recurring,
                status: oldBillData?.status,
                transactionDate: '',
            });
            setReadDateState('');
        }
    }, [oldBillData]);

    return (
        <ScrollView style={styles.container}>
            {/* <View>
                <Text style={styles.headingText}>Add Transaction</Text>
            </View> */}

            <View>
                <Text style={styles.label}>Description {!oldBillData?._id && <Text style={styles.important}>*</Text>}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter description"
                    keyboardType="twitter"
                    value={formData.description}
                    onChangeText={(value) => handleInputChange('description', value)}
                    enterKeyHint='Buy a iPhone'
                    readOnly={oldBillData?._id ? true : false}
                />

                <Text style={styles.label}>Amount <Text style={styles.important}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={formData.amount}
                    onChangeText={(value) => handleInputChange('amount', value)}
                />

                <Text style={styles.label}>Transaction Type</Text>
                <Picker
                    selectedValue={formData.transactionType}
                    onValueChange={(value) => handleInputChange('transactionType', value)}
                    style={styles.picker}
                    enabled={oldBillData?._id ? false : true}
                >
                    <Picker.Item label="Expense" value="Expense" />
                    <Picker.Item label="Income" value="Income" />
                    <Picker.Item label="Borrowed" value="Borrowed" />
                </Picker>

                {
                    formData.transactionType === dynamicFor ?
                        <View>

                            {oldBillData?._id &&
                                <>
                                    <Text style={styles.label}>Settlement</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ paddingHorizontal: 10 }}>No</Text>
                                        <Switch
                                            value={formData.isSettled}
                                            onValueChange={(value) => handleInputChange('isSettled', value)}
                                            trackColor={{ true: '#5DA271', false: 'grey' }}
                                            thumbColor={formData.isSettled ? '#5DA271' : 'grey'}
                                            disabled={oldBillData?._id ? true : false}
                                        />
                                        <Text style={{ paddingHorizontal: 10 }}>Yes</Text>
                                    </View>
                                </>
                            }


                            <Text style={styles.label}>Lender Name {!oldBillData?._id && <Text style={styles.important}>*</Text>}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Lender Name"
                                keyboardType="twitter"
                                value={formData.lenderName}
                                onChangeText={(value) => handleInputChange('lenderName', value)}
                                readOnly={oldBillData?._id ? true : false}
                            />

                            <Text style={styles.label}>Borrowed For</Text>
                            <Picker
                                selectedValue={formData.borrowedType}
                                onValueChange={(value) => handleInputChange('borrowedType', value)}
                                style={styles.picker}
                                enabled={oldBillData?._id ? false : true}
                            >
                                <Picker.Item label="Self" value="Self" />
                                <Picker.Item label="Friend" value="Friend" />
                                <Picker.Item label="Family" value="Family" />
                                <Picker.Item label="Others" value="Others" />
                            </Picker>

                        </View>
                        :
                        <View>
                            <Text style={styles.label}>Discount</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter discount amount"
                                keyboardType="numeric"
                                value={formData.discount}
                                onChangeText={(value) => handleInputChange('discount', value)}
                            />

                            <Text style={styles.label}>Cashback</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter cashback amount"
                                keyboardType="numeric"
                                value={formData.cashback}
                                onChangeText={(value) => handleInputChange('cashback', value)}
                            />
                        </View>
                }

                {
                    (formData.transactionType !== dynamicFor || formData.isSettled) &&
                    <View>
                        <Text style={styles.label}>Pay Using <Text style={styles.important}>*</Text></Text>
                        <Picker
                            selectedValue={formData.payUsing}
                            onValueChange={(value) => handleInputChange('payUsing', value)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select payment method" value="" />
                            <Picker.Item label="Cash" value="Cash" />
                            <Picker.Item label="Paytm" value="Paytm" />
                            <Picker.Item label="GooglePay" value="GooglePay" />
                            <Picker.Item label="IMPS" value="IMPS" />
                            <Picker.Item label="UPI" value="UPI" />
                            <Picker.Item label="PayPal" value="PayPal" />
                            <Picker.Item label="AmazonPay" value="AmazonPay" />
                            <Picker.Item label="PhonePe" value="PhonePe" />
                            <Picker.Item label="Credit Card" value="Credit Card" />
                            <Picker.Item label="Debit Card" value="Debit Card" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View>
                }

                {
                    formData.transactionType !== dynamicFor &&
                    <View>
                        <Text style={styles.label}>Category <Text style={styles.important}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter category"
                            value={formData.category}
                            onChangeText={(value) => handleInputChange('category', value)}
                        />

                        <Text style={styles.label}>Recurring</Text>
                        <Switch
                            value={formData.recurring}
                            onValueChange={(value) => handleInputChange('recurring', value)}
                        />
                    </View>
                }


                {/* <Text style={styles.label}>Location</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter location"
                    value={formData.location}
                    onChangeText={(value) => handleInputChange('location', value)}
                /> */}

                {
                    !oldBillData?._id &&
                    <>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Additional notes"
                            value={formData.notes}
                            onChangeText={(value) => handleInputChange('notes', value)}
                        />

                        <Text style={styles.label}>UPI ID</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter UPI ID"
                            value={formData.upiId}
                            onChangeText={(value) => handleInputChange('upiId', value)}
                        />

                        <Text style={styles.label}>Account Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter account number"
                            keyboardType="numeric"
                            value={formData.accountNumber}
                            onChangeText={(value) => handleInputChange('accountNumber', value)}
                        />
                    </>
                }

                <Text style={styles.label}>Status</Text>
                <Picker
                    selectedValue={formData.status}
                    onValueChange={(value) => handleInputChange('status', value)}
                    style={styles.picker}
                >
                    <Picker.Item label="Completed" value="Completed" />
                    <Picker.Item label="Pending" value="Pending" />
                    <Picker.Item label="Failed" value="Failed" />
                </Picker>

                <Text style={styles.label}>Date <Text style={styles.important}>*</Text></Text>
                <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                    <TextInput
                        style={styles.input}
                        placeholder="YYYY-MM-DD HH:MM"
                        value={readDateState}
                        keyboardType="default"
                        editable={false}
                    />
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={(date) => { handleConfirmDate(date) }}
                    onCancel={() => { setDatePickerVisibility(false) }}
                />

            </View>

            <View style={styles.submitButton} >
                <Button
                    onPress={submitForm}
                    title={loadingStatus === "loading" && loadingModal === "createExpense" ? "Please wait..." : "Submit"}
                    disabled={loadingStatus === "loading" && loadingModal === "createExpense" ? true : false}
                />
                <TouchableOpacity style={styles.resetButton} onPress={handleClearForm}>
                    <Text>Reset</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        height: "100%",
    },

    headingText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },

    formContainer: {
        paddingHorizontal: 20,
        height: "82%",
        backgroundColor: "#fff",
    },

    important: {
        fontSize: 14,
        fontWeight: 'thin',
        color: "red",
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 8,

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
    },

    picker: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        padding: 8
    },

    submitButton: {
        marginTop: 10,
        marginBottom: 50,
    },

    resetButton: {
        backgroundColor: "#f8f9fa",
        borderColor: "black",
        borderWidth: 1,

        alignItems: "center",
        padding: 10,
        marginTop: 10,
        marginBottom: 40,
    }
});

