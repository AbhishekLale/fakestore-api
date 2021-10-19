import React, { useEffect, useState, useRef } from 'react'
import { getAllProducts, limitProducts, deleteProduct } from '../../api/api'
import Product from '../products/ProductCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Form, Spinner } from 'react-bootstrap'


const Home = () => {
    //Initilising states
    const [products, setProducts] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const checkbox = useRef()

    //fetching limited products
    const getLimitProducts = async () => {
        const res = await limitProducts()
        setProducts(res.data)
        setIsLoading(false)
    }

    //fetching all products
    const getData = async () => {
        try {
            const res = await getAllProducts()
            setProducts(res.data)
            setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    //Limiting products
    const onCheck = () => {
        if (checkbox.current.checked === true) {
            getLimitProducts()
        }
        else {
            getData()
        }
    }

    //delete product
    const delProduct = async (id) => {
        try {
            const res = await deleteProduct(id)
            const productData = res.data
            setProducts(
                products.filter((product) => {
                    return product.id !== productData.id
                })
            )
        }
        catch (e) {
            console.log(e)
        }
    }

    //calling fetch function
    useEffect(() => {
        getData()
    }, [])

    return isLoading ? (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="secondary" />
        </div>) : (
        <div>
            <h2 className="text-center">Welcome</h2>

            <Container className="mt-1">
                <div className="d-flex justify-content-end m-1">
                    <Form.Check label="Limit Products" className="m-1" ref={checkbox} onChange={onCheck} />
                </div>
                <Row xs={3}>

                    {
                        products.map((product, id) => (
                            <Product product={product} key={id} delProduct={delProduct} />
                        ))
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Home