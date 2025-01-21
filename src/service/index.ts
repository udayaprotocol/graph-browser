import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://212.56.40.235:5005',
    timeout: 30*1000,
});

export default instance;