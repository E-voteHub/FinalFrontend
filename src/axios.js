// src/axios.js

import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://online-voting-system-sigma-sable.vercel.app/api',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    baseURL: 'https://ovs-backend.vercel.app',
//   withCredentials: true,  // Ensure credentials are always sent
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
//