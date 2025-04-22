export const getBaseUrl = () => {
    return import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PROD_API_URL
      : import.meta.env.VITE_DEV_API_URL;
  };
  