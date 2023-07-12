import axios from "axios";

export const axiosLoginRegistrationInstance = axios.create({
  baseUrl: "http://127.0.0.1:8000/",
});

export const axiosOtherService = axios.create({
    baseUrl: "http://127.0.0.1:8000/",
})

axiosOtherService.interceptors.request.use(
    (config) => {
        let jwt = localStorage.getItem('JWT_TOKEN');
        console.log("JWT---->",jwt)
        if (jwt) config.headers['authorization'] = "Bearer " + jwt;
        console.log("config data",config.data)
        console.log("config headers",config.headers)
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
)




axiosLoginRegistrationInstance.interceptors.request.use(
  (config) => {
    let jwt = localStorage.getItem('JWT_TOKEN');
    if (jwt) config.headers['authorization'] = "Bearer " + jwt;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosLoginRegistrationInstance.interceptors.response.use(
  (response) => {
    if (response.data["Status_code"] == 100){
      return response;
    }
    let jwt = response.headers["authorization"].split(" ")[1]
    
    if(jwt){
        localStorage.setItem("JWT_TOKEN",jwt)
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

