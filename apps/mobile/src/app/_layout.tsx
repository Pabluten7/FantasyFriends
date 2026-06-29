import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "LineUp"
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

      <Stack.Screen
        name="leagues/index"
        options={{
          title: "Mis ligas"
        }}
      />

      <Stack.Screen
        name="leagues/create"
        options={{
          title: "Crear liga"
        }}
      />
    </Stack>
  );
}