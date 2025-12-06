import axios from 'axios';

const ENDPOINT = process.env.PUBLIC_ENDPOINT;

export default async function getData() {
    console.log(ENDPOINT);
    try {
        const response = await axios.get(ENDPOINT);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}