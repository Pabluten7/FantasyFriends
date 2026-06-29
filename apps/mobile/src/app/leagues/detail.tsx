import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useLineUpStore } from "@/features/leagues/LineUpStore";

export default function LeagueDetailScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const {
    getLeagueById,
    getEventsByLeague,
    getMarketPlayersByLeague,
    getOwnedPlayersByLeague
  } = useLineUpStore();

  const league = getLeagueById(leagueId);
  const squadCount = getOwnedPlayersByLeague(leagueId).length;
  const marketCount = getMarketPlayersByLeague(leagueId).length;
  const eventsCount = getEventsByLeague(leagueId).length;

  if (!league) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Liga no encontrada</Text>

        <Link href="/leagues" style={styles.secondaryLink}>
          Volver a mis ligas
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>Jornada {league.currentWeek}</Text>

      <Text style={styles.title}>{league.name}</Text>

      <Text style={styles.subtitle}>
        {league.membersCount} miembros · Vas #{league.userPosition} · {league.budget}M disponibles
      </Text>

      <View style={styles.grid}>
        <Link
          href={{ pathname: "/leagues/squad", params: { leagueId: league.id } }}
          asChild
        >
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Plantilla</Text>
            <Text style={styles.cardText}>{squadCount} jugadores fichados.</Text>
          </Pressable>
        </Link>

        <Link
          href={{ pathname: "/leagues/market", params: { leagueId: league.id } }}
          asChild
        >
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Mercado</Text>
            <Text style={styles.cardText}>{marketCount} jugadores disponibles.</Text>
          </Pressable>
        </Link>

        <Link
          href={{ pathname: "/leagues/ranking", params: { leagueId: league.id } }}
          asChild
        >
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Ranking</Text>
            <Text style={styles.cardText}>Clasificación de la liga.</Text>
          </Pressable>
        </Link>

        <Link
          href={{ pathname: "/leagues/events", params: { leagueId: league.id } }}
          asChild
        >
          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Eventos</Text>
            <Text style={styles.cardText}>{eventsCount} momentos registrados.</Text>
          </Pressable>
        </Link>
      </View>

      <Link href="/leagues" style={styles.secondaryLink}>
        Volver a mis ligas
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
  badge: {
    alignSelf: "flex-start",
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
  grid: {
    gap: 14,
    marginBottom: 24
  },
  card: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 6
  },
  cardText: {
    fontSize: 15,
    color: "#4b5563"
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