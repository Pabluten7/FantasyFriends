import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Beta privada</Text>

      <Text style={styles.title}>{APP_NAME}</Text>

      <Text style={styles.subtitle}>{APP_DESCRIPTION}</Text>

      <View style={styles.links}>
        <Link href="/leagues" style={styles.primaryLink}>
          Entrar a la app
        </Link>

        <Link href="/auth/login" style={styles.secondaryLink}>
          Iniciar sesión
        </Link>

        <Link href="/auth/register" style={styles.secondaryLink}>
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
  badge: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700"
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    marginBottom: 12,
    color: "#111827"
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    color: "#4b5563",
    marginBottom: 36
  },
  links: {
    width: "100%",
    gap: 14
  },
  primaryLink: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800"
  },
  secondaryLink: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  }
});