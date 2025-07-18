import type { Match } from "@/interfaces/betting.types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { StakeInput } from "./StakeInput";
import { MatchesList } from "./MatchList";

export const CombinedBetInput: React.FC<{
    stake: number;
    onStakeChange: (stake: number) => void;
    matches: Match[];
    onMatchesChange: (matches: Match[]) => void;
    combinedOdds: number;
  }> = ({ stake, onStakeChange, matches, onMatchesChange, combinedOdds }) => {
    const addMatch = () => {
      const newMatch: Match = {
        id: Date.now().toString(),
        homeTeam: '',
        awayTeam: '',
        date: new Date(),
        market: '1X2',
        odds: 0.0
      };
      onMatchesChange([...matches, newMatch]);
    };
  
    const updateMatch = (id: string, field: keyof Match, value: string | number) => {
      onMatchesChange(
        matches.map(match =>
          match.id === id ? { ...match, [field]: value } : match
        )
      );
    };
  
    const removeMatch = (id: string) => {
      onMatchesChange(matches.filter(match => match.id !== id));
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bookmaker #1 (Combinada)</CardTitle>
          <CardDescription>Configure su apuesta combinada</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <StakeInput
            stake={stake}
            combinedOdds={combinedOdds}
            onStakeChange={onStakeChange}
          />
          <MatchesList
            matches={matches}
            onUpdate={updateMatch}
            onRemove={removeMatch}
            onAdd={addMatch}
            disabledMatches={matches.length >= 4}
          />
        </CardContent>
      </Card>
    );
  };