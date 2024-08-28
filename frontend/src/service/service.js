import apiRequest from '../client/client'; 


export const signupService = async (formData) => {
  try {
   
console.log("data recieved in service",formData);

    const response = await apiRequest('https://jobportal-29j7.onrender.com/api/users/signup', 'POST', formData);
    return response; 
  } catch (error) {
    throw error; 
  }
};
