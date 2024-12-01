import { selectUserDetails } from '@/redux/reselect/reselectData';
import { loginUser } from '@/redux/slice/authSlice';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Notify from '../utils/Notify';
import { FontAwesomeIcons } from '../utils/Icons';

export default Login = ({handleToggle}) => {

  const dispatch = useDispatch();
  const { loadingStatus, loadingModal, isLoggedInUser } = useSelector(selectUserDetails);

  const [loginDataState, setLoginDataState] = useState({ mobile: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const submitLogin = async () => {
    try {
      // console.log("isLoggedInUser >>>>", isLoggedInUser);
      if(loginDataState.mobile.length !== 10) throw "Mobile number must be 10 digits long";
      if (isNaN(loginDataState.mobile)) throw "Enter a valid mobile number";
      const firstDigit = loginDataState.mobile[0];
      if (!(firstDigit === '9' || firstDigit === '7' || firstDigit === '8' || firstDigit === '6')) throw "Enter a valid mobile number";

      if(loginDataState.password.length < 8) throw "Password must be 8 characters long";

      dispatch(loginUser(loginDataState));
    } catch (error) {
      Notify(error, 0);
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
            placeholder='Enter your mobile number'
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
            placeholder="Enter your password"
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
              {isPasswordVisible ? <FontAwesomeIcons name="eye-slash" /> : <FontAwesomeIcons name="eye" />}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signup}>
          <Text style={[styles.button, styles.signupButton]} onPress={()=>{handleToggle("signup")}}>Signup</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={submitLogin}
          style={[
            styles.button,
            { backgroundColor: loginDataState.mobile.length < 10 || loginDataState.password?.length < 8 ? '#686D76' : '#4CAF50' }, // Green color for Submit
            loadingStatus === "loading" && loadingModal === "login" && { backgroundColor: "#686D76" }
          ]}
          disabled={loginDataState.mobile.length < 10 || !loginDataState.password}
        >
          <Text style={[styles.buttonText]} disabled={loadingStatus === "loading" && loadingModal === "login" ? true : false}>
            {loadingStatus === "loading" && loadingModal === "login" ? "Loading..." : "Login"}
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
    color: '#ccc',
    fontWeight: '500',
  },

  // Buttons...
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
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

  signupButton: {
    color: "#fff",
    textDecorationLine: "underline",
    textAlign: "right",
  }
})
