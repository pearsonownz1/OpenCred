import React from 'react';
import { Card, Button, Space } from 'antd';
import { FileText, Download, Share2, X } from 'lucide-react';

interface DocumentViewerProps {
  onClose: () => void;
  onDownload: (id: string) => void;
  onShare: (id: string) => void;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  onClose,
  onDownload,
  onShare,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Document Details</h2>
          <Button
            type="text"
            icon={<X className="h-4 w-4" />}
            onClick={onClose}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="text-lg">Sample Document.pdf</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Type</p>
              <p>PDF Document</p>
            </div>
            <div>
              <p className="text-gray-500">Size</p>
              <p>2.5 MB</p>
            </div>
            <div>
              <p className="text-gray-500">Upload Date</p>
              <p>March 20, 2024</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p>Processed</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              icon={<Download className="h-4 w-4" />}
              onClick={() => onDownload('1')}
            >
              Download
            </Button>
            <Button
              icon={<Share2 className="h-4 w-4" />}
              onClick={() => onShare('1')}
            >
              Share
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DocumentViewer;
