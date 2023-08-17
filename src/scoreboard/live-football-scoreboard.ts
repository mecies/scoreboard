import { DefaultMatchSorter } from "./default-match-sorter";
import { FootballMatch } from "./football-match";
import { MatchSorter } from "./match-sorter";

export class LiveFootballScoreboard {
  private matches: FootballMatch[];
  private matchSorter: MatchSorter;

  constructor(sorter: MatchSorter = new DefaultMatchSorter()) {
    this.matches = [];
    this.matchSorter = sorter;
  }

  getMatchesInProgress(): FootballMatch[] {
    return [...this.matches];
  }

  startMatch(newMatch: FootballMatch): void {
    const isAlreadyStarted = this.matches.some((match) =>
      match.isSame(newMatch)
    );

    if (isAlreadyStarted) return;

    this.matches.push(newMatch);
  }

  finishMatch(matchToFinish: FootballMatch): void {
    this.matches = this.matches.filter((match) => !match.isSame(matchToFinish));
  }

  getSummaryOfMatchesInProgress(): string {
    if (this.matches.length === 0) return "There are no matches in progress";

    return this.matchSorter
      .sort(this.matches)
      .map(this.printSummaryRow)
      .join("\n");
  }

  private printSummaryRow(match: FootballMatch, index: number): string {
    return `${index + 1}. ${match.getMatchSummary()}`;
  }
}
