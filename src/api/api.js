import axios from 'axios'

const api = axios.create({ 
    baseURL:"https://fakestoreapi.com"
})

//GET Requests

export const getAllProducts = async (id) => {
    id = id || ''
    return await api.get(`/products/${id}`)
}

export const limitProducts = async () => {
    return await api.get("/products?limit=5")
}

export const getCategory = async () => {
    return await api.get(`/products/categories`)
}

export const getCarts = async () => {
    return await api.get("/carts")
}


//PUT Requests

//POST Requests
export const addNewProduct = async (product) => {
    return await api.post(`/products`,product)
}

//DELETE Requests
export const deleteProduct = async (id) => {
    return await api.get(`/products/${id}`)
}