import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { getAllProducts } from '../../api/api'

const EditProduct = () => {
    const {id} = useParams()
    const [product, setProduct] = useState()
    const [isLoading,setIsLoading] = useState(true)

    const getProductData = async () => {
        try{
            const res = await getAllProducts(id)
            setProduct(res.data)
            setIsLoading(false)
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])
    return isLoading ? (<h2>Loading...</h2>) :(
        <div>
            
        </div>
    )
}

export default EditProduct