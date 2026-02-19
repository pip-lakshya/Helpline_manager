import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { View } from "react-native";
import AppButton from "../../components/AppButton";
import { auth } from "../../firebaseConfig";
import { Text} from "react-native";


export default function Settings() {
  const router = useRouter();

  return (   
     <View style={{ flex: 1, padding: 20 }}>
     <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
        }}>
          <Text style={{ color: "red", fontSize: 25, fontWeight: "bold" }}>
            Settings
          </Text></View>

      <AppButton
        title="Change Password"
        onPress={() => router.push("../changePassword")}
      />

      <AppButton
        title="Logout"
        onPress={async () => {
          await signOut(auth);
          router.replace("/login");
        }}
      />
      
    </View>
  );
}