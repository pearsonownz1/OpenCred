import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Evaluation } from "@/types/evaluation"

interface EvaluationDetailsCardProps {
  evaluation: Evaluation
}

export function EvaluationDetailsCard({ evaluation }: EvaluationDetailsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <div className="mt-1">
              <Badge variant="outline" className="text-base font-normal">
                {evaluation.status}
              </Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Type</p>
            <p className="mt-1">{evaluation.evaluationType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Submitted</p>
            <p className="mt-1">{new Date(evaluation.submittedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Assigned To</p>
            <p className="mt-1">{evaluation.assignedTo}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
