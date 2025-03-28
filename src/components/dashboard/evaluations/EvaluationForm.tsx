import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileUp, Plus, Trash2 } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formSchema = z.object({
  studentId: z.string().min(1, { message: "Student is required" }),
  evaluationType: z.string().min(1, { message: "Evaluation type is required" }),
  institution: z.string().min(1, { message: "Institution is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  program: z.string().min(1, { message: "Program is required" }),
  documents: z
    .array(z.string())
    .min(1, { message: "At least one document is required" }),
  notes: z.string().optional(),
});

type EvaluationFormValues = z.infer<typeof formSchema>;

interface EvaluationFormProps {
  onSubmit?: (values: EvaluationFormValues) => void;
  initialData?: Partial<EvaluationFormValues>;
}

const EvaluationForm = ({
  onSubmit = () => {},
  initialData = {
    studentId: "",
    evaluationType: "",
    institution: "",
    country: "",
    program: "",
    documents: [],
    notes: "",
  },
}: EvaluationFormProps) => {
  const form = useForm<EvaluationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [selectedDocuments, setSelectedDocuments] = React.useState<string[]>(
    initialData.documents || [],
  );

  const handleSubmit = (values: EvaluationFormValues) => {
    onSubmit(values);
  };

  const handleAddDocument = () => {
    // In a real implementation, this would open a document selector
    // For now, we'll just add a placeholder document
    const newDocument = `Document-${Math.floor(Math.random() * 1000)}`;
    setSelectedDocuments([...selectedDocuments, newDocument]);
    form.setValue("documents", [...selectedDocuments, newDocument]);
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = [...selectedDocuments];
    updatedDocuments.splice(index, 1);
    setSelectedDocuments(updatedDocuments);
    form.setValue("documents", updatedDocuments);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white">
      <CardHeader>
        <CardTitle>New Credential Evaluation</CardTitle>
        <CardDescription>
          Select a student and documents to initiate a new credential
          evaluation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a student" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="student-1">John Doe</SelectItem>
                        <SelectItem value="student-2">Jane Smith</SelectItem>
                        <SelectItem value="student-3">Alex Johnson</SelectItem>
                        <SelectItem value="student-4">Maria Garcia</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the student for this evaluation.
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select evaluation type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="course-by-course">
                          Course-by-Course
                        </SelectItem>
                        <SelectItem value="document-by-document">
                          Document-by-Document
                        </SelectItem>
                        <SelectItem value="degree-equivalency">
                          Degree Equivalency
                        </SelectItem>
                        <SelectItem value="professional-license">
                          Professional License
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Type of evaluation to be performed.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="institution"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University name" {...field} />
                    </FormControl>
                    <FormDescription>
                      The institution that issued the credential.
                    </FormDescription>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="brazil">Brazil</SelectItem>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Country where the credential was issued.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program/Degree</FormLabel>
                    <FormControl>
                      <Input placeholder="Bachelor of Science" {...field} />
                    </FormControl>
                    <FormDescription>
                      The program or degree earned.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div>
                <FormLabel>Documents</FormLabel>
                <FormDescription className="mt-1 mb-3">
                  Select documents for evaluation. Upload new documents or
                  choose from existing ones.
                </FormDescription>

                <div className="flex flex-col gap-2">
                  {selectedDocuments.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDocuments.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
                        >
                          <div className="flex items-center gap-2">
                            <FileUp className="h-4 w-4 text-blue-500" />
                            <span>{doc}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDocument(index)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center p-6 border border-dashed rounded-md">
                      <p className="text-muted-foreground text-sm">
                        No documents selected
                      </p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    className="mt-2"
                    onClick={handleAddDocument}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                </div>
                {form.formState.errors.documents && (
                  <p className="text-[0.8rem] font-medium text-destructive mt-2">
                    {form.formState.errors.documents.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <textarea
                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring min-h-[100px]"
                        placeholder="Any additional information or special instructions"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional notes for the evaluation process.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="px-0 pt-6 flex justify-end gap-2">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Submit for Evaluation</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EvaluationForm;
