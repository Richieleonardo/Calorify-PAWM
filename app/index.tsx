import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
   return (
    <View
    style={styles.container}
  >
    <Text>Hello world, this will be the start screen</Text>
    <Link href="/home">View Home</Link>
    <Link href="/login">Login here</Link>
    <Link href="/register">Register here</Link>
    <Link href="/history">History here</Link>
  </View>
    );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


