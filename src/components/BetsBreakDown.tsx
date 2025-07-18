import type { ArbitrageResult } from '@/interfaces/betting.types'
import type { Currency } from '@/lib/utils/currency'

export const BetsBreakdown: React.FC<{
  result: ArbitrageResult
  currency: Currency
  format: (amount: number, currency: Currency) => string
}> = ({ result, currency, format }) => (
  <div className='space-y-2'>
    <h4 className='font-medium'>Desglose de apuestas:</h4>
    <div className='space-y-1 text-sm'>
      <div className='flex justify-between'>
        <span>Combinada (Bookmaker #1):</span>
        <span>{format(result.combinedBet.stake, currency)}</span>
      </div>
      {result.counterBets.map((bet, index) => (
        <div key={index} className='flex justify-between'>
          <span>Línea {bet.lineNumber} (Bookmaker #2):</span>
          <span>{format(bet.stake, currency)}</span>
        </div>
      ))}
    </div>
  </div>
)
