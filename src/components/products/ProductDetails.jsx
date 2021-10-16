import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../../api/api';
import { Container, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router';

const ProductDetails = () => {
    const [product, setProduct] = useState()
    const [isLoading,setIsLoading] = useState(true)
    const { id } = useParams()
    
    const containerStyle = {
        width: "50%",
        border: "solid black 1px"
    }

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
    return isLoading ? (<h2>Loading..</h2>) :
        (
        <Container fluid style={containerStyle}>
            <div className="d-flex justify-content-center">
                <Image src={product.image} width={200} height={200}/>
            </div>
            <br />
            <div className="text-center">
                <strong>{product.title}</strong>
                <p>price: {product.price}$</p>
                <p>{product.description}</p>
            </div>
        </Container>
    )
}

export default ProductDetails