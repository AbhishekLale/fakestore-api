import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllProducts, getCategory, updateProduct } from '../../api/api'
import { Container, Form, Button, Spinner, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductModal from './ProductModal';

const EditProduct = () => {
    const initialFormData = {
        title: '',
        price: 0,
        description: '',
        category: '',
        image: ''
    }

    const { id } = useParams()
    const [product, setProduct] = useState(initialFormData)
    const [productData, setProductData] = useState()
    const [categories, setCategories] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    // eslint-disable-next-line no-useless-escape
    let format = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/

    const onFormChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const closeModal = () => {
        setShowModal(false)
    }


    const submitForm = async (e) => {
        try {
            e.preventDefault()
            const res = await updateProduct(id, product)
            console.log(res.data)
            setProductData(res.data)
            setShowModal(true)
            // history.push('/')
        }
        catch (err) {
            console.log(err)
        }

    }

    const getProductData = async () => {
        try {
            const res = await getAllProducts(id)
            const cat = await getCategory()
            setCategories(cat.data)
            setProduct(res.data)
            setIsLoading(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getProductData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return isLoading ? (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="secondary" />
        </div>) : (
        <Container>
            <h2 className="text-center">Edit Product </h2>
            <Form onSubmit={(e) => submitForm(e)}>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) => onFormChange(e)}
                        required

                    />
                    <Form.Label>Title</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => onFormChange(e)}
                        required

                    />
                    <Form.Label>Price</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={(e) => onFormChange(e)}
                    />
                    <Form.Label >Description</Form.Label>
                </Form.Floating>
                <Form.Group className="mb-3">
                    <Form.Select
                        className="me-sm-2"
                        name="category"
                        onChange={(e) => onFormChange(e)}
                        value={product.category}
                        required
                    >
                        <option>Choose Category </option>
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={(e) => onFormChange(e)}
                    />
                    <Form.Label>Image Path</Form.Label>
                </Form.Floating>
                <Button type="submit" className="btn btn-success" disabled={!product.title.trim() || !product.category.trim() || format.test(product.title)}>Submit</Button>
                        </Col>
                    </Row>
            </Form>
            <ProductModal product={productData} showModal={showModal} closeModal={closeModal} />
        </Container>
    )
}

export default EditProduct