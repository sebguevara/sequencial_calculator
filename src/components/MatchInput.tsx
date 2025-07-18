import type { Match } from '@/interfaces/betting.types'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { Input } from './ui/input'

export const MatchInput: React.FC<{
  match: Match
  index: number
  onUpdate: (id: string, field: keyof Match, value: string | number) => void
  onRemove: (id: string) => void
}> = ({ match, index, onUpdate, onRemove }) => (
  <div className='border rounded-lg p-3 space-y-2'>
    <div className='flex justify-between items-center'>
      <span className='font-medium'>Partido {index + 1}</span>
      <Button size='sm' variant='ghost' onClick={() => onRemove(match.id)}>
        <Trash2 className='h-4 w-4' />
      </Button>
    </div>
    <div className='grid grid-cols-2 gap-2'>
      <Input
        placeholder='Equipo local'
        value={match.homeTeam}
        onChange={(e) => onUpdate(match.id, 'homeTeam', e.target.value)}
      />
      <Input
        placeholder='Equipo visitante'
        value={match.awayTeam}
        onChange={(e) => onUpdate(match.id, 'awayTeam', e.target.value)}
      />
    </div>
    <div className='grid grid-cols-2 gap-2'>
      <Input
        placeholder='Mercado (ej: 1X2:G2)'
        value={match.market}
        onChange={(e) => onUpdate(match.id, 'market', e.target.value)}
      />
      <Input
        type='number'
        placeholder='Cuota'
        value={match.odds || ''}
        onChange={(e) =>
          onUpdate(match.id, 'odds', parseFloat(e.target.value) || 0)
        }
      />
    </div>
  </div>
)
