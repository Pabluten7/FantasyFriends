import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useLineUpStore } from "@/features/leagues/LineUpStore";

export default function RankingScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const { getLeagueById, getPlayersByLeague } = useLineUpStore();

  const league = getLeagueById(leagueId);
  const ranking = [...getPlayersByLeague(leagueId)].sort((a, b) => b.points - a.points);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ranking</Text>

      <Text style={styles.subtitle}>
        {league?.name ?? "Liga"} · Clasificación por puntos
      </Text>

      <FlatList
        data={ranking}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.position}>#{index + 1}</Text>

            <View style={styles.info}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.nickname}>{item.nickname}</Text>
            </View>

            <Text style={styles.points}>{item.points} pts</Text>
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
    marginBottom: 24
  },
  list: {
    gap: 12,
    paddingBottom: 24
  },
  card: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    gap: 14
  },
  position: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
    width: 42
  },
  info: {
    flex: 1
  },
  playerName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827"
  },
  nickname: {
    fontSize: 14,
    color: "#4b5563"
  },
  points: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827"
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