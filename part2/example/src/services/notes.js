import axios from 'axios'

// Both the frontend and backend are at the same address so we use a relative URL
const baseUrl = '/api/notes'

// Changing the url to this causes problems.
// The issue is CORS (Cross-Origin Resource Sharing) which allows restricted resources on a web page to be requested
// from another domain outside the domain from which the first resource was served

// In our context, the problem is that the JS code of an app that runs in a browser can only communicate with a server
// in the same origin. The server is at port 3001 while the frontend is at port 3000 so they have different origins

// Note that .then still returns a promise. Since we're only using response.data, to make our life easier, we just
// return a promise containing it
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

// Since the keys and values have the same name, we can simplify it by removing the keys (ES6)

const exported = { getAll, create, update }
export default exported