import apiRequest from "./apiRequest";

export const franchiseRegister = (data: any) =>
  apiRequest("franchiseRegister", data);

export const franchiseLogin = (data: any) => apiRequest("franchiseLogin", data);

export const getFranchiseProfile = (franchiseId: string) =>
  apiRequest("getFranchaseProfile", null, franchiseId); // Note: Keep endpoint key as is to match endPoints.ts

export const updateFranchiseProfile = (formData: FormData) =>
  apiRequest("updateFranchaseProfile", formData); // Note: Keep endpoint key as is

export const createCompanyReview = (formData: FormData) =>
  apiRequest("createCompanyReview", formData);

export const getAllPincodes = () => apiRequest("getAllPincodes");

export const getAllCategories = (data: any) =>
  apiRequest("getAllCategories", data);

export const getPlans = (data: any) => apiRequest("getPlans", data);

export const registerTechByFranchise = (data: any) =>
  apiRequest("registerTechByFranchise", data);

export const addTechSubscriptionPlan = (data: any) =>
  apiRequest("addTechSubscriptionPlan", data);

export const getAllTechniciansByFranchise = (franchiseId: string) =>
  apiRequest("getAllTechniciansByFranchise", null, franchiseId);

export const updateTechByFranchise = (data: any) =>
  apiRequest("updateTechByFranchise", data);

export const getFranchisePlans = (data: any) =>
  apiRequest("getFranchisePlans", data);

export const getFranchiseSubscriptionPlan = (franchiseId: string) =>
  apiRequest("getFranchiseSubscriptionPlan", null, franchiseId);

export const getFranchiseAccount = (franchiseId: string) =>
  apiRequest("getFranchiseAccount", null, franchiseId);

export const getFranchiseAccountValues = (franchiseId: string) =>
  apiRequest("getFranchiseAccountValues", null, franchiseId);

// import apiRequest from "./apiRequest";

// export const franchiseRegister = (data: any) =>
//   apiRequest("franchiseRegister", data);

// export const franchiseLogin = (data: any) => apiRequest("franchiseLogin", data);

// export const getFranchaseProfile = (franchiseId: string) =>apiRequest("getFranchaseProfile", null, franchiseId);

// export const updateFranchaseProfile = (formData: any) =>apiRequest("updateFranchaseProfile", formData);

// export const createCompanyReview = (formData: any) =>apiRequest("createCompanyReview", formData);

// export const getAllPincodes = () => apiRequest("getAllPincodes");

// export const getAllCategories = (data: any) =>apiRequest("getAllCategories", data);

// export const getPlans = (data: any) => apiRequest("getPlans", data);

// export const registerTechByFranchise = (data: any) => apiRequest('registerTechByFranchise', data)

// export const addTechSubscriptionPlan = (data: any) => apiRequest("addTechSubscriptionPlan", data);

// export const getAllTechniciansByFranchise = (franchiseId: string) => apiRequest("getAllTechniciansByFranchise", null, franchiseId);

// export const updateTechByFranchise = (data: any) => apiRequest("updateTechByFranchise", data)

// export const getFranchisePlans = (data: any) => apiRequest('getFranchisePlans', data);

// export const getFranchiseSubscriptionPlan = (franchiseId : string) => apiRequest('getFranchiseSubscriptionPlan', null, franchiseId);

// export const getFranchiseAccount = (franchiseId: string) => apiRequest('getFranchiseAccount',null, franchiseId);

// export const getFranchiseAccountValues =(franchiseId: string) => apiRequest('getFranchiseAccountValues', null, franchiseId);