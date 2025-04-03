import { Card, CardContent } from "@/components/ui/card"

interface EvaluationNotesProps {
  notes: string
}

export function EvaluationNotes({ notes }: EvaluationNotesProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{notes}</p>
      </CardContent>
    </Card>
  )
}
