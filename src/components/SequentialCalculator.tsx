/* SequentialCalculator.tsx */
import { useCallback, useMemo, useState } from 'react'
import type {
  ArbitrageResult,
  Match,
  CombinedBet,
} from '@/interfaces/betting.types'
import { Button } from './ui/button'
import { Calculator } from 'lucide-react'
import { CombinedBetInput } from './CombinedBetInput'
import { CounterBetsInput } from './CounterBetsInput'
import { ResultsTable } from './ResultsTable'
import { ProfitBreakdown } from './ProfitBreakdown'
import { useMediaQuery } from 'react-responsive'
import {
  calculateCombinedOdds,
  calculateAllCounterBets,
  calculateOutcomes,
} from '@/lib/utils/index'
import { CurrencySelector } from './CurrencySelector'
import { type Currency, formatMoney } from '@/lib/utils/currency'

const isValid = (stake: number, matches: Match[], counterOdds: number[]) =>
  stake > 0 &&
  matches.length > 0 &&
  counterOdds.length === matches.length &&
  matches.every((m) => m.odds > 1) &&
  counterOdds.every((o) => o > 1)

const SequentialCalculator: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [combinedStake, setCombinedStake] = useState<number>(0)
  const [counterOdds, setCounterOdds] = useState<number[]>([])
  const [result, setResult] = useState<ArbitrageResult | null>(null)
  const [currency, setCurrency] = useState<Currency>('USD')
  const combinedOdds = useMemo(
    () => (matches.length ? calculateCombinedOdds(matches) : 0),
    [matches]
  )

  const computeResult = useCallback((): ArbitrageResult | null => {
    if (!isValid(combinedStake, matches, counterOdds)) return null

    const combinedBet: CombinedBet = {
      stake: combinedStake,
      matches,
      combinedOdds,
    }
    const counterBets = calculateAllCounterBets(combinedBet, counterOdds)
    const outcomes = calculateOutcomes(combinedBet, counterBets)
    const totalInvestment =
      combinedStake + counterBets.reduce((s, b) => s + b.stake, 0)
    const guaranteedProfit = Math.min(...outcomes.map((o) => o.totalResult))

    return {
      combinedBet,
      counterBets,
      outcomes,
      totalInvestment,
      guaranteedProfit,
    }
  }, [combinedStake, matches, counterOdds, combinedOdds])

  const canCalculate = isValid(combinedStake, matches, counterOdds)
  const canClear =
    combinedStake > 0 || matches.length > 0 || counterOdds.length > 0

  const handleCalculate = () => setResult(computeResult())

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const renderMobileButtons = () =>
    isMobile && (
      <div className='flex flex-col gap-2 w-full'>
        <Button
          className='cursor-pointer'
          onClick={handleCalculate}
          disabled={!canCalculate}
          size={'lg'}
        >
          Calcular <Calculator className='h-4 w-4 mr-2' />
        </Button>
        <Button
          variant='outline'
          className='cursor-pointer'
          onClick={clearAll}
          disabled={!canClear}
          size={'lg'}
        >
          Limpiar
        </Button>
      </div>
    )

  const clearAll = () => {
    setMatches([])
    setCombinedStake(0)
    setCounterOdds([])
    setResult(null)
  }

  return (
    <div className='flex flex-col items-center my-4 mx-4 max-w-full overflow-x-hidden'>
      <div className='flex lg:px-4 flex-col md:flex-row w-full justify-center items-center mb-6'>
        <h1 className='md:text-3xl w-full text-center text-xl font-bold'>
          CALCULADORA SECUENCIAL
        </h1>
        <div className='flex pt-4 md:mt-0'>
          <CurrencySelector
            value={currency}
            onChange={(c) => {
              setCurrency(c)
              setResult(null)
            }}
          />
          {!isMobile && (
            <div className='mt-4 md:mt-0 mb-2 md:mb-0'>
              <div className='flex gap-2 w-full justify-end mt-4 md:mt-0'>
                <Button
                  className='cursor-pointer'
                  variant='outline'
                  onClick={clearAll}
                  disabled={!canClear}
                >
                  Limpiar
                </Button>
                <Button
                  className='cursor-pointer'
                  onClick={handleCalculate}
                  disabled={!canCalculate}
                >
                  <Calculator className='h-4 w-4 mr-2' /> Calcular
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='space-y-6 w-full '>
        <div className='flex flex-col md:flex-row md:justify-center gap-6'>
          <CombinedBetInput
            stake={combinedStake}
            onStakeChange={(v) => {
              setCombinedStake(v)
              setResult(null)
            }}
            matches={matches}
            onMatchesChange={(m) => {
              setMatches(m)
              setResult(null)
            }}
            combinedOdds={combinedOdds}
          />
          <CounterBetsInput
            matches={matches}
            counterOdds={counterOdds}
            onCounterOddsChange={(o) => {
              setCounterOdds(o)
              setResult(null)
            }}
            result={result}
          />
        </div>

        {renderMobileButtons()}

        {result && (
          <>
            <ResultsTable
              outcomes={result.outcomes}
              currency={currency}
              format={formatMoney}
            />
            <ProfitBreakdown
              result={result}
              currency={currency}
              format={formatMoney}
            />
          </>
        )}
      </div>
    </div>
  )
}

export default SequentialCalculator
