import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, MessageCircle, AlertTriangle, CheckCircle } from "lucide-react"

export function ActionButtons() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <Button className="w-full gap-2" variant="outline">
            <Download className="h-4 w-4" /> Download Documents
          </Button>
          <Button className="w-full gap-2" variant="outline">
            <MessageCircle className="h-4 w-4" /> Add Note
          </Button>
          <Button className="w-full gap-2" variant="outline">
            <AlertTriangle className="h-4 w-4" /> Report Issue
          </Button>
          <Button className="w-full gap-2">
            <CheckCircle className="h-4 w-4" /> Complete Evaluation
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
