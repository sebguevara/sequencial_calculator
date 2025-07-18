import { useCallback, useEffect, useMemo, useState } from "react";
import type { ArbitrageResult, Match } from "@/interfaces/betting.types";
import { calculateCombinedOdds, calculateAllCounterBets, calculateOutcomes } from "@/lib/utils/index";
import type { CombinedBet } from "@/interfaces/betting.types";
import { Button } from "./ui/button";
import { Calculator } from "lucide-react";
import { CombinedBetInput } from "./CombinedBetInput";
import { CounterBetsInput } from "./CounterBetsInput";
import { ResultsTable } from "./ResultsTable";
import { ProfitBreakdown } from "./ProfitBreakdown";

const isValid = (
  stake: number,
  matches: Match[],
  counterOdds: number[],
) => {
  if (stake <= 0) return false;
  if (matches.length === 0) return false;
  if (counterOdds.length !== matches.length) return false;
  if (matches.some(m => m.odds <= 1)) return false;
  if (counterOdds.some(o => o <= 1)) return false;
  return true;
};

const SequentialCalculator: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [combinedStake, setCombinedStake] = useState<number>(0);
  const [counterOdds, setCounterOdds] = useState<number[]>([]);
  const [result, setResult] = useState<ArbitrageResult | null>(null);

  const combinedOdds = useMemo(() => {
    return matches.length
      ? calculateCombinedOdds(matches)
      : 0;
  }, [matches]);

  const computeResult = useCallback((): ArbitrageResult | null => {
    if (!isValid(combinedStake, matches, counterOdds)) return null;

    const combinedBet: CombinedBet = {
      stake: combinedStake,
      matches,
      combinedOdds,
    };

    const counterBets      = calculateAllCounterBets(combinedBet, counterOdds);
    const outcomes         = calculateOutcomes(combinedBet, counterBets);
    const totalInvestment  = combinedStake + counterBets.reduce((s, b) => s + b.stake, 0);
    const guaranteedProfit = Math.min(...outcomes.map(o => o.totalResult));

    return { combinedBet, counterBets, outcomes, totalInvestment, guaranteedProfit };
  }, [combinedStake, matches, counterOdds, combinedOdds]);

  useEffect(() => {
    setResult(computeResult());
  }, [computeResult]);

  const canCalculate = isValid(combinedStake, matches, counterOdds);
  const canClear     = combinedStake > 0 || matches.length || counterOdds.length;

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-0 my-4">
      <div className="flex lg:px-4 flex-col lg:flex-row w-full justify-center items-center mb-6">
        <h1 className="md:text-3xl md:text-start w-full text-center text-xl font-bold">CALCULADORA SECUENCIAL</h1>
        <div className="flex gap-2 w-full justify-end mt-4 md:mt-0">
          <Button variant="outline" onClick={() => {
            setMatches([]);
            setCombinedStake(0);
            setCounterOdds([]);
            setResult(null);
          }} disabled={!canClear}>
            Limpiar
          </Button>
          <Button onClick={() => setResult(computeResult())} disabled={!canCalculate}>
            <Calculator className="h-4 w-4 mr-2" /> Calcular
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <CombinedBetInput
            stake={combinedStake}
            onStakeChange={setCombinedStake}
            matches={matches}
            onMatchesChange={setMatches}
            combinedOdds={combinedOdds}
          />
          <CounterBetsInput
            matches={matches}
            counterOdds={counterOdds}
            onCounterOddsChange={setCounterOdds}
            result={result}
          />
        </div>

        {result && (
          <>
            <ResultsTable outcomes={result.outcomes} />
            <ProfitBreakdown result={result} />
          </>
        )}
      </div>
    </div>
  );
};

export default SequentialCalculator;