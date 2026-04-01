import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total, orderType } = body;
    const orderId = `ORD-${Date.now()}`;

    console.log('✅ --- NEW ORDER RECEIVED ON BACKEND ---');
    console.log('Type:', orderType);
    console.log('Customer:', customer);
    console.log('Items:', items.length, 'items');
    console.log('Total:', total, 'AED');
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

        // Format items as a readable string
        const itemsString = items.map((item: any) => `${item.name} (${item.quantity}x)`).join(', ');

        // Append row to the sheet
        // Using the exact headers found in the user's sheet:
        // NO | Full Name | Email Address | Phone Number | Full Address | Order Notes | Order Summary
        await sheet.addRow({
          'NO': orderId, // Using Order ID for the NO column
          'Full Name': customer.name || '',
          'Email Address': customer.email || '',
          'Phone Number': customer.phone || '',
          'Full Address': customer.address || '',
          'Order Notes': customer.notes || '',
          'Order Summary': `Type: ${orderType}\nDate: ${new Date().toLocaleString()}\n\nItems:\n${itemsString}\n\nTotal: ${total} AED`,
        });

        console.log('✅ Order saved to Google Sheets successfully.');
      } catch (sheetError) {
        console.error('❌ Error saving to Google Sheets:', sheetError);
        // We don't throw here so the user still gets a success response even if the sheet fails
      }
    } else {
      console.log('⚠️ Google Sheets credentials not found. Skipping sheet update.');
      console.log('To enable, add GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID to your environment variables.');
    }

    // Return success to the frontend
    return NextResponse.json({ 
      success: true, 
      message: 'Order received successfully',
      orderId
    });
  } catch (error) {
    console.error('Checkout API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process order' }, 
      { status: 500 }
    );
  }
}
