import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useLineUpStore } from "@/features/leagues/LineUpStore";

export default function EventsScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const { getEventsByLeague, getLeagueById } = useLineUpStore();

  const league = getLeagueById(leagueId);
  const events = getEventsByLeague(leagueId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      <Text style={styles.subtitle}>
        {league?.name ?? "Liga"} · Momentos de la jornada
      </Text>

      <Link
        href={{ pathname: "/leagues/create-event", params: { leagueId } }}
        style={styles.primaryLink}
      >
        Crear evento
      </Link>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Todavía no hay eventos registrados.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={item.points >= 0 ? styles.positive : styles.negative}>
                {item.points > 0 ? "+" : ""}
                {item.points}
              </Text>
            </View>

            <Text style={styles.playerName}>{item.playerName}</Text>
            <Text style={styles.description}>{item.description}</Text>

            <Text style={styles.status}>
              {item.status === "approved" ? "Aprobado" : "Pendiente"}
            </Text>
          </View>
        )}
      />

      <Link
        href={{ pathname: "/leagues/detail", params: { leagueId } }}
        style={styles.secondaryLink}
      >
        Volver a la liga
      </Link>
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
    marginBottom: 18
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
    fontWeight: "800",
    marginBottom: 18
  },
  list: {
    gap: 14,
    paddingBottom: 24
  },
  empty: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
    color: "#4b5563"
  },
  card: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6
  },
  eventTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "900",
    color: "#111827"
  },
  positive: {
    fontSize: 18,
    fontWeight: "900",
    color: "#166534"
  },
  negative: {
    fontSize: 18,
    fontWeight: "900",
    color: "#991b1b"
  },
  playerName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8
  },
  description: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 12
  },
  status: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    color: "#111827",
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