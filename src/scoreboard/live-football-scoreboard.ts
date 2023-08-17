import { FootballMatch } from "./football-match";

export class LiveFootballScoreboard {
  private matches: FootballMatch[];

  constructor() {
    this.matches = [];
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

    return this.getMatchesInOrderForSummary()
      .map((match, index) => `${index + 1}. ${match.getMatchSummary()}`)
      .join("\n");
  }

  private getMatchesInOrderForSummary(): FootballMatch[] {
    return this.matches.reverse().sort((a, b) => {
      const aTotalScore = a.getTotalScore();
      const bTotalScore = b.getTotalScore();

      if (aTotalScore === bTotalScore) return 0;

      return bTotalScore - aTotalScore;
    });
  }
}
