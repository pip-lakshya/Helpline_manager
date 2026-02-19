import { useState } from "react";
import { View, TextInput, Alert, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";

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
  input:{ borderWidth:1, padding:12, marginBottom:15 }
});