import { Card } from "@/components/ui/card"
import { FileIcon } from "lucide-react"
import type { Document } from "@/types/evaluation"

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <Card>
      <div className="p-6 space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <FileIcon className="h-8 w-8 text-blue-500" />
            <div className="flex-1">
              <h4 className="font-medium">{doc.originalName}</h4>
              <p className="text-sm text-muted-foreground">
                {doc.type} • {(doc.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <a
              href={doc.path}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </Card>
  )
}
