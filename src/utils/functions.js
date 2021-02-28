function callApi(url, body) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  .then((res) => res.json())
  .catch((err) => {
    console.log(err);
  });
}

function callApiWithAuth(apiPath, body = null){
  let params = {
    method: apiPath.method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      'token': localStorage.getItem('refreshToken')
    }
  };
  if (body) {
    params = {
      ...params,
      body: JSON.stringify(body)
    }
  }
  return fetch(apiPath.url, params)
  .then((res) => res.json());
}

export {
  callApi,
  callApiWithAuth
}