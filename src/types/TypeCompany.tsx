export interface TypeCompany {
  ticker_id: string;
  ticker_name: string;
  industry_group: string;
}

export interface TypePeerMap {
  ticker_name: string;
  ticker_market_cap: number;
  signals_average: number;
  signals_count: number;
}

export interface TypePeerMaps {
  data: TypePeerMap[];
  data_type: string;
}

export interface TypeSectorPerformance {
  topic: string;
  subtopic: string;
  company_sentiment: number;
  nearest_neighbours_sentiment: number;
}

export interface TypeSectorPerformances {
  data: TypeSectorPerformance[];
  data_type: string;
}

export interface TypeCompanySummary {
  data: [TypePeerMaps, TypeSectorPerformances];
  data_type: string;
  ticker: string;
}

export interface TypeCompanyScore {
  ticker_id: string;
  ticker_name: string;
  score: number;
}

export interface TypeCompanyScores {
  data_type: string;
  data: TypeCompanyScore[];
}

export interface TypeSubTopicScore {
  sub_topic: string;
  score: number;
}

export interface TypeTopicScores {
  topic: string;
  scores: TypeSubTopicScore[];
}
