import { Label } from "./ui/label";

export const SummaryStats: React.FC<{
    totalInvestment: number;
    guaranteedProfit: number;
  }> = ({ totalInvestment, guaranteedProfit }) => (
    <div className="flex gap-4 justify-between">
      <div className="flex flex-col items-center">
        <Label>Inversión total</Label>
        <p className="text-2xl font-bold">€{totalInvestment.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center">
        <Label>Beneficio</Label>
        <p className={`text-2xl font-bold ${guaranteedProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
          €{guaranteedProfit.toFixed(2)}
        </p>
      </div>
    </div>
  );