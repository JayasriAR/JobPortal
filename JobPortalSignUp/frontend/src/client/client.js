import axios from 'axios';


const apiRequest = async (url, method, data = null) => {
  try {
   
    const response = await axios({
      method: method, 
      url: url, 
      data: data, 
      headers: data instanceof FormData ? {} : { 'Content-Type': 'application/json' },
    });
console.log("data sent successfully");

    return response;
  } catch (error) {
    console.error('API request error:', error.response || error.message); 
    throw error; 
  }
};

export default apiRequest;
