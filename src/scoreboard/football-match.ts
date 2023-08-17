export class FootballMatch {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;

  constructor(homeTeam: string, awayTeam: string) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeScore = 0;
    this.awayScore = 0;
  }

  getTotalScore(): number {
    return this.homeScore + this.awayScore;
  }

  updateScore(homeScore: number, awayScore: number) {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }
}
