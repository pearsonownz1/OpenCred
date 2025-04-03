import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NotFoundError } from "@/components/errors/not-found-error";
import { GeneralError } from "@/components/errors/general-error";
import { EmptyState } from "@/components/errors/empty-state";
import { LoadingState } from "@/components/errors/loading-state";
import { FileX, Database } from "lucide-react";

export default function ErrorsPage() {
  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Error States</h1>
        <p className="text-muted-foreground">
          A collection of error and empty state components for the OpenCred platform.
        </p>
      </div>

      <Tabs defaultValue="404" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="404">404 Not Found</TabsTrigger>
          <TabsTrigger value="error">General Error</TabsTrigger>
          <TabsTrigger value="empty">Empty State</TabsTrigger>
          <TabsTrigger value="loading">Loading State</TabsTrigger>
        </TabsList>

        <TabsContent value="404" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>404 Not Found Error</CardTitle>
              <CardDescription>Displayed when a user navigates to a page that doesn't exist.</CardDescription>
            </CardHeader>
            <CardContent className="border-t pt-6">
              <div className="bg-muted/30 p-10 rounded-lg">
                <NotFoundError />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="error" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>General Error</CardTitle>
              <CardDescription>Displayed when an unexpected error occurs in the application.</CardDescription>
            </CardHeader>
            <CardContent className="border-t pt-6">
              <div className="bg-muted/30 p-10 rounded-lg">
                <GeneralError 
                  error={new Error("An unexpected error occurred")} 
                  reset={() => alert("Reset function called")} 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="empty" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Empty State</CardTitle>
              <CardDescription>Displayed when there is no data to show in a section.</CardDescription>
            </CardHeader>
            <CardContent className="border-t pt-6">
              <div className="bg-muted/30 p-10 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EmptyState
                    title="No credentials found"
                    description="You haven't created any credentials yet. Get started by creating your first credential."
                    actionLabel="Create Credential"
                    actionHref="/dashboard/credentials/new"
                    icon={<FileX className="h-12 w-12 text-primary" />}
                  />

                  <EmptyState
                    title="No results found"
                    description="Your search didn't return any results. Try adjusting your search terms or filters."
                    actionLabel="Clear Filters"
                    onAction={() => alert("Filters cleared")}
                    icon={<Database className="h-12 w-12 text-primary" />}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="loading" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading State</CardTitle>
              <CardDescription>Displayed when content is being loaded.</CardDescription>
            </CardHeader>
            <CardContent className="border-t pt-6">
              <div className="bg-muted/30 p-10 rounded-lg">
                <LoadingState message="Loading data, please wait..." size="lg" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
