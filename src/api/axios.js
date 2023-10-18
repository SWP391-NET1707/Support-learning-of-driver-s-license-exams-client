import axios from "axios";


 export const axiosClient = axios.create({
    baseURL: 'https://quangttse151013.monoinfinity.net/api'
});

// axiosClient.interceptors.request.use(async(config) => {
//     return config;
// })

// axiosClient.interceptors.response.use((response) => {
//     if(response && response.data){
//         return response.data;}
//         return response;
//     }, (error) => {
//         throw error;
// });
// export default axiosClient;