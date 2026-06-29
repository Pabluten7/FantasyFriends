import { Link, useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { useState } from "react";

import { Player } from "@/features/leagues/mockData";
import { useLineUpStore } from "@/features/leagues/LineUpStore";

export default function SquadScreen() {
  const { leagueId } = useLocalSearchParams<{ leagueId: string }>();
  const { getLeagueById, getOwnedPlayersByLeague, sellPlayer } = useLineUpStore();
  const [message, setMessage] = useState("");

  const league = getLeagueById(leagueId);
  const squad = getOwnedPlayersByLeague(leagueId);

  function handleSellPlayer(player: Player) {
    const result = sellPlayer(String(leagueId), player.id);
    setMessage(result.message);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plantilla</Text>

      <Text style={styles.subtitle}>
        {league?.name ?? "Liga"} · {squad.length} jugadores fichados
      </Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <FlatList
        data={squad}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Todavía no tienes jugadores. Ve al mercado para fichar.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.playerName}>{item.name}</Text>
            <Text style={styles.nickname}>{item.nickname}</Text>

            <View style={styles.row}>
              <Text style={styles.stat}>{item.price}M</Text>
              <Text style={styles.stat}>{item.points} pts</Text>
              <Text style={styles.stat}>
                {item.trend === "up" ? "Subiendo" : item.trend === "down" ? "Bajando" : "Estable"}
              </Text>
            </View>

            <Pressable style={styles.sellButton} onPress={() => handleSellPlayer(item)}>
              <Text style={styles.sellButtonText}>Vender</Text>
            </Pressable>
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
    marginBottom: 14
  },
  message: {
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#dcfce7",
    color: "#166534",
    fontWeight: "900",
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
  playerName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#111827"
  },
  nickname: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 15,
    color: "#4b5563"
  },
  row: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 14
  },
  stat: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    color: "#111827",
    fontWeight: "800"
  },
  sellButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "#fee2e2"
  },
  sellButtonText: {
    color: "#991b1b",
    fontWeight: "900",
    fontSize: 16
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