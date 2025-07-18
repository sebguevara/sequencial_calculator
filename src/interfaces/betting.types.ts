export interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  date: Date
  market: string
  odds: number
}

export interface CombinedBet {
  stake: number
  matches: Match[]
  combinedOdds: number
}

export interface CounterBet {
  lineNumber: number
  odds: number
  stake: number
  match: Match
}

export interface ArbitrageResult {
  combinedBet: CombinedBet
  counterBets: CounterBet[]
  outcomes: OutcomeScenario[]
  totalInvestment: number
  guaranteedProfit: number
}

export interface OutcomeScenario {
  description: string
  bookmaker1Result: number
  bookmaker2Result: number
  totalResult: number
  winningBets: string[]
  losingBets: string[]
}
