import apiRequest from '../client/client'; 


export const signupService = async (formData) => {
  try {
   
console.log("data recieved in service",formData);

    const response = await apiRequest('http://localhost:5000/api/users/signup', 'POST', formData);
    return response; 
  } catch (error) {
    throw error; 
  }
};
