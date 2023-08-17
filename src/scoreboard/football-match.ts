export class FootballMatch {
  private homeTeam: string;
  private awayTeam: string;
  private homeScore: number;
  private awayScore: number;

  constructor(homeTeam: string, awayTeam: string) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
  }

  getHomeScore(): number {
    return this.homeScore;
  }

  getAwayScore(): number {
    return this.awayScore;
  }

  getHomeTeam(): string {
    return this.homeTeam;
  }

  getAwayTeam(): string {
    return this.awayTeam;
  }

  getTotalScore(): number {
    return this.getHomeScore() + this.getAwayScore();
  }

  getMatchSummary(): string {
    return `${this.homeTeam} ${this.homeScore} - ${this.awayTeam} ${this.awayScore}`;
  }

  updateScore(homeScore: number, awayScore: number): void {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }
}
