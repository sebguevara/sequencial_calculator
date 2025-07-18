import type { Match } from '@/interfaces/betting.types'
import { TableCell } from './Table'
import { TableRow } from './Table'
import { Input } from './ui/input'
import { formatMoney } from '@/lib/utils/currency'
import type { Currency } from '@/lib/utils/currency'

export const CounterBetRow: React.FC<{
  match: Match
  index: number
  counterOdd: number
  calculatedStake: number | undefined
  onOddChange: (value: number) => void
  currency: Currency
}> = ({ match, index, counterOdd, calculatedStake, onOddChange, currency }) => (
  <TableRow>
    <TableCell className='font-medium'>{index + 1}</TableCell>
    <TableCell>
      {match.homeTeam && match.awayTeam
        ? `${match.homeTeam} - ${match.awayTeam}`
        : `Partido ${index + 1}`}
    </TableCell>
    <TableCell>
      <Input
        type='number'
        value={counterOdd || ''}
        onChange={(e) => onOddChange(parseFloat(e.target.value) || 0)}
        className='w-24'
      />
    </TableCell>
    <TableCell>
      {calculatedStake ? `${formatMoney(calculatedStake, currency)}` : '-'}
    </TableCell>
  </TableRow>
)
