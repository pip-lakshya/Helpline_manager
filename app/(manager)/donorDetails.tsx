import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AppButton from "../../components/AppButton";

export default function DonorDetails() {

  const router = useRouter();
  const data: any = useLocalSearchParams();

  // editable fields
  const [name, setName] = useState(data.name || "");
  const [phone, setPhone] = useState(data.phone || "");
  const [age, setAge] = useState(data.age || "");
  const [bloodGroup, setBloodGroup] = useState(data.bloodGroup || "");
  const [city, setCity] = useState(data.city || "");
  const [area, setArea] = useState(data.area || "");
  const [donorType, setDonorType] = useState(data.donorType || "");
  const [availability, setAvailability] = useState(data.availability || "");
  const [lastDonationDate, setLastDonationDate] = useState(data.lastDonationDate || "");
  const [preferredTimeSlot, setPreferredTimeSlot] = useState(data.preferredTimeSlot || "");

  const updateDonor = () => {
    if (!name || !phone || !bloodGroup) {
      Alert.alert("Fill required fields");
      return;
    }

    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update donor details?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Update",
          onPress: async () => {
            try {
              await updateDoc(doc(db, "donors", String(data.id)), {
                name,
                phone,
                age,
                bloodGroup,
                city,
                area,
                donorType,
                availability,
                lastDonationDate,
                preferredTimeSlot
              });

              Alert.alert("Success", "Donor updated successfully");
              router.back();

            } catch (err) {
              Alert.alert("Error updating donor");
            }
          }
        }
      ]
    );
  };

 return (
  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 120 }}
  >

    <Text style={styles.heading}>Edit Donor</Text>

    <Input label="Name" value={name} setValue={setName} />
    <Input label="Phone" value={phone} setValue={setPhone} />
    <Input label="Age" value={age} setValue={setAge} />
    <Input label="Blood Group" value={bloodGroup} setValue={setBloodGroup} />
    <Input label="City" value={city} setValue={setCity} />
    <Input label="Area" value={area} setValue={setArea} />
    <Input label="Donor Type (SDP/Blood)" value={donorType} setValue={setDonorType} />
    <Input label="Availability" value={availability} setValue={setAvailability} />
    <Input label="Last Donation (DD-MM-YYYY)" value={lastDonationDate} setValue={setLastDonationDate} />
    <Input label="Preferred Time" value={preferredTimeSlot} setValue={setPreferredTimeSlot} />

    <AppButton title="Update Donor" onPress={updateDonor} />

  </ScrollView>
);
}

function Input({ label, value, setValue }: any) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={{ marginBottom: 5 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 22, marginBottom: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: "white"
  }
});