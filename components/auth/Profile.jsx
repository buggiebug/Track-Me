import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "../../redux/slice/authSlice";
import GetImage from "../utils/GetImage";
import { selectUserDetails } from "../../redux/reselect/reselectData";
import { HelloWave } from "../animated/HelloWave";

export default ProfileScreen = () => {
    const dispatch = useDispatch();
    const { loadingStatus, userData } = useSelector(selectUserDetails);

    useEffect(() => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjY5OTZkZDljNjI4ZDRhNjZkMDhmNyIsImlhdCI6MTczMDYzMjU2Mn0.o2seyNx5ZTlBnqMC1FMWwhBr78VjeYgapka47XYDGmc";
        dispatch(getUser(token));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>
                Profile
            </Text>

            <HelloWave/>

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

});