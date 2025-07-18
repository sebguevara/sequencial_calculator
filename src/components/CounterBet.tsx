import type { Match } from '@/interfaces/betting.types'
import { TableCell } from './Table'
import { TableRow } from './Table'
import { Input } from './ui/input'

export const CounterBetRow: React.FC<{
  match: Match
  index: number
  counterOdd: number
  calculatedStake: number | undefined
  onOddChange: (value: number) => void
}> = ({ match, index, counterOdd, calculatedStake, onOddChange }) => (
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
      {calculatedStake ? `€${calculatedStake.toFixed(2)}` : '-'}
    </TableCell>
  </TableRow>
)
