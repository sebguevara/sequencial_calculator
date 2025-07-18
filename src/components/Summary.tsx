import { Label } from './ui/label'

export const SummaryStats: React.FC<{
  totalInvestment: string
  guaranteedProfit: string
}> = ({ totalInvestment, guaranteedProfit }) => (
  <div className='flex gap-4 justify-between'>
    <div className='flex flex-col items-center'>
      <Label>Inversión total</Label>
      <p className='text-2xl font-bold'>{totalInvestment}</p>
    </div>
    <div className='flex flex-col items-center'>
      <Label>Beneficio</Label>
      <p
        className={`text-2xl font-bold ${Number(guaranteedProfit) > 0 ? 'text-green-600' : 'text-red-600'}`}
      >
        {guaranteedProfit}
      </p>
    </div>
  </div>
)
