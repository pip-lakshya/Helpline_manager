import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { Alert, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";
import AppButton from "../../components/AppButton";

export default function Request() {

  const [patientName, setPatientName] = useState("");
  const [attendantName, setAttendantName] = useState("");
  const [phone, setPhone] = useState("");
  const [hospital, setHospital] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [donationType, setDonationType] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [urgency, setUrgency] = useState("");
  const [datetime, setDatetime] = useState("");
  const [notes, setNotes] = useState("");
  const [slipVerified, setSlipVerified] = useState(false);

  const submitRequest = async () => {

    // simple validation
    if (!patientName || !phone || !bloodGroup) {
      Alert.alert("Fill required fields");
      return;
    }

    try {
      await addDoc(collection(db, "requests"), {
        patientName,
        attendantName,
        phone,
        bloodGroup,
        city,
        area,
        hospital,
        donationType,
        urgency,
        datetime: datetime || serverTimestamp(), // auto time if empty
        notes,
        slipVerified,
        status: "pending",
        assignedDonorId: null
      });

      Alert.alert("Request Submitted");

      // reset form
      setPatientName("");
      setAttendantName("");
      setPhone("");
      setHospital("");
      setBloodGroup("");
      setDonationType("");
      setCity("");
      setArea("");
      setUrgency("");
      setDatetime("");
      setNotes("");
      setSlipVerified(false);

    } catch (err) {
      Alert.alert("Error submitting request");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>

      <Text style={{ fontSize: 22, marginBottom: 20 }}>Blood Request</Text>

      <TextInput placeholder="Patient Name *" style={styles.input} value={patientName} onChangeText={setPatientName} />
      <TextInput placeholder="Attendant Name" style={styles.input} value={attendantName} onChangeText={setAttendantName} />
      <TextInput placeholder="Phone *" style={styles.input} value={phone} keyboardType="phone-pad" onChangeText={setPhone} />
      <TextInput placeholder="Hospital Name" style={styles.input} value={hospital} onChangeText={setHospital} />
      <TextInput placeholder="Blood Group (A+, O-)" style={styles.input} value={bloodGroup} onChangeText={setBloodGroup} />
      <TextInput placeholder="Donation Type (SDP / BLOOD)" style={styles.input} value={donationType} onChangeText={setDonationType} />
      <TextInput placeholder="City" style={styles.input} value={city} onChangeText={setCity} />
      <TextInput placeholder="Area" style={styles.input} value={area} onChangeText={setArea} />
      <TextInput placeholder="Urgency (high / medium / low)" style={styles.input} value={urgency} onChangeText={setUrgency} />
      <TextInput placeholder="Required Date & Time" style={styles.input} value={datetime} onChangeText={setDatetime} />
      <TextInput placeholder="Notes" style={styles.input} value={notes} onChangeText={setNotes} />

      {/* slip verification */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <Text>Slip Verified</Text>
        <Switch value={slipVerified} onValueChange={setSlipVerified} />
      </View>

      <AppButton title="Submit Request" onPress={submitRequest} />

    </ScrollView>
  );
}

const styles = {
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 6,
    color: "black",
    placeholderTextColor: "#999"
  }
} 