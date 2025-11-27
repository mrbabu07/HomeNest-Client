// // services/api.js
// import axios from 'axios';

// //
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// export const fetchProperties = async (params = {}) => {
//   const response = await axios.get(`${API_BASE_URL}/api/properties`, { params });
//   return response.data;
// };

// export const fetchPropertyById = async (id) => {
//   const response = await axios.get(`${API_BASE_URL}/api/properties/${id}`);
//   return response.data;
// };

// export const createProperty = async (propertyData) => {
//   const response = await axios.post(`${API_BASE_URL}/api/properties`, propertyData);
//   return response.data;
// };

// export const updateProperty = async (id, propertyData) => {
//   const response = await axios.put(`${API_BASE_URL}/api/properties/${id}`, propertyData);
//   return response.data;
// };

// export const deleteProperty = async (id) => {
//   const response = await axios.delete(`${API_BASE_URL}/api/properties/${id}`);
//   return response.data;
// };

// export const fetchReviewsForProperty = async (propertyId) => {
//   const response = await axios.get(`${API_BASE_URL}/api/reviews/property/${propertyId}`);
//   return response.data;
// };

// export const fetchReviewsByReviewer = async (reviewerEmail) => {
//   const response = await axios.get(`${API_BASE_URL}/api/reviews/reviewer/${reviewerEmail}`);
//   return response.data;
// };

// export const createReview = async (reviewData) => {
//   const response = await axios.post(`${API_BASE_URL}/api/reviews`, reviewData);
//   return response.data;
// };