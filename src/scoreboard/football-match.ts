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
    return `${this.getHomeTeam()} ${this.getHomeScore()} - ${this.getAwayTeam()} ${this.getAwayScore()}`;
  }

  updateScore(homeScore: number, awayScore: number): void {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }

  isSame(otherHomeTeam: string, otherAwayTeam: string): boolean {
    return (
      this.getHomeTeam() === otherHomeTeam &&
      this.getAwayTeam() === otherAwayTeam
    );
  }
}
