import type { ArbitrageResult } from '@/interfaces/betting.types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { SummaryStats } from './Summary'
import { ProfitAlert } from './ProfitAlert'
import { BetsBreakdown } from './BetsBreakDown'
import type { Currency } from '@/lib/utils/currency'

export const ProfitBreakdown: React.FC<{
  result: ArbitrageResult
  currency: Currency
  format: (amount: number, currency: Currency) => string
}> = ({ result, currency, format }) => {
  const profitPercentage = (
    (result.guaranteedProfit / result.totalInvestment) *
    100
  ).toFixed(2)
  const isProfitable = result.guaranteedProfit > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de la operación</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <SummaryStats
          totalInvestment={format(result.totalInvestment, currency)}
          guaranteedProfit={format(result.guaranteedProfit, currency)}
        />
        <ProfitAlert
          isProfitable={isProfitable}
          profitPercentage={Number(profitPercentage)}
        />
        <BetsBreakdown result={result} currency={currency} format={format} />
      </CardContent>
    </Card>
  )
}
