export interface Contestant {
  code: string;
  name: string;
}

export interface Competition {
  name: string;
}

export interface MatchInfo {
  id: string;
  contestant: Contestant[];
  time: string;
  competition?: Competition;
}

export interface LiveData {
  matchDetails?: {
    matchStatus?: "Fixture" | "Played" | string;
    scores?: {
      ft?: {
        home?: number;
        away?: number;
      };
    };
  };
}

export interface Fixture {
  matchInfo: MatchInfo;
  liveData?: LiveData;
}
