import { useRouter } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import AppButton from "../../components/AppButton";
import { auth } from "../../firebaseConfig";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (error) {
      Alert.alert("Invalid login");
    }
  }
  const forgotPassword = async () => {
    if (!email) {
      alert("Enter email first");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent");
    } catch (err) {
      alert("Error sending email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Login</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999"
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
      />

      <AppButton title="Login" onPress={handleLogin} />
      <Text
        style={{
          marginTop: 15,
          color: "#E53935",
          textAlign: "center"
        }}
        onPress={forgotPassword}
      >
        Forgot Password?
      </Text>
      <AppButton
        title="Create Account"
        onPress={() => router.push("../register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
  borderWidth: 1,
  padding: 12,
  marginBottom:10,
  borderRadius: 10,
  backgroundColor: "white",
  color: "black" // ⭐ VERY IMPORTANT
},
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold"
  }
});