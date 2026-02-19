import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import AppButton from "./AppButton";

export default function Navbar() {
  const router = useRouter();

  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      backgroundColor: "#E53935"
    }}>
      <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
        BloodConnect
      </Text>
      <AppButton title="Home" onPress={() => router.push("..//index")} />
      <AppButton title="Request" onPress={() => router.push("..///request")} />  
    </View>
  );
}