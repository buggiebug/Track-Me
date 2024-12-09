import { useEffect } from "react";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logoutUser } from "../../redux/slice/authSlice";
import GetImage from "../utils/GetImage";
import { selectUserDetails } from "../../redux/reselect/reselectData";
import { HelloWave } from "../animated/HelloWave";
import Notify from "../utils/Notify";
import UserSetting from "./settings/UserSettings";

export default ProfileScreen = () => {
  const dispatch = useDispatch();
  const { loadingStatus, loadingModal, userData } = useSelector(selectUserDetails);

  const handleSubmit = async () => {
    try {
      dispatch(logoutUser());
      Notify("Logged Out", 0);
    } catch (error) {
      console.error("Error Logout User:", error);
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headingText}>Profile</Text>

        <HelloWave />

        <Text style={styles.loadingStatus}>{loadingStatus}</Text>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <View style={styles.header}>
            {userData?.gender === "male" ? (
              GetImage("male", styles.avatar)
            ) :
              userData?.gender === "female" ? (
                GetImage("female", styles.avatar)
              ) :
                GetImage("othergender", styles.avatar)
            }
            <Text style={styles.name}>{userData?.name || "User"}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{userData?.mobile || "9120226043"}</Text>
            </View>

            <View style={styles.detailItem}>
              <Text style={styles.label}>Joined:</Text>
              <Text style={styles.value}>
                {new Date(userData?.createdAt || Date.now()).toLocaleDateString("en-US")}
              </Text>
            </View>
          </View>
        </View>
        <View style={{margin:20}}>
          <Button title="Logout" onPress={() => handleSubmit()} />
        </View>

        {/* User Setting      */}
        <View style={{ marginTop: 20, width: "100%" }}>
          <UserSetting userData={userData}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B192C",
    alignItems: "center",
    padding: 20,
  },

  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },

  loadingStatus: {
    fontSize: 18,
    color: "#42a5f5",
    marginBottom: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#1C2A3A",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderColor: "#42a5f5",
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  detailsContainer: {
    backgroundColor: "#1C2A3A",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    color: "#8e8e8e",
    fontWeight: "500",
    marginRight: 10,
  },
  value: {
    fontSize: 18,
    color: "#fff",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
    width: "100vw",
  },
});
