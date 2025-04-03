import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { TimelineEvent } from "@/types/evaluation"

interface EvaluationTimelineProps {
  progress: number
  timeline: TimelineEvent[]
  estimatedCompletionDate: string
}

export function EvaluationTimeline({ progress, timeline, estimatedCompletionDate }: EvaluationTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>{progress}% Complete</span>
              <span>Est. Completion: {new Date(estimatedCompletionDate).toLocaleDateString()}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-4">
            {timeline.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="w-24 text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{event.status}</div>
                  <div className="text-sm text-muted-foreground">By {event.user}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
