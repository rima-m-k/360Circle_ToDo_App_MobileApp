import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const createAxiosInstance = async () => {
  const authToken = await getAuthToken();
  const instance = axios.create({
    baseURL: 'http://192.168.1.63:8000/',
    timeout: 30000,
    headers: { Authorization: `Bearer ${authToken}` }
  });
  return instance;
};

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('user');
    return token;
  } catch (error) {
    return null;
  }
};

const login = async (data) => {
  const instance = await createAxiosInstance();
  return instance.post('/', data);
};

const signup = async (data) => {
  const instance = await createAxiosInstance();
  return instance.post('/signup', data);
};

const addTodo = async (data) => {
  const instance = await createAxiosInstance();
  return instance.post('/to-do', data);
};

const fetchTodo = async () => {
  const instance = await createAxiosInstance();
  return instance.get('/to-do');
};

const removeTodo = async (data) => {
  const instance = await createAxiosInstance();
  return instance.delete(`/delete-to-do/${data}`);
};
const updateTodo = async (data) => {
    const instance = await createAxiosInstance();
    return instance.patch(`/to-do`,data);
  };

  const sendEmail = async (data) => {
    const instance = await createAxiosInstance();
    return instance.post(`/forgot-password`,data);
  };

  const checkOTP = async (data) => {
    const instance = await createAxiosInstance();
    return instance.put(`/forgot-password`,data);
  };

  const changePassword = async (data) => {
    const instance = await createAxiosInstance();
    return instance.patch(`/forgot-password`,data);
  };


export {
  login,
  signup,
  addTodo,
  fetchTodo,
  removeTodo,
  updateTodo,
  sendEmail,
  checkOTP,
  changePassword
}
