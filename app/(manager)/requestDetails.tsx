import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { db } from "../../firebaseConfig";



export default function RequestDetails() {

  const data: any = useLocalSearchParams();
  const [assignedDonor, setAssignedDonor] = useState<any>(null);

  useEffect(() => {
    if (data.assignedDonorId) {
      fetchAssignedDonor();
    }
  }, []);

  const fetchAssignedDonor = async () => {
    try {
      const donorRef = doc(db, "donors", String(data.assignedDonorId));
      const snap = await getDoc(donorRef);

      if (snap.exists()) {
        setAssignedDonor(snap.data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
    >

      <Text style={{ fontSize: 22, marginBottom: 20 }}>
        Request Details
      </Text>

      {/* REQUEST INFO */}
      <Text>Patient: {data.patientName}</Text>
      <Text>Attendant: {data.attendantName}</Text>
      <Text>Phone: {data.phone}</Text>
      <Text>Hospital: {data.hospital}</Text>
      <Text>Blood: {data.bloodGroup}</Text>
      <Text>Type: {data.donationType}</Text>
      <Text>City: {data.city}</Text>
      <Text>Area: {data.area}</Text>
      <Text>Urgency: {data.urgency}</Text>
      <Text>Status: {data.status}</Text>
      <Text>Notes: {data.notes}</Text>

      {/* ASSIGNED DONOR */}
      {assignedDonor && (
        <View style={{ marginTop: 30 }}>

          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Assigned Donor
          </Text>

          <Text>Name: {assignedDonor.name}</Text>
          <Text>Phone: {assignedDonor.phone}</Text>
          <Text>Blood: {assignedDonor.bloodGroup}</Text>
          <Text>City: {assignedDonor.city}</Text>
          <Text>Area: {assignedDonor.area}</Text>
          <Text>Availability: {assignedDonor.availability}</Text>

        </View>
      )}
      {data.assignedDonorName && (
        <Text style={{ marginTop: 10, color: "green", fontWeight: "bold" }}>
          Assigned Donor: {data.assignedDonorName}
        </Text>
      )}
      {!assignedDonor && (
        <Text style={{ marginTop: 20 }}>
          No donor assigned yet
        </Text>
      )}
      

    </ScrollView>
  );
}