import { Label } from "./ui/label";

export const SummaryStats: React.FC<{
    totalInvestment: number;
    guaranteedProfit: number;
  }> = ({ totalInvestment, guaranteedProfit }) => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Inversión total</Label>
        <p className="text-2xl font-bold">€{totalInvestment.toFixed(2)}</p>
      </div>
      <div>
        <Label>Beneficio garantizado</Label>
        <p className={`text-2xl font-bold ${guaranteedProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
          €{guaranteedProfit.toFixed(2)}
        </p>
      </div>
    </div>
  );