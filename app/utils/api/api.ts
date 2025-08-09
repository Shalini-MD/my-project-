// app/utils/api/api.ts
import axios from 'axios';

// ✅ Replace this with your actual ngrok URL:
const BASE_URL = 'https://060ebb077fe6.ngrok-free.app';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// Example test API function
export const testApi = async (): Promise<string> => {
  try {
    // Calls: https://abcd-1234.ngrok-free.app/api/test
    const response = await api.get('/api/test');
    return response.data.message;
  } catch (error: any) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch data from API');
  }
};
