const AuthHeader = 'dfsdfjskdfnkdsfkd'

const baseUrl = process.env.REACT_APP_BACKEND

const callFetch = (url, params) => {
  const fullUrl = `${baseUrl}${url}`
  return new Promise((resolve, reject) => {
    fetch(fullUrl, params)
      .then(response => {
        if(response.status >= 300 || response.status < 200) {
          reject(new Error('something worng happenned'))
        }
        return response.json()
      })
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const apiParams = {
  headers: {
    'Authorization': AuthHeader,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': true
  }
};

export default class {
  get = (url) => {
    const fullParams = { ...apiParams, method: 'GET' };
    return callFetch(url, fullParams);
  };

  post = (url, data) => {
    const fullParams = { ...apiParams, method: 'POST', body: JSON.stringify(data) };
    return callFetch(url, fullParams)
  };

  put = (url, data) => {
    const fullParams = { ...apiParams, method: 'PUT', body: JSON.stringify(data) };
    return callFetch(url, fullParams)
  }

  delete = (url) => {
    const fullParams = { ...apiParams, method: 'DELETE' };
    return callFetch(url, fullParams)
  }
}
