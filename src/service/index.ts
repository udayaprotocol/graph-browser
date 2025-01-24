import axios from 'axios';

const instance = axios.create({
    baseURL: './',
    timeout: 30*1000,
});

export default instance;