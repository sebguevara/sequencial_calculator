import type { OutcomeScenario } from '@/interfaces/betting.types'
import { TableCell, TableRow } from './Table'
import type { Currency } from '@/lib/utils/currency'

export const OutcomeRow: React.FC<{
  outcome: OutcomeScenario
  currency: Currency
  format: (amount: number, currency: Currency) => string
}> = ({ outcome, currency, format }) => (
  <TableRow>
    <TableCell className='font-medium'>{outcome.description}</TableCell>
    <TableCell
      className={
        outcome.bookmaker1Result >= 0 ? 'text-green-600' : 'text-red-600'
      }
    >
      {format(outcome.bookmaker1Result, currency)}
    </TableCell>
    <TableCell
      className={
        outcome.bookmaker2Result >= 0 ? 'text-green-600' : 'text-red-600'
      }
    >
      {format(outcome.bookmaker2Result, currency)}
    </TableCell>
    <TableCell
      className={`font-bold ${outcome.totalResult >= 0 ? 'text-green-600' : 'text-red-600'}`}
    >
      {format(outcome.totalResult, currency)}
    </TableCell>
  </TableRow>
)
