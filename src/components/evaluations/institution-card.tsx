import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2 } from "lucide-react"

interface InstitutionCardProps {
  institution: string
  program: string
  country: string
}

export function InstitutionCard({ institution, program, country }: InstitutionCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Institution Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Institution</p>
            <p>{institution}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Program</p>
            <p>{program}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Country</p>
            <p>{country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
