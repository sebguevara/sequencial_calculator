import type { ArbitrageResult } from "@/interfaces/betting.types";

export const BetsBreakdown: React.FC<{ result: ArbitrageResult }> = ({ result }) => (
    <div className="space-y-2">
      <h4 className="font-medium">Desglose de apuestas:</h4>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span>Combinada (Bookmaker #1):</span>
          <span>€{result.combinedBet.stake.toFixed(2)}</span>
        </div>
        {result.counterBets.map((bet, index) => (
          <div key={index} className="flex justify-between">
            <span>Línea {bet.lineNumber} (Bookmaker #2):</span>
            <span>€{bet.stake.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );