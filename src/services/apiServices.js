import axios from 'axios';

const services = {};

services.getDebits = (data) => {
    return axios.get('/debits');
}

services.getCredits = (data) => {
    return axios.get('/credits');
}

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