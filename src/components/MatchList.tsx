import type { Match } from "@/interfaces/betting.types";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { MatchInput } from "./MatchInput";
import { Plus } from "lucide-react";

export const MatchesList: React.FC<{
    matches: Match[];
    onUpdate: (id: string, field: keyof Match, value: string | number) => void;
    onRemove: (id: string) => void;
    onAdd: () => void;
    disabledMatches?: boolean;

  }> = ({ matches, onUpdate, onRemove, onAdd, disabledMatches }) => (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Label>Partidos</Label>
        <Button onClick={onAdd} size="sm" variant="outline" disabled={disabledMatches}>
          <Plus className="h-4 w-4 mr-1" />
          Añadir partido
        </Button>
      </div>
      
      <div className="space-y-2">
        {matches.map((match, index) => (
          <MatchInput
            key={match.id}
            match={match}
            index={index}
            onUpdate={onUpdate}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );