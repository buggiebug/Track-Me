import { selectUserDetails } from '@/redux/reselect/reselectData';
import { signupUser } from '@/redux/slice/authSlice';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from "@react-native-picker/picker";

export default function Signup({ handleToggle }) {

    const dispatch = useDispatch();
    const { loadingStatus, loadingModal } = useSelector(selectUserDetails);

    const [loginDataState, setLoginDataState] = useState({ name: "", mobile: "", gender: "Male", password: "" });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const submitLogin = async () => {
        try {
            dispatch(signupUser(loginDataState));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.heading}>
                <Text style={styles.headingText}>Signup</Text>
            </View>

            <View style={styles.inputBox}>
                <View>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        editable
                        keyboardType='twitter'
                        numberOfLines={1}
                        placeholder='Shubham Mishra'
                        onChangeText={text => setLoginDataState({ ...loginDataState, name: text })}
                        value={loginDataState.name}
                        style={styles.input}
                        autoComplete='off'
                    />
                </View>
                <View>
                    <View style={styles.transactionFilter}>
                        <Text style={styles.filterLabel}>Gender</Text>
                        <View style={styles.transactionFilterText}>
                            <Picker
                                selectedValue={loginDataState?.gender}
                                onValueChange={(value) => setLoginDataState({ ...loginDataState, gender: value })}
                                style={styles.picker}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.inputText}>Mobile Number</Text>
                    <TextInput
                        editable
                        keyboardType='number-pad'
                        numberOfLines={1}
                        maxLength={10}
                        placeholder='9120226043'
                        onChangeText={text => setLoginDataState({ ...loginDataState, mobile: text })}
                        value={loginDataState.mobile}
                        style={styles.input}
                        autoComplete='off'
                    />
                </View>
                <View>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        editable
                        secureTextEntry={!isPasswordVisible}
                        placeholder='********'
                        numberOfLines={1}
                        maxLength={10}
                        onChangeText={text => setLoginDataState({ ...loginDataState, password: text })}
                        value={loginDataState.password}
                        style={[styles.input]}
                    />
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.toggleButton}
                    >
                        <Text style={styles.toggleText}>
                            {isPasswordVisible ? "Hide" : "Show"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.login}>
                    <Text style={[styles.button, styles.loginButton]} onPress={() => { handleToggle("login") }}>Login</Text>
                </View>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    onPress={() => setLoginDataState({ mobile: "", password: "" })}
                    disabled={(!(loginDataState.mobile || loginDataState.password) || (loadingStatus === "loading" && loadingModal === "signup")) ? true : false}
                    style={[styles.button, { backgroundColor: (!(loginDataState.mobile || loginDataState.password) || (loadingStatus === "loading" && loadingModal === "signup"))  ? '#686D76' : '#FF6347' }]}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={submitLogin}
                    style={[
                        styles.button,
                        { backgroundColor: loginDataState.mobile.length < 10 || loginDataState.password?.length < 8 ? '#686D76' : '#4CAF50' }, // Green color for Submit
                        loadingStatus === "loading" && loadingModal === "signup" && { backgroundColor: "#686D76" }
                    ]}
                    disabled={loginDataState.mobile.length < 10 || !loginDataState.password}
                >
                    <Text style={[styles.buttonText]} disabled={loadingStatus === "loading" && loadingModal === "signup" ? true : false}>
                        {loadingStatus === "loading" && loadingModal === "signup" ? "Loading..." : "Signup"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#0B192C",
        justifyContent: "center",
        paddingHorizontal: 10,
    },

    // Heading...
    heading: {
        alignItems: 'center',
        marginVertical: 60,
    },
    headingText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textTransform: "uppercase",
        textDecorationLine: "underline"
    },

    // Input Box...
    inputBox: {
        paddingHorizontal: 10,
    },

    // Input Label...
    inputText: {
        fontSize: 18,
        color: "#fff",
        marginVertical: 10,
    },

    // Inputs...
    input: {
        height: 50,
        borderColor: '#4CAF50',
        borderWidth: 0,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        color: '#333',
    },

    // Toogle hide/show text...
    toggleButton: {
        position: "absolute",
        right: 10,
        bottom: 15,
    },

    toggleText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },

    // Buttons...
    buttons: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 10,
    },
    button: {
        padding: 10,
        borderRadius: 5,
        minWidth: 100,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textDecorationStyle: "dashed",
        textTransform: "uppercase",
    },

    loginButton: {
        color: "#fff",
        textDecorationLine: "underline",
        textAlign: "right",
    },

    transactionFilter: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1C2A3A",
        justifyContent: "space-between",
        overflow: "hidden",
        marginTop: 15,
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
})
