import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <Text style={styles.text}>
        Más adelante aquí pondremos el formulario de email y contraseña.
      </Text>

      <Link href="/" style={styles.link}>
        Volver al inicio
      </Link>

      <Link href="/auth/register" style={styles.link}>
        Crear cuenta
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#f9fafb"
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827"
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#4b5563"
  },
  link: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2563eb"
  }
});