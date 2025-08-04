import axios from "axios";
import qs from "qs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import endpoints from "./endPoints";
import { baseUrl } from "./baseURL";

// Define endpoint key type
type EndpointKey = keyof typeof endpoints;

// Create Axios instance for shared configuration
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Reasonable timeout for mobile
});

// Main API request function
const apiRequest = async (
  endpointKey: EndpointKey,
  data: any = null,
  pathParams: string | null = null,
  queryParams: any = null,
  signal?: AbortSignal // Support request cancellation
) => {
  // Validate endpoint
  const endpoint = endpoints[endpointKey];
  if (!endpoint) {
    throw { message: `Invalid endpoint key: ${endpointKey}` };
  }

  // Construct URL
  let url =
    typeof endpoint.url === "function"
      ? endpoint.url(pathParams)
      : endpoint.url;

  if (queryParams) {
    const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
    url += queryString;
  }

  // Retrieve JWT token from AsyncStorage
  const headers: any = {};
  try {
    const jwt_token = await AsyncStorage.getItem("jwt_token");
    if (jwt_token) {
      headers["Authorization"] = `Bearer ${jwt_token}`;
    }
  } catch (error) {
    console.warn("Failed to retrieve JWT token:", error);
  }

  // Set Content-Type for non-FormData payloads
  if (data && !(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Log request details (development only)
  if (__DEV__) {
    console.log("baseURL:", baseUrl, "endpointKey:", endpointKey, "url:", url);
  }

  try {
    const response = await apiClient({
      method: endpoint.method,
      url,
      data,
      headers,
      signal,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401 && (await AsyncStorage.getItem("jwt_token")) !== "demo-token") {
        await AsyncStorage.removeItem("jwt_token");
        // Optionally trigger navigation to login screen
        // Example: navigation.navigate("Login") (requires React Navigation setup)
      }
      throw {
        status: error.response?.status,
        data: error.response?.data,
        message: error.response?.data?.message || error.message,
      };
    }
    throw { message: error.message || "Something went wrong" };
  }
};

export default apiRequest;
// import axios from "axios";
// import qs from "qs";
// import endpoints from "./endPoints";
// import { baseUrl } from "./baseURL";

// const apiRequest = (
//   endpointKey: string,
//   data: any = null,
//   pathParams: string | null = null,
//   queryParams: any = null
// ) => {
//   return new Promise((res, rej) => {
//     const endpoint = endpoints[endpointKey];

//     let url =
//       typeof endpoint?.url === "function"
//         ? endpoint?.url(pathParams)
//         : endpoint?.url;

//     if (queryParams) {
//       const queryString = qs.stringify(queryParams, { addQueryPrefix: true });
//       url += queryString;
//     }

//     const apiBase = baseUrl; 

//     const jwt_token = localStorage.getItem("jwt_token");
//     const headers: any = {};
//     if (jwt_token) headers["Authorization"] = `Bearer ${jwt_token}`;
//     if (data && !(data instanceof FormData)) headers["Content-Type"] = "application/json";

//     console.log("apiBase:", apiBase, "endpointKey:", endpointKey, "url:", url);

//     axios({
//       method: endpoint?.method,
//       url: `${apiBase}${url}`,
//       data: data,
//       headers: headers,
//     })
//       .then((response) => res(response?.data))
//       .catch((error) => {
//         if (error.response?.status === 401 && jwt_token !== "demo-token") {
//           localStorage.removeItem("jwt_token");
//           localStorage.clear();
//         }
//         if (axios.isAxiosError(error)) {
//           rej({
//             status: error.response?.status,
//             data: error.response?.data,
//             message: error.response?.data?.message || error.message,
//           });
//         } else {
//           rej({ message: error.message || "Something went wrong" });
//         }
//       });
//   });
// };

// export default apiRequest;
