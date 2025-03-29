import { createWorker } from 'tesseract.js';
import pdfParse, { Options } from 'pdf-parse';
import sharp from 'sharp';
import fs from 'fs/promises';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import pdf2image from 'pdf2image';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function validatePDF(filePath: string): Promise<Buffer> {
  try {
    const dataBuffer = await fs.readFile(filePath);
    // Check for PDF magic number (%PDF-)
    if (!dataBuffer.toString('ascii', 0, 5).startsWith('%PDF-')) {
      throw new Error('Invalid PDF format: Missing PDF header');
    }
    return dataBuffer;
  } catch (error: any) {
    console.error('Error validating PDF:', error);
    throw new Error(`Invalid PDF file: ${error.message}`);
  }
}

async function extractTextFromPDF(filePath: string): Promise<string> {
  try {
    console.log('Starting PDF text extraction from:', filePath);
    const dataBuffer = await validatePDF(filePath);
    
    const options: Options = {
      pagerender: (pageData: any): string => {
        try {
          const renderOptions = {
            normalizeWhitespace: true,
            disableCombineTextItems: false
          };
          return pageData.getTextContent(renderOptions).then((textContent: any) => {
            return textContent.items.map((item: any) => item.str).join(' ');
          });
        } catch (error) {
          console.error('Error rendering page:', error);
          return '';
        }
      }
    };

    const data = await pdfParse(dataBuffer, options);
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('No text content extracted from PDF');
    }

    console.log('Successfully extracted text from PDF');
    return data.text;
  } catch (error: any) {
    console.error('Error extracting text from PDF:', error);
    throw new Error(`Failed to extract text from PDF: ${error.message}`);
  }
}

async function preprocessImage(filePath: string): Promise<Buffer> {
  try {
    return sharp(filePath)
      .grayscale()
      .normalize()
      .sharpen()
      .toBuffer();
  } catch (error: any) {
    console.error('Error preprocessing image:', error);
    throw new Error(`Failed to preprocess image: ${error.message || error}`);
  }
}

async function extractTextFromImage(imageBuffer: Buffer): Promise<string> {
  try {
    const worker = await createWorker();
    const { data: { text } } = await worker.recognize(imageBuffer);
    await worker.terminate();
    
    if (!text || text.trim().length === 0) {
      throw new Error('No text extracted from image');
    }
    
    return text;
  } catch (error: any) {
    console.error('Error extracting text from image:', error);
    throw new Error(`Failed to extract text from image: ${error.message}`);
  }
}

async function extractTextFromFile(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error: any) {
    console.error('Error reading file:', error);
    throw new Error(`Failed to read file: ${error.message || error}`);
  }
}

interface ExtractedData {
  institution?: string;
  degree?: string;
  graduationDate?: string;
  studentName?: string;
  honors?: string;
  courses?: Array<{
    name: string;
    code?: string;
    credits?: number;
    grade: string;
    semester?: string;
  }>;
  gpa?: string;
  academicPeriod?: string;
}

async function extractStructuredData(text: string, documentType: string): Promise<ExtractedData> {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an expert at extracting structured information from ${documentType} documents. 
          Extract all relevant information and format it according to the document type.
          For diplomas, extract: institution, degree, graduation date, student name, and honors.
          For transcripts, extract: courses, grades, GPA, and academic period.
          Provide the output in a structured JSON format.`
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}') as ExtractedData;
    
    // Ensure we have at least some basic structure
    if (documentType === 'diploma' && (!result.institution || !result.degree)) {
      throw new Error('Failed to extract required diploma information');
    } else if (documentType === 'transcript' && (!result.courses || result.courses.length === 0)) {
      throw new Error('Failed to extract required transcript information');
    }
    
    return result;
  } catch (error: any) {
    console.error('Error extracting structured data:', error);
    throw new Error(`Failed to extract structured data: ${error.message}`);
  }
}

export async function processDocument(filePath: string, documentType: string): Promise<any> {
  console.log('Processing document:', { filePath, documentType });
  
  try {
    const fileExtension = path.extname(filePath).toLowerCase();
    let extractedText = '';

    console.log('File extension:', fileExtension);

    if (fileExtension === '.pdf') {
      try {
        extractedText = await extractTextFromPDF(filePath);
        console.log('PDF text extraction successful');
      } catch (error: any) {
        console.error('PDF processing failed, attempting OCR fallback:', error);
        // If PDF parsing fails, try OCR as a fallback
        try {
          // Convert first page of PDF to image
          const images = await pdf2image.convertPDF(filePath, {
            outputDirectory: path.dirname(filePath),
            outputFormat: 'png',
            pages: 1
          });
          
          if (!images || images.length === 0) {
            throw new Error('Failed to convert PDF to image');
          }
          
          // Read the generated image
          const imageBuffer = await fs.readFile(images[0]);
          
          // Extract text from the image
          extractedText = await extractTextFromImage(imageBuffer);
          
          // Clean up the temporary image file
          await fs.unlink(images[0]);
          
          console.log('OCR fallback successful');
        } catch (ocrError: any) {
          console.error('OCR fallback failed:', ocrError);
          throw new Error(`Failed to process PDF: ${error.message} and OCR fallback failed: ${ocrError.message}`);
        }
      }
    } else if (['.jpg', '.jpeg', '.png'].includes(fileExtension)) {
      const imageBuffer = await fs.readFile(filePath);
      extractedText = await extractTextFromImage(imageBuffer);
    } else {
      throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    if (!extractedText || extractedText.trim().length === 0) {
      throw new Error('No text could be extracted from the document');
    }

    console.log('Successfully extracted text');

    // Structure the extracted text based on document type
    const extractedData = await extractStructuredData(extractedText, documentType);
    
    if (!extractedData) {
      throw new Error('Failed to extract structured data from document');
    }

    // Ensure the data is serializable
    const structuredData = {
      type: documentType,
      rawText: extractedText,
      extractedData: JSON.parse(JSON.stringify(extractedData)),
    };

    console.log('Document processing completed successfully');
    return structuredData;
  } catch (error: any) {
    console.error('Error processing document:', error);
    throw error;
  }
} 