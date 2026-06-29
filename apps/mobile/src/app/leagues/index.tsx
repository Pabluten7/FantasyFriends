import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { leagues } from "@/features/leagues/mockData";

export default function LeaguesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis ligas</Text>

        <Text style={styles.subtitle}>
          Aquí aparecerán las ligas privadas en las que participas.
        </Text>
      </View>

      <FlatList
        data={leagues}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: "/leagues/detail",
              params: { leagueId: item.id }
            }}
            asChild
          >
            <Pressable style={styles.card}>
              <Text style={styles.leagueName}>{item.name}</Text>

              <Text style={styles.cardText}>
                {item.membersCount} miembros · Jornada {item.currentWeek}
              </Text>

              <Text style={styles.position}>
                Vas #{item.userPosition} en esta liga
              </Text>
            </Pressable>
          </Link>
        )}
      />

      <View style={styles.actions}>
        <Link href="/leagues/create" style={styles.primaryLink}>
          Crear liga
        </Link>

        <Link href="/" style={styles.secondaryLink}>
          Volver al inicio
        </Link>
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
  header: {
    marginBottom: 24
  },
  title: {
    fontSize: 34,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: "#4b5563"
  },
  list: {
    gap: 14,
    paddingBottom: 24
  },
  card: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb"
  },
  leagueName: {
    fontSize: 21,
    fontWeight: "900",
    color: "#111827",
    marginBottom: 8
  },
  cardText: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 8
  },
  position: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827"
  },
  actions: {
    gap: 12
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