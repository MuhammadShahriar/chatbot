import axios from 'axios';

const instance = axios.create({
    baseURL: "https://directline.botframework.com/v3/directline/conversations",
});

export default instance;