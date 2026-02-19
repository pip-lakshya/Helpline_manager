import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppButton from "../../components/AppButton";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { Image } from "react-native";

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();

  const [stats, setStats] = useState({
    donors: 0,
    requests: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const donors = await getDocs(collection(db, "donors"));
    const requests = await getDocs(collection(db, "requests"));

    setStats({
      donors: donors.size,
      requests: requests.size,
    });
  };

  const handleManagerLogin = () => {
    if (user) router.push("../(manager)/dashboard");
    else router.push("../(public)/login");
  };

  return (
    <View style={styles.container}>
      {/* APP LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logoImage}
      />

      <Text style={styles.logo}>BloodConnect</Text>

      <Text style={styles.tagline}>
        Connecting donors. Saving lives.
      </Text>

      <View style={styles.statsBox}>
        <Text>❤️ Requests handled: {stats.requests}</Text>
        <Text>🩸 Total donors: {stats.donors}</Text>
        <Text>📞 24x7 Emergency Support</Text>
      </View>

      <View style={{ width: "100%" }}>
        <AppButton
          title="Manager Login"
          onPress={handleManagerLogin}
        />

        <AppButton
          title="Create Blood Request"
          onPress={() => router.push("/request")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: "contain"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#E53935",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  statsBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 14,
    marginBottom: 40,
    width: "100%",
    elevation: 4,
  },
});