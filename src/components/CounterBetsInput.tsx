import type { Match } from "@/interfaces/betting.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./Table";
import { CounterBetRow } from "./CounterBet";
import type { ArbitrageResult } from "@/interfaces/betting.types";
import { useEffect } from "react";
    
export const CounterBetsInput: React.FC<{
    matches: Match[];
    counterOdds: number[];
    onCounterOddsChange: (odds: number[]) => void;
    result: ArbitrageResult | null;
  }> = ({ matches, counterOdds, onCounterOddsChange, result }) => {
    const updateCounterOdd = (index: number, value: number) => {
      const newOdds = [...counterOdds];
      newOdds[index] = value;
      onCounterOddsChange(newOdds);
    };
  
    useEffect(() => {
        if (counterOdds.length !== matches.length) {
          onCounterOddsChange(Array.from({ length: matches.length }, () => 1.0));
        }
      }, [counterOdds, matches, onCounterOddsChange]);
  
    return (
      <Card className="min-w-0 flex-shrink-0">
        <CardHeader>
          <CardTitle>Bookmaker #2</CardTitle>
          <CardDescription>Configure las cuotas contrarias para cada partido</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Línea</TableHead>
                <TableHead>Partido</TableHead>
                <TableHead>Cuota</TableHead>
                <TableHead>Importe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matches.map((match, index) => (
                <CounterBetRow
                  key={match.id}
                  match={match}
                  index={index}
                  counterOdd={counterOdds[index]}
                  calculatedStake={result?.counterBets[index]?.stake}
                  onOddChange={(value) => updateCounterOdd(index, value)}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };