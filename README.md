# Live Football World Cup Scoreboard

The Live Football World Cup Scoreboard is a TypeScript library that allows you to manage ongoing football matches and their scores. This library provides a simple and intuitive way to start matches, update scores, finish matches, and retrieve match summaries.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

To install the Live Football World Cup Scoreboard library, you can use your preferred package manager. For example, using npm:

`npm install scoreboard-mecies`

## Usage

```typescript
import { LiveFootballScoreboard, FootballMatch } from "scoreboard-mecies";

// Create a new scoreboard instance
const scoreboard = new LiveFootballScoreboard();

// Create a new match
const match = new FootballMatch("Mexico", "Canada");

// Start a match
scoreboard.startMatch(match);

// Update match scores
match.updateScore(0, 5);

// Finish a match (removes the match from the scoreboard)
scoreboard.finishMatch(match);

// Get ongoing matches summary
const summary = scoreboard.getSummaryOfMatchesInProgress();

// Print summary
console.log(summary);
```
