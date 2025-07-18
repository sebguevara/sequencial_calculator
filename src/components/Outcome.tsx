import type { OutcomeScenario } from "@/interfaces/betting.types";
import { TableCell, TableRow } from "./Table";

export const OutcomeRow: React.FC<{ outcome: OutcomeScenario }> = ({ outcome }) => (
    <TableRow>
      <TableCell className="font-medium">{outcome.description}</TableCell>
      <TableCell className={outcome.bookmaker1Result >= 0 ? 'text-green-600' : 'text-red-600'}>
        €{outcome.bookmaker1Result.toFixed(2)}
      </TableCell>
      <TableCell className={outcome.bookmaker2Result >= 0 ? 'text-green-600' : 'text-red-600'}>
        €{outcome.bookmaker2Result.toFixed(2)}
      </TableCell>
      <TableCell className={`font-bold ${outcome.totalResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        €{outcome.totalResult.toFixed(2)}
      </TableCell>
    </TableRow>
  );