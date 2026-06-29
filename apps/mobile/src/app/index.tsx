import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LineUp</Text>

      <Text style={styles.subtitle}>
        La fantasy league de tu grupo de amigos.
      </Text>

      <View style={styles.links}>
        <Link href="/auth/login" style={styles.link}>
          Iniciar sesión
        </Link>

        <Link href="/auth/register" style={styles.link}>
          Crear cuenta
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb"
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 12,
    color: "#111827"
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 32
  },
  links: {
    gap: 16,
    alignItems: "center"
  },
  link: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2563eb"
  }
});