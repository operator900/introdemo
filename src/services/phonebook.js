import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            throw error
        })
    }
const create = (newObject) => {
    return axios.post(baseUrl, newObject)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error creating data:', error)
            throw error
        })
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error updating data:', error)
            throw error
        })
}

export default {
    getAll,
    create,
    update
}