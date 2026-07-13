import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app', 'documents', 'terms_and_conditions.html');
    const htmlContent = await fs.readFile(filePath, 'utf8');
    
    return new NextResponse(htmlContent, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch (error) {
    return new NextResponse('Error loading Terms and Conditions', { status: 500 });
  }
}
