import { selectUserDetails } from '@/redux/reselect/reselectData';
import { loginUser } from '@/redux/slice/authSlice';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const BASE_URL = "https://gprglhk7-4000.inc1.devtunnels.ms";

export default Login = () => {

  const dispatch = useDispatch();
  const { loadingStatus, loadingModal } = useSelector(selectUserDetails);

  const [loginDataState, setLoginDataState] = useState({ mobile: "9120226043", password: "12345678" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const submitLogin = async () => {
    try {
      dispatch(loginUser(loginDataState));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.heading}>
        <Text style={styles.headingText}>Login</Text>
      </View>

      <View style={styles.inputBox}>
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
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => setLoginDataState({ mobile: "", password: "" })}
          disabled={!(loginDataState.mobile || loginDataState.password) ? true : false}
          style={[styles.button, { backgroundColor: !(loginDataState.mobile || loginDataState.password) ? '#686D76' : '#FF6347' }]}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={submitLogin}
          style={[
            styles.button,
            { backgroundColor: loginDataState.mobile.length < 10 || loginDataState.password?.length < 8 ? '#686D76' : '#4CAF50' } // Green color for Submit
          ]}
          disabled={loginDataState.mobile.length < 10 || !loginDataState.password}
        >
        <Text style={styles.buttonText} disabled={loadingStatus === "loading" && loadingModal === "login" ? true : false }>
          {loadingStatus === "loading" && loadingModal === "login" ? "Loading..." : "Submit"}
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
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
  },
})
