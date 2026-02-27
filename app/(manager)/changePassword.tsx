import AppButton from "@/components/AppButton";
import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { inputStyles } from "../../styles/inputStyles";

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Password must be at least 6 characters");
      return;
    }

    try {
      if (!auth.currentUser) {
        Alert.alert("Login again");
        return;
      }

      await updatePassword(auth.currentUser, newPassword);
      Alert.alert("Password updated successfully");
      setNewPassword("");
    } catch (err) {
      Alert.alert("Error updating password. Login again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />

      <AppButton title="Update Password" onPress={handleChangePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  input: {
    marginBottom: 20,
    ...inputStyles.input
  },
});