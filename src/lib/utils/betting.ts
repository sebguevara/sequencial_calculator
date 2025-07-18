import type { CombinedBet, CounterBet, OutcomeScenario } from "../../interfaces/betting.types";
import { computeArbitrage } from "./arbitrage";
import { product } from "./math";

/** ① Cuota combinada (por si todavía no la tienes) */
export const calculateCombinedOdds = (matches: CombinedBet["matches"]): number =>
  product(matches.map(m => m.odds));

/** ② Calcula todos los CounterBets usando la lógica exacta de arbitraje */
export const calculateAllCounterBets = (
  combinedBet: CombinedBet,
  counterOdds: number[]
): CounterBet[] => {
  const { lineStakes } = computeArbitrage(
    combinedBet.stake,
    combinedBet.combinedOdds,
    counterOdds
  );
  return combinedBet.matches.map((match, i) => ({
    lineNumber: i + 1,
    odds: counterOdds[i],
    stake: lineStakes[i],
    match,
  }));
};

/** ③ Genera la tabla de escenarios (igual que la calculadora) */
export const calculateOutcomes = (
  combinedBet: CombinedBet,
  counterBets: CounterBet[]
): OutcomeScenario[] => {
  const outcomes: OutcomeScenario[] = [];

  // Escenarios donde “falla” exactamente una línea
  counterBets.forEach((cb, idx) => {
    const prevStake = counterBets.slice(0, idx).reduce((s, b) => s + b.stake, 0);
    const winnings  = cb.stake * cb.odds;
    const total     = winnings - prevStake - combinedBet.stake - cb.stake;

    outcomes.push({
      description: `Pierde partido ${idx + 1}: ${cb.match.homeTeam} - ${cb.match.awayTeam}`,
      bookmaker1Result: -combinedBet.stake,
      bookmaker2Result: winnings - prevStake - cb.stake,
      totalResult: total,
      winningBets:  [`Línea ${idx + 1}`],
      losingBets:   ['Combinada', ...counterBets.slice(0, idx).map((_, i) => `Línea ${i + 1}`)]
    });
  });

  // Escenario “gana todo” (la combinada)
  const combWin   = combinedBet.stake * combinedBet.combinedOdds;
  const counterΣ  = counterBets.reduce((s, b) => s + b.stake, 0);
  const totalAllW = combWin - combinedBet.stake - counterΣ;

  outcomes.push({
    description: 'Gana la combinada',
    bookmaker1Result: combWin - combinedBet.stake,
    bookmaker2Result: -counterΣ,
    totalResult: totalAllW,
    winningBets: ['Combinada'],
    losingBets:  counterBets.map((_, i) => `Línea ${i + 1}`)
  });

  return outcomes;
};