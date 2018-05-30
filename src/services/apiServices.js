import axios from 'axios';

const services = {};

services.getData = (path) => {
    return axios.get(path);
}

services.postTo = (data) => {
    return axios({
        method: 'POST',
        url: data.path,
        data: {
            content: data.content
        }
    })
}
export default services;