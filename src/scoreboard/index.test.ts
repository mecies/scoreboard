import { LiveFootballScoreboard, Scoreboard, Match } from ".";

describe("Scoreboard", () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new LiveFootballScoreboard();
  });

  it("starts a match with initial score 0-0 and adds it to the scoreboard", () => {
    scoreboard.startMatch("Mexico", "Canada");

    const matches: Match[] = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    expect(matches[0].homeScore).toBe(0);
    expect(matches[0].awayScore).toBe(0);
  });

  it("does not start a match that is already ongoing", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.startMatch("Mexico", "Canada");

    const matches: Match[] = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    expect(matches[0].homeScore).toBe(0);
    expect(matches[0].awayScore).toBe(0);
  });

  it("updates scores for multiple matches", () => {
    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.startMatch("Germany", "France");

    scoreboard.updateScore("Spain", "Brazil", 10, 2);
    scoreboard.updateScore("Germany", "France", 2, 2);

    const matches: Match[] = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(2);

    expect(matches[0].homeScore).toBe(10);
    expect(matches[0].awayScore).toBe(2);

    expect(matches[1].homeScore).toBe(2);
    expect(matches[1].awayScore).toBe(2);
  });

  it("does not update non-existent matches", () => {
    scoreboard.startMatch("Uruguay", "Italy");

    scoreboard.updateScore("Uruguay", "Italy", 6, 6);
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

    const matches: Match[] = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    expect(matches[0].homeScore).toBe(6);
    expect(matches[0].awayScore).toBe(6);
  });

  it("finishes a match and removes it from the score board", () => {
    let matches: Match[];

    scoreboard.startMatch("England", "Portugal");

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    scoreboard.finishMatch("England", "Portugal");

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(0);
  });

  it("does not finish non-existent matches", () => {
    let matches: Match[];

    scoreboard.startMatch("England", "Portugal");

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    scoreboard.finishMatch("Germany", "Uruguay");

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);
  });

  it("gets the summary of all matches ordered by total score and most recently started", () => {
    scoreboard.startMatch("Mexico", "Canada");
    scoreboard.startMatch("Spain", "Brazil");
    scoreboard.startMatch("Germany", "France");
    scoreboard.startMatch("Uruguay", "Italy");
    scoreboard.startMatch("Argentina", "Australia");

    scoreboard.updateScore("Mexico", "Canada", 0, 5);
    scoreboard.updateScore("Spain", "Brazil", 10, 2);
    scoreboard.updateScore("Germany", "France", 2, 2);
    scoreboard.updateScore("Uruguay", "Italy", 6, 6);
    scoreboard.updateScore("Argentina", "Australia", 3, 1);

    const summary = scoreboard.getSummaryOfMatchesInProgress();

    expect(summary).toEqual(`
      1. Uruguay 6 - Italy 6
      2. Spain 10 - Brazil 2
      3. Mexico 0 - Canada 5
      4. Argentina 3 - Australia 1
      5. Germany 2 - France 2
    `);
  });

  it("doesn't return a summary when there are no ongoing matches", () => {
    const summary = scoreboard.getSummaryOfMatchesInProgress();

    expect(summary).toEqual("There are no matches in progress");
  });
});
