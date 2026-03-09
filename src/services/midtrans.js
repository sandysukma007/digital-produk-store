// Midtrans configuration
// Replace with your own Midtrans Client Key
export const MIDTRANS_CLIENT_KEY = 'Mid-client-dVZpPZF0zI2M8Smj';

// Load Midtrans Snap script
export const loadMidtransScript = () => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://app.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', MIDTRANS_CLIENT_KEY);
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Midtrans script'));
    document.head.appendChild(script);
  });
};

// Initialize Snap payment
export const initializePayment = async (snapToken, onSuccess, onError, onPending) => {
  try {
    await loadMidtransScript();

    window.snap.pay(snapToken, {
      onSuccess: (result) => {
        console.log('Payment success:', result);
        if (onSuccess) onSuccess(result);
      },
      onError: (result) => {
        console.log('Payment error:', result);
        if (onError) onError(result);
      },
      onPending: (result) => {
        console.log('Payment pending:', result);
        if (onPending) onPending(result);
      },
      onClose: () => {
        console.log('Payment popup closed');
      }
    });
  } catch (error) {
    console.error('Error initializing payment:', error);
    if (onError) onError(error);
  }
};

// Create transaction via backend API
export const createTransaction = async (productId, productName, price) => {
  try {
    console.log('Creating transaction with:', { productId, productName, price });

    const response = await fetch('/api/create-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId,
        productName,
        price
      })
    });

    const data = await response.json();

    console.log('API Response:', response.status, data);

    if (!response.ok) {
      const errorMessage = data.error || data.details || 'Failed to create transaction';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
};

