-- Schema inicial de LineUp.
-- Todavía no se ejecuta.
-- Lo usaremos cuando empecemos con Supabase.

create table if not exists profiles (
  id uuid primary key,
  username text unique,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);