interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  updateScore(homeScore: number, awayScore: number): void;
}

interface Scoreboard {
  startMatch(homeTeam: string, awayTeam: string): void;
  updateScore(
    homeTeam: string,
    awayTeam: string,
    homeScore: number,
    awayScore: number
  ): void;
  getMatchesInProgress(): Match[];
  finishMatch(homeTeam: string, awayTeam: string): void;
}

class FootballMatch implements Match {
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

  updateScore(homeScore: number, awayScore: number) {
    this.homeScore = homeScore;
    this.awayScore = awayScore;
  }
}

class LiveFootballScoreboard implements Scoreboard {
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

  getMatchesInProgress(): Match[] {
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
}

export { LiveFootballScoreboard, Scoreboard, Match, FootballMatch };
