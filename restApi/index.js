/**
 * Function to fetch datas
 * @param {*} method 
 * @param {*} endpoint 
 * @param {*} data 
 * @param {*} headers 
 * @returns 
 */
async function restful(method, endpoint, data, headers = {}) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: method !== 'GET' ? JSON.stringify(data) : undefined
    };

    return fetch(endpoint, options)
        .then(response => response.json())
        .catch(error => {
            console.log('Error:', error);
            throw error;
        });
}

module.exports = restful;
