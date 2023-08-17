interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

interface Scoreboard {
  startMatch(homeTeam: string, awayTeam: string): void;
  getMatchesInProgress(): Match[];
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
}

class LiveFootballScoreboard implements Scoreboard {
  matches: FootballMatch[];

  constructor() {
    this.matches = [];
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
}

export { LiveFootballScoreboard, Scoreboard, Match, FootballMatch };
