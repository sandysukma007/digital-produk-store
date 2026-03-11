// Vercel Serverless Function for Midtrans Transaction
// This endpoint creates a transaction with Midtrans Snap API

export default async function handler(req, res) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { productId, productName, price, email } = req.body;

    // Validate required fields
    if (!productId || !productName || !price || !email) {
      return res.status(400).json({ error: 'Missing required fields: productId, productName, price, email' });
    }

    // Midtrans Server Key (from Midtrans Dashboard)
    // Use environment variable - make sure it's set in Vercel!
    const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

    if (!MIDTRANS_SERVER_KEY) {
      console.error('MIDTRANS_SERVER_KEY is not configured');
      return res.status(500).json({ error: 'Payment server key not configured' });
    }

    // Generate unique order ID
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Prepare transaction details
    const transactionDetails = {
      order_id: orderId,
      gross_amount: parseInt(price)
    };

    // Prepare item details
    const itemDetails = [
      {
        id: String(productId),
        name: String(productName),
        price: parseInt(price),
        quantity: 1
      }
    ];

    // Prepare customer details
    const customerDetails = {
      first_name: 'Customer',
      last_name: '',
      email: email,
      phone: ''
    };

    // Prepare full transaction request
    const transactionRequest = {
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: customerDetails
    };

    // Call Midtrans Snap API to get snap token
    const response = await fetch('https://app.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(MIDTRANS_SERVER_KEY + ':').toString('base64')
      },
      body: JSON.stringify(transactionRequest)
    });

    const data = await response.json();

    // Log for debugging
    console.log('Midtrans Response:', data);

    if (!response.ok) {
      console.error('Midtrans API Error:', data);
      return res.status(response.status).json({ error: 'Failed to create transaction', details: data });
    }

    if (data.token) {
      // Return snap token to frontend
      res.status(200).json({
        success: true,
        snapToken: data.token,
        orderId: orderId
      });
    } else {
      console.error('Midtrans Error (no token):', data);
      res.status(500).json({ error: 'Failed to create transaction', details: data });
    }

  } catch (error) {
    console.error('Transaction Error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

