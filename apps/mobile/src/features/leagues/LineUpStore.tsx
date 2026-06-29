import { createContext, ReactNode, useContext, useState } from "react";

import {
  League,
  LeagueEvent,
  Player,
  events as initialEvents,
  leagues as initialLeagues,
  players as initialPlayers
} from "@/features/leagues/mockData";

type ActionResult = {
  ok: boolean;
  message: string;
};

type CreateEventInput = {
  leagueId: string;
  playerName: string;
  title: string;
  description: string;
  points: number;
};

type LineUpStoreValue = {
  leagues: League[];
  players: Player[];
  events: LeagueEvent[];
  getLeagueById: (leagueId?: string) => League | undefined;
  getPlayersByLeague: (leagueId?: string) => Player[];
  getOwnedPlayersByLeague: (leagueId?: string) => Player[];
  getMarketPlayersByLeague: (leagueId?: string) => Player[];
  getEventsByLeague: (leagueId?: string) => LeagueEvent[];
  buyPlayer: (leagueId: string, playerId: string) => ActionResult;
  sellPlayer: (leagueId: string, playerId: string) => ActionResult;
  addEvent: (input: CreateEventInput) => void;
};

const LineUpStoreContext = createContext<LineUpStoreValue | null>(null);

export function LineUpProvider({ children }: { children: ReactNode }) {
  const [leagues, setLeagues] = useState<League[]>(initialLeagues);
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [events, setEvents] = useState<LeagueEvent[]>(initialEvents);

  function getLeagueById(leagueId?: string) {
    return leagues.find((league) => league.id === leagueId);
  }

  function getPlayersByLeague(leagueId?: string) {
    return players.filter((player) => player.leagueId === leagueId);
  }

  function getOwnedPlayersByLeague(leagueId?: string) {
    return players.filter((player) => player.leagueId === leagueId && player.owned);
  }

  function getMarketPlayersByLeague(leagueId?: string) {
    return players.filter((player) => player.leagueId === leagueId && !player.owned);
  }

  function getEventsByLeague(leagueId?: string) {
    return events.filter((event) => event.leagueId === leagueId);
  }

  function buyPlayer(leagueId: string, playerId: string): ActionResult {
    const league = leagues.find((item) => item.id === leagueId);
    const player = players.find((item) => item.id === playerId);

    if (!league || !player) {
      return {
        ok: false,
        message: "No se ha encontrado la liga o el jugador."
      };
    }

    if (player.owned) {
      return {
        ok: false,
        message: `${player.name} ya está en tu plantilla.`
      };
    }

    if (league.budget < player.price) {
      return {
        ok: false,
        message: `No tienes presupuesto suficiente para fichar a ${player.name}.`
      };
    }

    setPlayers((currentPlayers) =>
      currentPlayers.map((item) =>
        item.id === playerId ? { ...item, owned: true } : item
      )
    );

    setLeagues((currentLeagues) =>
      currentLeagues.map((item) =>
        item.id === leagueId
          ? { ...item, budget: item.budget - player.price }
          : item
      )
    );

    return {
      ok: true,
      message: `Has fichado a ${player.name} por ${player.price}M.`
    };
  }

  function sellPlayer(leagueId: string, playerId: string): ActionResult {
    const player = players.find((item) => item.id === playerId);

    if (!player) {
      return {
        ok: false,
        message: "No se ha encontrado el jugador."
      };
    }

    if (!player.owned) {
      return {
        ok: false,
        message: `${player.name} no está en tu plantilla.`
      };
    }

    setPlayers((currentPlayers) =>
      currentPlayers.map((item) =>
        item.id === playerId ? { ...item, owned: false } : item
      )
    );

    setLeagues((currentLeagues) =>
      currentLeagues.map((item) =>
        item.id === leagueId
          ? { ...item, budget: item.budget + player.price }
          : item
      )
    );

    return {
      ok: true,
      message: `Has vendido a ${player.name} por ${player.price}M.`
    };
  }

  function addEvent(input: CreateEventInput) {
    const newEvent: LeagueEvent = {
      id: `event-${Date.now()}`,
      leagueId: input.leagueId,
      playerName: input.playerName,
      title: input.title,
      description: input.description,
      points: input.points,
      status: "pending"
    };

    setEvents((currentEvents) => [newEvent, ...currentEvents]);
  }

  return (
    <LineUpStoreContext.Provider
      value={{
        leagues,
        players,
        events,
        getLeagueById,
        getPlayersByLeague,
        getOwnedPlayersByLeague,
        getMarketPlayersByLeague,
        getEventsByLeague,
        buyPlayer,
        sellPlayer,
        addEvent
      }}
    >
      {children}
    </LineUpStoreContext.Provider>
  );
}

export function useLineUpStore() {
  const context = useContext(LineUpStoreContext);

  if (!context) {
    throw new Error("useLineUpStore debe usarse dentro de LineUpProvider");
  }

  return context;
}