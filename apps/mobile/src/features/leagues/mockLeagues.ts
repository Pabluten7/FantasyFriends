export type MockLeague = {
  id: string;
  name: string;
  membersCount: number;
  currentWeek: number;
  userPosition: number;
};

export const mockLeagues: MockLeague[] = [
  {
    id: "1",
    name: "Los de siempre",
    membersCount: 8,
    currentWeek: 1,
    userPosition: 3
  },
  {
    id: "2",
    name: "Viernes FC",
    membersCount: 6,
    currentWeek: 1,
    userPosition: 1
  }
];