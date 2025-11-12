// API service configuration
// Replace with your actual API base URL

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const api = {
  // Sales endpoints
  getSales: async () => {
    const response = await fetch(`${API_BASE_URL}/sales`);
    return response.json();
  },
  
  getSaleById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/sales/${id}`);
    return response.json();
  },
  
  // Products endpoints
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
  },
  
  getProductById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return response.json();
  },
  
  createProduct: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  // Customers endpoints
  getCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/customers`);
    return response.json();
  },
  
  getCustomerById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/customers/${id}`);
    return response.json();
  },
  
  getLoyaltyPoints: async (customerId: string) => {
    const response = await fetch(`${API_BASE_URL}/loyalty/${customerId}`);
    return response.json();
  },
  
  // Stores endpoints
  getStores: async () => {
    const response = await fetch(`${API_BASE_URL}/stores`);
    return response.json();
  },
  
  getStoreById: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/stores/${id}`);
    return response.json();
  },
  
  // Suppliers endpoints
  getSuppliers: async () => {
    const response = await fetch(`${API_BASE_URL}/suppliers`);
    return response.json();
  },
};
