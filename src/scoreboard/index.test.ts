import { LiveFootballScoreboard, FootballMatch } from ".";

describe("Scoreboard", () => {
  let scoreboard: LiveFootballScoreboard;

  beforeEach(() => {
    scoreboard = new LiveFootballScoreboard();
  });

  it("starts a match with initial score 0-0 and adds it to the scoreboard", () => {
    const match = new FootballMatch("Mexico", "Canada");

    scoreboard.startMatch(match);

    const matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    expect(matches[0].getTotalScore()).toBe(0);
  });

  it("does not start a match that is already ongoing", () => {
    const matchOne = new FootballMatch("Mexico", "Canada");
    const matchTwo = new FootballMatch("Mexico", "Canada");

    scoreboard.startMatch(matchOne);
    scoreboard.startMatch(matchTwo);

    const matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    expect(matches[0].getTotalScore()).toBe(0);
  });

  it("updates scores for multiple matches", () => {
    const matchOne = new FootballMatch("Mexico", "Canada");
    const matchTwo = new FootballMatch("Germany", "France");

    scoreboard.startMatch(matchOne);
    scoreboard.startMatch(matchTwo);

    matchOne.updateScore(10, 2);
    matchTwo.updateScore(2, 2);

    const matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(2);

    expect(matches[0].getHomeScore()).toBe(10);
    expect(matches[0].getAwayScore()).toBe(2);

    expect(matches[1].getHomeScore()).toBe(2);
    expect(matches[1].getAwayScore()).toBe(2);
  });

  it("does not affect the scoreboard when you update score on a match that is not in the scoreboard", () => {
    const match = new FootballMatch("Uruguay", "Italy");

    match.updateScore(6, 6);

    const matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(0);
  });

  it("finishes a match and removes it from the score board", () => {
    let matches: FootballMatch[];

    const match = new FootballMatch("England", "Portugal");

    scoreboard.startMatch(match);

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    scoreboard.finishMatch(match);

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(0);
  });

  it("does not finish non-existent matches", () => {
    let matches: FootballMatch[];

    const matchOne = new FootballMatch("England", "Portugal");
    const matchTwo = new FootballMatch("Mexico", "Canada");

    scoreboard.startMatch(matchOne);

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);

    scoreboard.finishMatch(matchTwo);

    matches = scoreboard.getMatchesInProgress();

    expect(matches).toHaveLength(1);
  });

  it("gets the summary of all matches ordered by total score and most recently started", () => {
    const matchOne = new FootballMatch("Mexico", "Canada");
    const matchTwo = new FootballMatch("Spain", "Brazil");
    const matchThree = new FootballMatch("Germany", "France");
    const matchFour = new FootballMatch("Uruguay", "Italy");
    const matchFive = new FootballMatch("Argentina", "Australia");

    scoreboard.startMatch(matchOne);
    scoreboard.startMatch(matchTwo);
    scoreboard.startMatch(matchThree);
    scoreboard.startMatch(matchFour);
    scoreboard.startMatch(matchFive);

    matchOne.updateScore(0, 5);
    matchTwo.updateScore(10, 2);
    matchThree.updateScore(2, 2);
    matchFour.updateScore(6, 6);
    matchFive.updateScore(3, 1);

    const summary = scoreboard.getSummaryOfMatchesInProgress();
    const summaryLines = summary.split("\n");

    expect(summaryLines).toHaveLength(5);

    expect(summaryLines[0]).toEqual("1. Uruguay 6 - Italy 6");
    expect(summaryLines[1]).toEqual("2. Spain 10 - Brazil 2");
    expect(summaryLines[2]).toEqual("3. Mexico 0 - Canada 5");
    expect(summaryLines[3]).toEqual("4. Argentina 3 - Australia 1");
    expect(summaryLines[4]).toEqual("5. Germany 2 - France 2");
  });

  it("doesn't return a summary when there are no ongoing matches", () => {
    const summary = scoreboard.getSummaryOfMatchesInProgress();

    expect(summary).toEqual("There are no matches in progress");
  });
});
