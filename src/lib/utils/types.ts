export interface IFortniteStatusResponse {
  matchesPlayed: string;
  totalScore: string;
  scorePerMatch: string;
  totalKills: string;
  totalDeaths: string;
  killsPerMatch: string;
  killsPerDeath: string;
  victories: string;
  silverPlacements: string;
  bronzePlacements: string;

  modes: {
    all: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };

    solo: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };

    duo: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };

    squad: {
      matches: string;
      victory: string;
      silver: string;
      bronze: string;
    };
  };
}
