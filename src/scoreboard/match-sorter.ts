import { FootballMatch } from "./football-match";

export interface MatchSorter {
  sort(matches: FootballMatch[]): FootballMatch[];
}
