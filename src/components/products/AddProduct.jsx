import React, { useEffect, useState } from 'react'
import { addNewProduct, getCategory } from '../../api/api';
import { Container, Form, Button, Spinner, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {useHistory} from 'react-router-dom'
import ProductModal from './ProductModal';

const AddProduct = () => {
    const initialFormData = {
        title: '',
        price: 0,
        description: '',
        category: '',
        image: ''
    }

    const [product,setProduct] = useState(initialFormData)
    const [productData,setProductData] = useState()
    const [categories, setCategories] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [showModal,setShowModal] = useState(false)
    // eslint-disable-next-line no-useless-escape
    let format = /[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]+/
    // let history = useHistory()

    const onFormChange = (e) => {
        setProduct({...product,[e.target.name]: e.target.value})
    }

    const closeModal = () => {
        setShowModal(false)
    }


    //getting all categories
    const getCategoryData = async () => {
        try{
            const res = await getCategory()
            setCategories(res.data)
            setIsLoading(false)
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getCategoryData()
    }, [])

    const submitForm = async (e) => {
        try{
            e.preventDefault()
            const res = await addNewProduct(product)
            console.log(res.data)
            setProductData(res.data)
            setShowModal(true)
            // history.push('/')
        }
        catch(err){
            console.log(err)
        }
    }

    return isLoading ? ( 
    <div className="d-flex justify-content-center">
        <Spinner animation="border" variant="secondary" /> 
    </div>) : (
        <Container>
            <h2 className="text-center">Add Product </h2>
            
            <Form onSubmit={(e) => submitForm(e)}>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        onChange= {(e) => onFormChange(e)}
                        required
                        
                    />
                    <Form.Label>Title</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="number"
                        name="price"
                        onChange= {(e) => onFormChange(e)}
                        required
                        
                    />
                    <Form.Label>Price</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="description"
                        onChange= {(e) => onFormChange(e)}
                    />
                    <Form.Label >Description</Form.Label>
                </Form.Floating>
                <Form.Group className="mb-3">
                    <Form.Select
                    className="me-sm-2" 
                    name="category"
                    onChange= {(e) => onFormChange(e)}
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
                <Form.Floating  className="mb-3">
                    <Form.Control
                     type="text" 
                     name="image"
                     onChange= {(e) => onFormChange(e)}
                    />
                    <Form.Label>Image Path</Form.Label>
                </Form.Floating>

                <Button type="submit" className="btn btn-success " disabled={!product.title.trim() || !product.category.trim() || format.test(product.title)}>Submit</Button>
                    </Col>
                </Row>
            </Form>
            <ProductModal product={productData} showModal={showModal} closeModal={closeModal} />
        </Container>
    )
}

export default AddProduct