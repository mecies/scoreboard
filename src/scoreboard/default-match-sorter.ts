import { FootballMatch } from "./football-match";
import { MatchSorter } from "./match-sorter";

export class DefaultMatchSorter implements MatchSorter {
  sort(matches: FootballMatch[]): FootballMatch[] {
    return matches.reverse().sort((a, b) => {
      const aTotalScore = a.getTotalScore();
      const bTotalScore = b.getTotalScore();

      if (aTotalScore === bTotalScore) return 0;

      return bTotalScore - aTotalScore;
    });
  }
}
