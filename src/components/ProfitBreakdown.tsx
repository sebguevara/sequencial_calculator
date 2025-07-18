import type { ArbitrageResult } from "@/interfaces/betting.types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { SummaryStats } from "./Summary";
import { ProfitAlert } from "./ProfitAlert";
import { BetsBreakdown } from "./BetsBreakDown";

export const ProfitBreakdown: React.FC<{ result: ArbitrageResult }> = ({ result }) => {
    const profitPercentage = (result.guaranteedProfit / result.totalInvestment) * 100;
    const isProfitable = result.guaranteedProfit > 0;
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Resumen de la operación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <SummaryStats
            totalInvestment={result.totalInvestment}
            guaranteedProfit={result.guaranteedProfit}
          />
          <ProfitAlert
            isProfitable={isProfitable}
            profitPercentage={profitPercentage}
          />
          <BetsBreakdown result={result} />
        </CardContent>
      </Card>
    );
  };