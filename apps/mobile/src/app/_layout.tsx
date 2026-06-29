import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "FantasyFriends"
        }}
      />

      <Stack.Screen
        name="auth/login"
        options={{
          title: "Iniciar sesión"
        }}
      />

      <Stack.Screen
        name="auth/register"
        options={{
          title: "Crear cuenta"
        }}
      />
    </Stack>
  );
}