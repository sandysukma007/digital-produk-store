import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';

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

export default app;

