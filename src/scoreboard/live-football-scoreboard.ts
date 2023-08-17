import { FootballMatch } from "./football-match";

export class LiveFootballScoreboard {
  matches: FootballMatch[];

  constructor() {
    this.matches = [];
  }

  private findMatch(
    homeTeam: string,
    awayTeam: string
  ): FootballMatch | undefined {
    return this.matches.find(
      (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
    );
  }

  getMatchesInProgress(): FootballMatch[] {
    return this.matches;
  }

  startMatch(homeTeam: string, awayTeam: string) {
    const isAlreadyStarted = this.matches.some(
      (match) => match.homeTeam === homeTeam && match.awayTeam === awayTeam
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
  ) {
    const match = this.findMatch(homeTeam, awayTeam);

    if (match) {
      match.updateScore(homeScore, awayScore);
    }
  }

  finishMatch(homeTeam: string, awayTeam: string) {
    this.matches = this.matches.filter(
      (match) => match.homeTeam !== homeTeam && match.awayTeam !== awayTeam
    );
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

  getSummaryOfMatchesInProgress(): string {
    let summary: string;

    if (this.matches.length === 0) {
      summary = "There are no matches in progress";
    } else {
      summary = this.getMatchesInOrderForSummary()
        .map((match, index) => {
          return `${index + 1}. ${match.homeTeam} ${match.homeScore} - ${
            match.awayTeam
          } ${match.awayScore}`;
        })
        .join("\n");
    }

    return summary;
  }
}
