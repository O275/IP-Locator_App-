import axios from 'axios';

export const fetchIpDetails = async (ip) => {
  const apiKey = process.env.REACT_APP_IPAPI_KEY;
  const url = ip
    ? `http://api.ipapi.com/api/${ip}?access_key=${apiKey}`
    : `http://api.ipapi.com/api/check?access_key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching IP details');
  }
};
