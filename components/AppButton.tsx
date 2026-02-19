import { Pressable, Text, StyleSheet } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export default function AppButton({ title, onPress }: Props) {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#E53935",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 8,
    elevation: 4,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});