import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import ProfileSetting from "./ProfileSetting";
import ExpenseSetting from "./ExpenseSetting";
import { Button } from 'react-native';
import Utils from '@/components/utils/utils';
import Notify from '@/components/utils/Notify';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/redux/slice/authSlice';

const UserSettings = ({ userData }) => {

    const dispatch = useDispatch()

    const [updateData, setUpdateData] = useState(null);
    const [enableUpdate, setEnableUpdate] = useState(false);
    const updateUserSettings = () => {
        if (updateData?.customDate) {
            if (updateData?.customDate?.fromDate && !updateData?.customDate.toDate) return Notify("To Date required", 0);
            if (updateData?.customDate?.toDate && !updateData?.customDate.fromDate) return Notify("From Date required", 0);
        }

        const settings = {
            settings: updateData,
        }
        // console.log(JSON.stringify(settings));
        dispatch(updateUser(settings));
    };

    useEffect(() => {
        const expenseTrackService = userData?.settings?.expenseTrackService;
        if (expenseTrackService) {
            const isMatch = Utils.compareObject(expenseTrackService, updateData?.expenseTrackService);
            if (isMatch) {
                setEnableUpdate(false)
            } else {
                setEnableUpdate(true)
            }
        }
    }, [updateData]);

    const resetSettings = () => {
        setUpdateData(null)
    }

    return (
        <>
            <View style={styles.container}>
                <View><Text style={styles.headingText}>Settings</Text></View>

                <View style={styles.containerBox}>
                    <ProfileSetting />
                    <ExpenseSetting setUpdateData={setUpdateData} userExpenseSetting={userData?.settings?.expenseTrackService || 0} />
                </View>

                {
                    enableUpdate && updateData !== null && (
                        <View style={{ marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 5 }}>
                            {/* <View style={{ width: "40%" }}>
                                <Button title='Reset' color={"red"} onPress={resetSettings} />
                            </View> */}
                            <View style={{ width: "50%" }}>
                                <Button title='Update' onPress={updateUserSettings} />
                            </View>
                        </View>
                    )
                }
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 10,
    },

    headingText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },

    containerBox: {
        gap: 10,
    }
})


export default UserSettings;