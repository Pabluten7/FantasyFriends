import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { useLineUpStore } from "@/features/leagues/LineUpStore";

export default function CreateEventScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const { addEvent, getLeagueById, getPlayersByLeague } = useLineUpStore();

  const currentLeagueId = String(leagueId);
  const league = getLeagueById(currentLeagueId);
  const players = getPlayersByLeague(currentLeagueId);

  const [playerName, setPlayerName] = useState(players[0]?.name ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState("");
  const [error, setError] = useState("");

  function handleCreateEvent() {
    setError("");

    const cleanPlayerName = playerName.trim();
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    const numericPoints = Number(points.replace(",", "."));

    if (!cleanPlayerName || !cleanTitle || !cleanDescription || points.trim() === "") {
      setError("Completa jugador, evento, descripción y puntos.");
      return;
    }

    if (Number.isNaN(numericPoints)) {
      setError("Los puntos deben ser un número. Ejemplo: 8 o -4.");
      return;
    }

    addEvent({
      leagueId: currentLeagueId,
      playerName: cleanPlayerName,
      title: cleanTitle,
      description: cleanDescription,
      points: numericPoints
    });

    router.push({
      pathname: "/leagues/events",
      params: { leagueId: currentLeagueId }
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear evento</Text>

      <Text style={styles.subtitle}>
        {league?.name ?? "Liga"} · El evento quedará pendiente de aprobación.
      </Text>

      <View style={styles.suggestions}>
        <Text style={styles.suggestionsTitle}>Elige jugador</Text>

        <View style={styles.playerButtons}>
          {players.map((player) => (
            <Pressable
              key={player.id}
              style={[
                styles.playerButton,
                playerName === player.name && styles.playerButtonActive
              ]}
              onPress={() => setPlayerName(player.name)}
            >
              <Text
                style={[
                  styles.playerButtonText,
                  playerName === player.name && styles.playerButtonTextActive
                ]}
              >
                {player.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.form}>
        <Text style={styles.label}>Evento</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ej: Frase mítica"
          style={styles.input}
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Cuenta qué pasó"
          style={[styles.input, styles.textArea]}
          multiline
        />

        <Text style={styles.label}>Puntos</Text>
        <TextInput
          value={points}
          onChangeText={setPoints}
          placeholder="Ej: 8 o -5"
          style={styles.input}
          keyboardType="default"
        />

        <Pressable style={styles.button} onPress={handleCreateEvent}>
          <Text style={styles.buttonText}>Guardar evento</Text>
        </Pressable>

        <Pressable
          style={styles.secondaryButton}
          onPress={() =>
            router.push({
              pathname: "/leagues/events",
              params: { leagueId: currentLeagueId }
            })
          }
        >
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafb",
    flexGrow: 1
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
    marginBottom: 20
  },
  suggestions: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 16
  },
  suggestionsTitle: {
    fontSize: 15,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 12
  },
  playerButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  playerButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#e5e7eb"
  },
  playerButtonActive: {
    backgroundColor: "#111827"
  },
  playerButtonText: {
    fontWeight: "900",
    color: "#111827"
  },
  playerButtonTextActive: {
    color: "#ffffff"
  },
  error: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    fontWeight: "900",
    marginBottom: 16
  },
  form: {
    gap: 12
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
  textArea: {
    minHeight: 110,
    textAlignVertical: "top"
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#111827",
    marginTop: 8
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