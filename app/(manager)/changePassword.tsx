import { View, Text, TextInput, Alert, StyleSheet } from "react-native";
import { updatePassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import AppButton from "@/components/AppButton";
import { useState } from "react";

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
    borderWidth: 1,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
  },
});