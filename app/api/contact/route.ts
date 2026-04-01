import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;
    const messageId = `MSG-${Date.now()}`;

    console.log('✅ --- NEW CONTACT MESSAGE RECEIVED ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Subject:', subject);
    console.log('----------------------------------------');

    // ============================================================================
    // 🚀 SAVE TO GOOGLE SHEETS
    // ============================================================================
    if (
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GOOGLE_SHEET_ID
    ) {
      try {
        // Initialize auth
        let privateKey = process.env.GOOGLE_PRIVATE_KEY;
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
          privateKey = privateKey.slice(1, -1);
        }

        const serviceAccountAuth = new JWT({
          email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: privateKey.replace(/\\n/g, '\n'),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[0]; // use the first sheet

        // Append row to the sheet
        // Using the exact headers found in the user's sheet:
        // NO | Full Name | Email Address | Phone Number | Full Address | Order Notes | Order Summary
        await sheet.addRow({
          'NO': messageId,
          'Full Name': name || '',
          'Email Address': email || '',
          'Phone Number': 'N/A (Contact Form)',
          'Full Address': 'N/A (Contact Form)',
          'Order Notes': `Subject: ${subject || ''}`,
          'Order Summary': `Contact Message:\n\n${message || ''}`,
        });

        console.log('✅ Contact message saved to Google Sheets successfully.');
      } catch (sheetError) {
        console.error('❌ Error saving contact message to Google Sheets:', sheetError);
        // We don't throw here so the user still gets a success response even if the sheet fails
      }
    } else {
      console.log('⚠️ Google Sheets credentials not found. Skipping sheet update.');
    }

    // Return success to the frontend
    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully',
      messageId
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process message' }, 
      { status: 500 }
    );
  }
}
