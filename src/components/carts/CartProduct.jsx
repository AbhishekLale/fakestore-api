import React,{useState,useEffect} from 'react'
import { ListGroupItem } from 'react-bootstrap'
import { getAllProducts } from '../../api/api'

const CartProduct = ({productId}) => {
    const [product,setProduct] = useState()
    const [isLoading,setisLoading] = useState(true)

    const getProductData = async () => {
        try{
            const res = await getAllProducts(productId)
            setProduct(res.data)
            setisLoading(false)
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getProductData()
    },[])

    return isLoading ? (<React.Fragment> </React.Fragment>) : (
        <React.Fragment>
            <ListGroupItem>{product.title}</ListGroupItem>
        </React.Fragment>
       )
}


export default CartProduct