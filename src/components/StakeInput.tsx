import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const StakeInput: React.FC<{
    stake: number;
    combinedOdds: number;
    onStakeChange: (stake: number) => void;
  }> = ({ stake, combinedOdds, onStakeChange }) => (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="stake">Importe</Label>
        <Input
          id="stake"
          type="number"
          value={stake || ''}
          onChange={(e) => onStakeChange(parseFloat(e.target.value) || 0)}
          placeholder="0"
          className="mt-1"
        />
      </div>
      <div>
        <Label>Cuota combinada</Label>
        <Input
          value={combinedOdds.toFixed(4)}
          readOnly
          className="mt-1 bg-gray-50"
        />
      </div>
    </div>
  );