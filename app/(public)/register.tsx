import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, View,Text } from "react-native";
import { auth } from "../../firebaseConfig";
import { inputStyles } from "../../styles/inputStyles";

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Account created");
      router.replace("/dashboard");
    } catch (e:any) {
      Alert.alert(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manager Registration</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <AppButton title="Register" onPress={register} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", padding:20 },
  input:{ marginBottom:15, ...inputStyles.input },
  title:{fontSize: 22,marginBottom: 20,fontWeight: "bold"}
});