import axios from "axios";

// Pinata API keys (store in .env file!)
const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY;

export const uploadToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(url, formData, {
    maxBodyLength: "Infinity",
    headers: {
      "Content-Type": `multipart/form-data`,
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_SECRET_API_KEY,
    },
  });

  return { cid: res.data.IpfsHash };
};

