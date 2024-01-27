require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://api-inference.huggingface.co/models';
const MODEL_NAME = 'text-davinci-003'; // Choose a different model name if desired

function getFormattedHeaders() {
  return {
    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
    'Content-Type': 'application/json',
  };
}

async function sendRequest({ input }) {
  try {
    const url = `${BASE_URL}/${MODEL_NAME}`;
    const data = { inputs: [input] };
    const headers = getFormattedHeaders();

    const response = await axios.post(url, data, { headers });
    return response.data[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function main() {
  const prompt = 'Write a short poem about autumn leaves.';
  const result = await sendRequest({ input: prompt });
  console.log(result);
}

main().catch((err) => {
  console.error(err);
});