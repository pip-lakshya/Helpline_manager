import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Alert, ScrollView, Text, TextInput } from "react-native";
import { db } from "../../firebaseConfig";
import AppButton from "../../components/AppButton";

export default function AddDonor(){

const [name,setName]=useState("");
const [age,setAge]=useState("");
const [phone,setPhone]=useState("");
const [bloodGroup,setBloodGroup]=useState("");
const [donorType,setDonorType]=useState("");
const [lastDonationDate,setLastDonationDate]=useState("");
const [city,setCity]=useState("");
const [area,setArea]=useState("");
const [timeSlot,setTimeSlot]=useState("");
const [availability,setAvailability]=useState("");

const saveDonor = async ()=>{
  try{
    await addDoc(collection(db,"donors"),{
      name,
      age:Number(age),
      phone,
      bloodGroup,
      donorType,
      lastDonationDate,
      city,
      area,
      preferredTimeSlot:timeSlot,
      availability,
      createdAt:new Date()
    });

    Alert.alert("Donor Added Successfully");

  }catch(err){
    Alert.alert("Error saving donor");
  }
}

return(
<ScrollView contentContainerStyle={{padding:20}}>

<Text style={{fontSize:22,marginBottom:20}}>Add Donor</Text>

<TextInput placeholder="Name" style={styles.input} onChangeText={setName}/>
<TextInput placeholder="Age" keyboardType="numeric" style={styles.input} onChangeText={setAge}/>
<TextInput placeholder="Phone" style={styles.input} onChangeText={setPhone}/>
<TextInput placeholder="Blood Group (A+, O-)" style={styles.input} onChangeText={setBloodGroup}/>
<TextInput placeholder="Donor Type (SDP / BLOOD)" style={styles.input} onChangeText={setDonorType}/>
<TextInput placeholder="Last Donation Date (DD-MM-YYYY)" style={styles.input} onChangeText={setLastDonationDate}/>
<TextInput placeholder="City" style={styles.input} onChangeText={setCity}/>
<TextInput placeholder="Area" style={styles.input} onChangeText={setArea}/>
<TextInput placeholder="Preferred Time (morning/evening)" style={styles.input} onChangeText={setTimeSlot}/>
<TextInput placeholder="Availability (available)" style={styles.input} onChangeText={setAvailability}/>

<AppButton title="Save Donor" onPress={saveDonor}/>

</ScrollView>
);
}

const styles={
input:{
borderWidth:1,
padding:12,
marginBottom:10,
backgroundColor:"white",
borderRadius:6
}
}