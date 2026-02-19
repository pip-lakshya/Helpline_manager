import { useLocalSearchParams } from "expo-router";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, FlatList, Text, View } from "react-native";
import { db } from "../../firebaseConfig";



export default function Match() {

  const [donors, setDonors] = useState<any[]>([]);
  const params = useLocalSearchParams();

  // force string values (expo-router bug prevention)
  const data: any = {
    ...params,
    donationType: String(params.donationType || ""),
    bloodGroup: String(params.bloodGroup || ""),
    city: String(params.city || ""),
    area: String(params.area || ""),
    assignedDonorId: String(params.assignedDonorId || "")
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // ---------------- FETCH + MATCH ----------------
  const fetchDonors = async () => {

    const snapshot = await getDocs(collection(db, "donors"));
    let list: any[] = [];

    for (const docSnap of snapshot.docs) {

      const d: any = { id: docSnap.id, ...docSnap.data() };

      // -------- COOLDOWN CHECK ----------
      let isAvailable = d.availability === "Available";

      if (d.lastDonationDate) {

        const [day, month, year] = d.lastDonationDate.split("-");
        const last = new Date(`${year}-${month}-${day}`);
        const today = new Date();

        const diffDays = Math.floor(
          (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
        );

        const cooldown = data.donationType === "SDP" ? 15 : 90;

        console.log("LOG", d.name, diffDays, cooldown, d.availability);

        // cooldown finished → auto enable
        if (diffDays >= cooldown && d.availability === "Unavailable") {

          try {
            await updateDoc(doc(db, "donors", d.id), {
              availability: "Available"
            });
          } catch {}

          isAvailable = true;
        }
      }

      // -------- SCORE ----------
      let score = 0;
      if (d.bloodGroup === data.bloodGroup) score += 50;
      if (d.donorType === data.donationType) score += 30;
      if (d.city === data.city) score += 20;
      if (d.area === data.area) score += 10;

      list.push({ ...d, score, isAvailable });
    }

    list.sort((a, b) => b.score - a.score);
    setDonors(list);
  };

  // ---------------- ASSIGN DONOR ----------------
  const assignDonor = async (donorId: string) => {

    const today = new Date();
    const formattedDate =
      String(today.getDate()).padStart(2, "0") + "-" +
      String(today.getMonth() + 1).padStart(2, "0") + "-" +
      today.getFullYear();

    try {

      // ⭐ ask replace confirmation
      if (data.assignedDonorId && data.assignedDonorId !== donorId) {

        Alert.alert(
          "Replace donor?",
          "This will replace previously assigned donor.",
          [
            { text: "Cancel" },
            { text: "Replace", onPress: () => doAssignment(donorId, formattedDate) }
          ]
        );

        return;
      }

      doAssignment(donorId, formattedDate);

    } catch (err) {
      console.log(err);
      Alert.alert("Error assigning donor");
    }
  };

  // actual assignment logic
  const doAssignment = async (donorId: string, formattedDate: string) => {

    try {

      // ⭐ restore old donor safely (if exists)
      if (data.assignedDonorId && data.assignedDonorId !== donorId) {

        const oldRef = doc(db, "donors", String(data.assignedDonorId));
        const oldSnap = await getDoc(oldRef);

        if (oldSnap.exists()) {
          await updateDoc(oldRef, { availability: "Available" });
        }
      }

      const selected = donors.find(d => d.id === donorId);

      // update request
      await updateDoc(doc(db, "requests", String(data.id)), {
        assignedDonorId: donorId,
        assignedDonorName: selected?.name || "Unknown",
        status: "contacted"
      });

      // update donor
      await updateDoc(doc(db, "donors", donorId), {
        lastDonationDate: formattedDate,
        availability: "Unavailable"
      });

      Alert.alert("Donor assigned successfully");
      fetchDonors();

    } catch (err) {
      console.log(err);
      Alert.alert("Error assigning donor");
    }
  };

  // ---------------- UI ----------------
  return (
    <FlatList
      data={donors}
      keyExtractor={(item) => item.id}

      ListEmptyComponent={() => (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No donors found
        </Text>
      )}

      renderItem={({ item }) => (

        <View style={{
          backgroundColor: "white",
          padding: 15,
          margin: 10,
          borderRadius: 8
        }}>

          <Text>Name: {item.name}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Blood: {item.bloodGroup}</Text>
          <Text>City: {item.city}</Text>
          <Text>Area: {item.area}</Text>
          <Text>Match Score: {item.score}</Text>

          <Button
            title={item.isAvailable ? "Assign Donor" : "Unavailable"}
            disabled={!item.isAvailable}
            onPress={() => assignDonor(item.id)}
          />
          

        </View>
      )}
    />
  );
}