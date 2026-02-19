import Navbar from "@/components/Navbar";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { collection, doc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebaseConfig";
import useProtectedRoute from "../../hooks/useProtectedRoute";

export default function Dashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const router = useRouter();
  const { user } = useAuth();
  const { loading } = useProtectedRoute();

  // protect dashboard
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading]);

  if (loading) return null;

  // realtime request listener
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "requests"), (snapshot) => {
      let data: any[] = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));

      const urgencyScore: any = { high: 3, medium: 2, low: 1 };

      // pending first → then urgency
      data.sort((a, b) => {
        if (a.status === "pending" && b.status !== "pending") return -1;
        if (a.status !== "pending" && b.status === "pending") return 1;
        return (urgencyScore[b.urgency] || 0) - (urgencyScore[a.urgency] || 0);
      });

      setRequests(data);
    });

    return () => unsub();
  }, []);

  // fetch manually
  const fetchRequests = async () => {
    const snapshot = await getDocs(collection(db, "requests"));

    let data: any[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    const urgencyScore: any = { high: 3, medium: 2, low: 1 };

    data.sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return (urgencyScore[b.urgency] || 0) - (urgencyScore[a.urgency] || 0);
    });

    setRequests(data);
  };

  // change request status
  const changeStatus = async (id: string, newStatus: string, oldStatus: string) => {
    if (oldStatus === "completed") {
      Alert.alert(
        "Warning",
        "This request is already completed. Change status anyway?",
        [
          { text: "Cancel" },
          {
            text: "Yes",
            onPress: async () => {
              await updateDoc(doc(db, "requests", id), { status: newStatus });
              fetchRequests();
            },
          },
        ]
      );
    } else {
      await updateDoc(doc(db, "requests", id), { status: newStatus });
      fetchRequests();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar />

      <View style={{ flex: 1, padding: 15, paddingBottom: 80 }}>


        <View style={{ height: 10 }} />

        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                marginVertical: 8,
                borderRadius: 10,
                elevation: 2,
              }}
            >
              <Text>Name: {item.patientName}</Text>
              <Text>Type: {item.donationType}</Text>
              <Text>Blood: {item.bloodGroup}</Text>
              <Text>Urgency: {item.urgency}</Text>

              <Text
                style={{
                  marginTop: 5,
                  fontWeight: "bold",
                  color:
                    item.status === "pending"
                      ? "orange"
                      : item.status === "contacted"
                        ? "blue"
                        : "green",
                }}
              >
                Status: {item.status}
              </Text>

              {item.assignedDonorName && (
                <Text style={{ color: "green", fontWeight: "bold" }}>
                  Assigned: {item.assignedDonorName}
                </Text>
              )}

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  backgroundColor: "white",
                  marginTop: 5,
                  marginBottom: 10,
                }}
              >
                <Picker
                  selectedValue={item.status}
                  onValueChange={(value) =>
                    changeStatus(item.id, value, item.status)
                  }
                  style={{ color: "black" }}
                  dropdownIconColor="black"
                >
                  <Picker.Item label="Pending" value="pending" />
                  <Picker.Item label="Contacted" value="contacted" />
                  <Picker.Item label="Completed" value="completed" />
                </Picker>
              </View>

              <Button
                title="Find Donor"
                onPress={() => {
                  if (item.status === "completed") {
                    Alert.alert("Request already completed");
                    return;
                  }

                  router.push({
                    pathname: "/match",
                    params: item,
                  });
                }}
              />

              <Button
                title="See Details"
                onPress={() =>
                  router.push({
                    pathname: "/requestDetails",
                    params: item,
                  })
                }
              />
            </View>
          )}
        />
      </View>

    </View>
  );
}