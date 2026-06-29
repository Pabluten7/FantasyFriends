import { Stack } from "expo-router";

import { LineUpProvider } from "@/features/leagues/LineUpStore";

export default function RootLayout() {
  return (
    <LineUpProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "LineUp" }} />

        <Stack.Screen name="auth/login" options={{ title: "Iniciar sesión" }} />

        <Stack.Screen name="auth/register" options={{ title: "Crear cuenta" }} />

        <Stack.Screen name="leagues/index" options={{ title: "Mis ligas" }} />

        <Stack.Screen name="leagues/create" options={{ title: "Crear liga" }} />

        <Stack.Screen name="leagues/detail" options={{ title: "Liga" }} />

        <Stack.Screen name="leagues/squad" options={{ title: "Plantilla" }} />

        <Stack.Screen name="leagues/market" options={{ title: "Mercado" }} />

        <Stack.Screen name="leagues/ranking" options={{ title: "Ranking" }} />

        <Stack.Screen name="leagues/events" options={{ title: "Eventos" }} />

        <Stack.Screen
          name="leagues/create-event"
          options={{ title: "Crear evento" }}
        />
      </Stack>
    </LineUpProvider>
  );
}