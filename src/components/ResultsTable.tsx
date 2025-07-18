import type { OutcomeScenario } from '@/interfaces/betting.types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Table, TableBody, TableHead, TableHeader, TableRow } from './Table'
import { OutcomeRow } from './Outcome'
import type { Currency } from '@/lib/utils/currency'

export const ResultsTable: React.FC<{
  outcomes: OutcomeScenario[]
  currency: Currency
  format: (amount: number, currency: Currency) => string
}> = ({ outcomes, currency, format }) => {
  return (
    <Card className='w-full overflow-x-auto'>
      <CardHeader>
        <CardTitle>Desglose de beneficios</CardTitle>
        <CardDescription>
          Resultados para cada escenario posible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table className='min-w-[520px] text-sm md:text-base'>
          <TableHeader>
            <TableRow>
              <TableHead>Resultado</TableHead>
              <TableHead>Bookmaker #1</TableHead>
              <TableHead>Bookmaker #2</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outcomes.map((outcome, index) => (
              <OutcomeRow
                key={index}
                outcome={outcome}
                currency={currency}
                format={format}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
