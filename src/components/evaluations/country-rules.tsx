import { Card, CardContent } from "@/components/ui/card"
import type { Country } from "@/types/evaluation"

interface CountryRulesProps {
  country: Country
}

export function CountryRules({ country }: CountryRulesProps) {
  const rules = JSON.parse(country.rules)

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div>
          <h3 className="font-medium mb-2">Education System</h3>
          <p className="text-sm text-muted-foreground">{rules.educationSystem}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Grading Scale</h3>
          <p className="text-sm text-muted-foreground">{rules.gradingScale}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Degree Equivalence</h3>
          <p className="text-sm text-muted-foreground">{rules.degreeEquivalence}</p>
        </div>
      </CardContent>
    </Card>
  )
}
