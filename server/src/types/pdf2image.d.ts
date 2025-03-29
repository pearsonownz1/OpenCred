declare module 'pdf2image' {
  interface ConvertOptions {
    outputDirectory?: string;
    outputFormat?: 'png' | 'jpg' | 'jpeg';
    pages?: number | number[];
    density?: number;
  }

  interface PDF2Image {
    convertPDF(pdfPath: string, options?: ConvertOptions): Promise<string[]>;
  }

  const pdf2image: PDF2Image;
  export default pdf2image;
} 