import { ElectionInfo, PartyData, CandidateData } from '@/types/election';

export const electionService = {
  // Mock BigQuery Integration
  fetchElectionOverview: async (): Promise<ElectionInfo> => {
    return new Promise((resolve) => setTimeout(() => resolve({
      dates: "Every 5 years (unless dissolved sooner)",
      constituencyStats: "543 Elected Members | Reserved: 84 (SC), 47 (ST)",
      pollingStations: "10.5 Lakh", // Based on recent general elections estimate
      historicalTurnout: "67.4% (2019 General Election)"
    }), 800));
  },

  // Mock Vertex AI / BigQuery Integration
  fetchComparativeData: async (constituency: string) => {
    return new Promise<{ party: PartyData, candidate: CandidateData }>((resolve) => {
      setTimeout(() => {
        resolve({
          party: {
            name: "Sovereign Democratic Party",
            logo: "SDP",
            ideology: "Progressive Center-Right",
            manifestoPoints: [
              "Universal Digital Basic Infrastructure",
              "Green Energy Subsidy for Farmers",
              "AI-driven Healthcare Access"
            ]
          },
          candidate: {
            id: "cand_1",
            name: "Dr. Ananya Sharma",
            party: "SDP",
            education: "Ph.D. in Economics",
            assets: "₹2.5 Cr",
            criminalCases: 0
          }
        });
      }, 1000);
    });
  }
};
