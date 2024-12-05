// src/axios.js

import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://online-voting-system-sigma-sable.vercel.app/api',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
    baseURL: 'http://localhost:3000',
//   withCredentials: true,  // Ensure credentials are always sent
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
//https://ovs-backend.vercel.app