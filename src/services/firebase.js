import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, setDoc, increment } from 'firebase/firestore';

// Firebase configuration - from user provided config
const firebaseConfig = {
  apiKey: "AIzaSyDgA2MYV9RdnA1HTwcRt1vlAHVE68u88oY",
  authDomain: "digital-product-store-a9de9.firebaseapp.com",
  projectId: "digital-product-store-a9de9",
  storageBucket: "digital-product-store-a9de9.firebasestorage.app",
  messagingSenderId: "203842370338",
  appId: "1:203842370338:web:480ca80ef085b96c23437b",
  measurementId: "G-C95S1EYEDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export db for use in other files
export { db };

// Fetch all products from Firestore
export const fetchProducts = async () => {
  try {
    const productsRef = collection(db, 'products');
    const querySnapshot = await getDocs(productsRef);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch single product by ID
export const fetchProductById = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);
    
    if (productSnap.exists()) {
      return {
        id: productSnap.id,
        ...productSnap.data()
      };
    } else {
      console.log('No such product!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Add a new product (handles both auto ID and custom ID)
export const addProduct = async (productData, customId = null) => {
  try {
    if (customId) {
      await setDoc(doc(db, 'products', customId), productData);
      return customId;
    } else {
      const docRef = await addDoc(collection(db, 'products'), productData);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error adding product: ', error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, productData);
    return true;
  } catch (error) {
    console.error('Error updating product: ', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error('Error deleting product: ', error);
    throw error;
  }
};

// Fetch all orders from Firestore
export const fetchOrders = async () => {
  try {
    const ordersRef = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersRef);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Sort orders by orderDate descending
    return orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Add a new order
export const addOrder = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      orderDate: new Date().toISOString()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding order: ', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, statusData) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, statusData);
    return true;
  } catch (error) {
    console.error('Error updating order: ', error);
    throw error;
  }
};

// Increment product sold count
export const incrementProductSoldCount = async (productId, quantity = 1) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, {
      sold: increment(quantity)
    });
    return true;
  } catch (error) {
    console.error(`Error incrementing sold count for product ${productId}:`, error);
    // Don't throw, we don't want to break the whole flow if this fails
    return false;
  }
};

export default app;

