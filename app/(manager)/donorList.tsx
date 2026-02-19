import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

import AppButton from "@/components/AppButton";
import { useRouter } from "expo-router";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { COLORS } from "../../constants/theme";
import { db } from "../../firebaseConfig";


export default function DonorList() {

  const [donors, setDonors] = useState<any[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, bloodFilter, cityFilter, donors]);

  // FETCH DONORS
  const fetchDonors = async () => {
    const snap = await getDocs(collection(db, "donors"));

    const data = snap.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    setDonors(data);
    setFilteredDonors(data);
  };

  // FILTERING LOGIC
  const applyFilters = () => {
    let list = donors;

    if (search)
      list = list.filter(d =>
        d.name?.toLowerCase().includes(search.toLowerCase())
      );

    if (bloodFilter)
      list = list.filter(d => d.bloodGroup === bloodFilter);

    if (cityFilter)
      list = list.filter(d =>
        d.city?.toLowerCase().includes(cityFilter.toLowerCase())
      );

    setFilteredDonors(list);
  };

  return (
    <View style={styles.container}>

      {/* PAGE TITLE */}
      <Text style={styles.heading}>Donor Directory</Text>
      <AppButton
        title="Add New Donor"
        onPress={() => router.push("/addDonor")}
      />

      {/* SEARCH BOXES */}
      <TextInput
        placeholder="Search by name"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <TextInput
        placeholder="Filter by blood group (A+, O-)"
        value={bloodFilter}
        onChangeText={setBloodFilter}
        style={styles.input}
      />

      <TextInput
        placeholder="Filter by city"
        value={cityFilter}
        onChangeText={setCityFilter}
        style={styles.input}
      />

      {/* DONOR LIST */}
      <FlatList
        data={filteredDonors}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No donors found</Text>
        )}
        renderItem={({ item }) => (

          <Pressable
            onPress={() =>
              router.push({
                pathname: "../donorDetails",
                params: item
              })
            }
            style={styles.card}
          >
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>Blood: {item.bloodGroup}</Text>
              <Text style={styles.info}>City: {item.city}</Text>
            </View>

            <Text style={styles.arrow}>›</Text>

          </Pressable>
        )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: COLORS.background
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.primary
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 12
  },

  card: {
    padding: 20,
    backgroundColor: COLORS.card,
    marginBottom: 14,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3
  },

  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.text
  },

  info: {
    color: "#555",
    marginTop: 2
  },

  arrow: {
    fontSize: 28,
    color: COLORS.primary,
    fontWeight: "bold"
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#666"
  }
});