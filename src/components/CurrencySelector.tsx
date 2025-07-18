import type { Currency } from '@/lib/utils/currency'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const CurrencySelector: React.FC<{
  value: Currency
  onChange: (c: Currency) => void
}> = ({ value, onChange }) => {
  return (
    <div className='flex items-center gap-2'>
      <label className='text-sm font-medium'>Moneda:</label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as Currency)}
      >
        <SelectTrigger>
          <SelectValue placeholder='Moneda' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='USD'>USD $</SelectItem>
          <SelectItem value='EUR'>EUR €</SelectItem>
          <SelectItem value='COP'>COP $</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
