import axios from 'axios'
const baseUrl = 'http://localhost:3002/notes'

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