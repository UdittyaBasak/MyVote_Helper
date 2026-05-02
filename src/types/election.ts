export interface PartyData {
  name: string;
  logo: string;
  ideology: string;
  manifestoPoints: string[];
}

export interface CandidateData {
  id: string;
  name: string;
  party: string;
  education: string;
  assets: string;
  criminalCases: number;
}

export interface ElectionInfo {
  dates: string;
  constituencyStats: string;
  pollingStations: string;
  historicalTurnout: string;
}

export interface TimelineEvent {
  phase: string;
  date: string;
  description: string;
}

export interface FAQ {
  q: string;
  a: string;
}
