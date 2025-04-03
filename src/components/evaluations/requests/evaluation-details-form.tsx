import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  institution: z.string().min(1, "Institution name is required"),
  country: z.string().min(1, "Country is required"),
  program: z.string().min(1, "Program is required"),
  evaluationType: z.string().min(1, "Evaluation type is required"),
})

type EvaluationDetailsFormValues = z.infer<typeof formSchema>

interface EvaluationDetailsFormProps {
  defaultValues?: Partial<EvaluationDetailsFormValues>
  onSubmit: (data: EvaluationDetailsFormValues) => void
}

export type { EvaluationDetailsFormValues }

export function EvaluationDetailsForm({ defaultValues, onSubmit }: EvaluationDetailsFormProps) {
  const form = useForm<EvaluationDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      institution: "",
      country: "",
      program: "",
      evaluationType: "",
      ...defaultValues,
    },
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter institution name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program</FormLabel>
              <FormControl>
                <Input placeholder="Enter program name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="evaluationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evaluation Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select evaluation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="course-by-course">Course by Course</SelectItem>
                  <SelectItem value="document-by-document">Document by Document</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
