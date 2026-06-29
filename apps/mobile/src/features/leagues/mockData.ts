export type League = {
  id: string;
  name: string;
  membersCount: number;
  currentWeek: number;
  userPosition: number;
  budget: number;
};

export type Player = {
  id: string;
  leagueId: string;
  name: string;
  nickname: string;
  price: number;
  points: number;
  trend: "up" | "down" | "stable";
  owned: boolean;
};

export type LeagueEvent = {
  id: string;
  leagueId: string;
  playerName: string;
  title: string;
  description: string;
  points: number;
  status: "approved" | "pending";
};

export const leagues: League[] = [
  {
    id: "1",
    name: "Los de siempre",
    membersCount: 8,
    currentWeek: 1,
    userPosition: 3,
    budget: 100
  },
  {
    id: "2",
    name: "Viernes FC",
    membersCount: 6,
    currentWeek: 1,
    userPosition: 1,
    budget: 100
  }
];

export const players: Player[] = [
  {
    id: "1",
    leagueId: "1",
    name: "Carlos",
    nickname: "El MVP",
    price: 32,
    points: 48,
    trend: "up",
    owned: true
  },
  {
    id: "2",
    leagueId: "1",
    name: "Marta",
    nickname: "La Capitana",
    price: 28,
    points: 41,
    trend: "stable",
    owned: true
  },
  {
    id: "3",
    leagueId: "1",
    name: "Álvaro",
    nickname: "Modo fantasma",
    price: 21,
    points: 30,
    trend: "down",
    owned: false
  },
  {
    id: "4",
    leagueId: "1",
    name: "Lucía",
    nickname: "La leyenda",
    price: 35,
    points: 54,
    trend: "up",
    owned: false
  },
  {
    id: "5",
    leagueId: "1",
    name: "Pablo",
    nickname: "Presi",
    price: 24,
    points: 36,
    trend: "stable",
    owned: true
  },
  {
    id: "6",
    leagueId: "2",
    name: "Dani",
    nickname: "El clutch",
    price: 31,
    points: 45,
    trend: "up",
    owned: true
  },
  {
    id: "7",
    leagueId: "2",
    name: "Nerea",
    nickname: "La reina del ranking",
    price: 34,
    points: 52,
    trend: "up",
    owned: false
  }
];

export const events: LeagueEvent[] = [
  {
    id: "1",
    leagueId: "1",
    playerName: "Carlos",
    title: "Salvó la noche",
    description: "Organizó el plan cuando todo se estaba cayendo.",
    points: 12,
    status: "approved"
  },
  {
    id: "2",
    leagueId: "1",
    playerName: "Marta",
    title: "Frase mítica",
    description: "Soltó una frase que ya queda para la historia del grupo.",
    points: 8,
    status: "approved"
  },
  {
    id: "3",
    leagueId: "1",
    playerName: "Álvaro",
    title: "Desapareció sin avisar",
    description: "Se fue del sitio y nadie sabía dónde estaba.",
    points: -6,
    status: "pending"
  },
  {
    id: "4",
    leagueId: "2",
    playerName: "Dani",
    title: "Invitó a una ronda",
    description: "Movimiento de capitán.",
    points: 10,
    status: "approved"
  }
];

export function getLeagueById(leagueId?: string) {
  return leagues.find((league) => league.id === leagueId);
}

export function getPlayersByLeague(leagueId?: string) {
  return players.filter((player) => player.leagueId === leagueId);
}

export function getOwnedPlayersByLeague(leagueId?: string) {
  return players.filter((player) => player.leagueId === leagueId && player.owned);
}

export function getMarketPlayersByLeague(leagueId?: string) {
  return players.filter((player) => player.leagueId === leagueId && !player.owned);
}

export function getEventsByLeague(leagueId?: string) {
  return events.filter((event) => event.leagueId === leagueId);
}