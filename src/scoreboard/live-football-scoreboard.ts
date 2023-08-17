import { FootballMatch } from "./football-match";

export class LiveFootballScoreboard {
  private matches: FootballMatch[];

  constructor() {
    this.matches = [];
  }

  getMatchesInProgress(): FootballMatch[] {
    return [...this.matches];
  }

  startMatch(homeTeam: string, awayTeam: string): void {
    const isAlreadyStarted = this.matches.some(
      (match) =>
        match.getHomeTeam() === homeTeam && match.getAwayTeam() === awayTeam
    );

    if (isAlreadyStarted) return;

    const newMatch = new FootballMatch(homeTeam, awayTeam);

    this.matches.push(newMatch);
  }

  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ): void {
    const match = this.findMatch(homeTeam, awayTeam);

    if (match) {
      match.updateScore(homeScore, awayScore);
    }
  }

  finishMatch(homeTeam: string, awayTeam: string): void {
    this.matches = this.matches.filter(
      (match) =>
        match.getHomeTeam() !== homeTeam && match.getAwayTeam() !== awayTeam
    );
  }

  getSummaryOfMatchesInProgress(): string {
    let summary: string;

    if (this.matches.length === 0) {
      summary = "There are no matches in progress";
    } else {
      summary = this.getMatchesInOrderForSummary()
        .map((match, index) => `${index + 1}. ${match.getMatchSummary()}`)
        .join("\n");
    }

    return summary;
  }

  private getMatchesInOrderForSummary(): FootballMatch[] {
    return this.matches.reverse().sort((a, b) => {
      const aTotalScore = a.getTotalScore();
      const bTotalScore = b.getTotalScore();
      if (aTotalScore === bTotalScore) {
        return 0;
      }
      return bTotalScore - aTotalScore;
    });
  }

  private findMatch(
    homeTeam: string,
    awayTeam: string
  ): FootballMatch | undefined {
    return this.matches.find(
      (match) =>
        match.getHomeTeam() === homeTeam && match.getAwayTeam() === awayTeam
    );
  }
}
