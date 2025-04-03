import React from "react"
import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { Student } from "@/types/evaluation"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

interface StudentLookupFormProps {
  onStudentFound: (student: Student) => void
  onCreateNew: (email: string) => void
}

export function StudentLookupForm({ onStudentFound, onCreateNew }: StudentLookupFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // For demo purposes, randomly decide if student exists
      const studentExists = Math.random() > 0.5
      
      if (studentExists) {
        // Mock student data
        const student: Student = {
          id: "mock-id",
          name: "John Doe",
          email: values.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        onStudentFound(student)
      } else {
        onCreateNew(values.email)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Email</FormLabel>
              <FormControl>
                <Input placeholder="student@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Checking..." : "Check Email"}
        </Button>
      </form>
    </Form>
  )
}
