import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const createUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, {
            email,
            password
        })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Email or password incorrect');
    }
  };

