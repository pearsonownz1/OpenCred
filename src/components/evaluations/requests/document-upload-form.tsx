import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  transcript: z.any().optional(),
  diploma: z.any().optional(),
  additionalDocuments: z.any().optional(),
});

export interface DocumentUploadFormProps {
  defaultValues: {
    transcript: File | null;
    diploma: File | null;
    additionalDocuments: File | null;
  };
  onSubmit: (data: {
    transcript?: File;
    diploma?: File;
    additionalDocuments?: File;
  }) => void;
  onSkip: () => void;
}

export function DocumentUploadForm({ defaultValues, onSubmit, onSkip }: DocumentUploadFormProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="transcript"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Academic Transcript</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diploma"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Diploma/Certificate</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalDocuments"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Additional Documents (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onSkip}>
            Skip for Now
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
