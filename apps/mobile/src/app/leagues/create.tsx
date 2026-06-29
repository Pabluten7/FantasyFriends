import { router } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateLeagueScreen() {
  const [name, setName] = useState("");

  function handleCreateLeague() {
    const cleanName = name.trim();

    if (!cleanName) {
      Alert.alert("Falta el nombre", "Ponle un nombre a la liga.");
      return;
    }

    Alert.alert("Liga creada", `Has creado la liga "${cleanName}".`);

    router.push("/leagues");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear liga</Text>

      <Text style={styles.subtitle}>
        De momento esto es una pantalla falsa. Más adelante guardaremos la liga en Supabase.
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre de la liga</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Ej: Los de siempre"
          style={styles.input}
          autoCapitalize="sentences"
        />

        <Pressable style={styles.button} onPress={handleCreateLeague}>
          <Text style={styles.buttonText}>Crear liga</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.push("/leagues")}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f9fafb"
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 28
  },
  form: {
    gap: 14
  },
  label: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827"
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    fontSize: 16
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#111827"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800"
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#e5e7eb"
  },
  secondaryButtonText: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800"
  }
});