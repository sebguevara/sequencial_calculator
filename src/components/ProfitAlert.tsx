import { Alert, AlertDescription } from './ui/alert'
import { AlertCircle } from 'lucide-react'

export const ProfitAlert: React.FC<{
  isProfitable: boolean
  profitPercentage: number
}> = ({ isProfitable, profitPercentage }) => (
  <Alert className={isProfitable ? 'border-green-500' : 'border-red-500'}>
    <AlertCircle className='h-4 w-4' />
    <AlertDescription>
      {isProfitable
        ? `¡Arbitraje rentable! Obtendrás un ${profitPercentage.toFixed(2)}% de beneficio garantizado.`
        : `Esta operación generará una pérdida del ${Math.abs(profitPercentage).toFixed(2)}% en todos los escenarios.`}
    </AlertDescription>
  </Alert>
)
