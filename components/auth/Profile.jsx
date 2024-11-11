import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../redux/slice/authSlice";
import GetImage from "../utils/GetImage";
import { selectUserDetails } from "../../redux/reselect/reselectData";
import { HelloWave } from "../animated/HelloWave";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ProfileScreen = () => {
    const dispatch = useDispatch();
    const { loadingStatus, userData } = useSelector(selectUserDetails);

    const [userToken, setUserToken] = useState("");
    
    const handleSubmit = async() => {
        try {
            if (userToken) {
                // Save URL to AsyncStorage
                await AsyncStorage.setItem('userToken', userToken);
                console.log('User Token saved:', userToken);
                setUserToken('');
                alert("User Token saved");
            } else {
                // Retrieve URL from AsyncStorage
                const savedToken = await AsyncStorage.getItem('userToken');
                if (savedToken) {
                    console.log('Retrieved User Token:', savedToken);
                    setUserToken(savedToken);
                }
            }
        } catch (error) {
            console.error('Error accessing AsyncStorage', error);
        }
    }

    useEffect(() => {
        const token = userToken || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzIwNDQ4ZmUyN2Q5NGRhOWQ3NGM2OSIsImlhdCI6MTczMTMzMTE0NH0.NYx4HYI8KMfo3_hqAKpQJcoVZrLpb_eZFj-mf_IBt0w";
        dispatch(getUser(token));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>
                Profile
            </Text>

            <HelloWave />

            <Text style={styles.loadingStatus}>{loadingStatus}</Text>

            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    {GetImage("user", styles.avatar)}
                    <Text style={styles.name}>{userData.name}</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.label}>Mobile:</Text>
                        <Text style={styles.value}>{userData.mobile}</Text>
                    </View>

                    <View style={styles.detailItem}>
                        <Text style={styles.label}>Joined:</Text>
                        <Text style={styles.value}>{new Date(userData.createdAt).toLocaleDateString('en-US')}</Text>
                    </View>

                </View>

            </View>
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="URL"
                    value={userToken}
                    keyboardType="twitter"
                    onChangeText={(value) => setUserToken(value)}
                />
                <Button title="Save" onPress={() => handleSubmit()} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B192C',
        alignItems: 'center',
        padding: 20,
    },

    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },

    loadingStatus: {
        fontSize: 18,
        color: '#42a5f5',
        marginBottom: 20,
    },

    header: {
        alignItems: 'center',
        marginBottom: 30,
        backgroundColor: '#1C2A3A',
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderColor: '#42a5f5',
        borderWidth: 2,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },

    detailsContainer: {
        backgroundColor: '#1C2A3A',
        borderRadius: 10,
        padding: 20,
        width: '100%',
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    label: {
        fontSize: 18,
        color: '#8e8e8e',
        fontWeight: '500',
        marginRight: 10,
    },
    value: {
        fontSize: 18,
        color: '#fff',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 5,
        marginBottom: 12,
        width: "100vw",
    }
});