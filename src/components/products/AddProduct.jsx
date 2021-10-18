import React, { useEffect, useState } from 'react'
import { addNewProduct, getCategory } from '../../api/api';
import { Container, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'
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
    let history = useHistory()

    const onFormChange = (e) => {
        setProduct({...product,[e.target.name]: e.target.value})
    }

    const closeModal = () => {
        setShowModal(false)
    }

    //getting all categories
    const getCategoryData = async () => {
        const res = await getCategory()
        setCategories(res.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getCategoryData()
    }, [])

    const submitForm = async (e) => {
        e.preventDefault()
        const res = await addNewProduct(product)
        console.log(res.data)
        setProductData(res.data)
        setShowModal(true)
        // history.push('/')
    }

    return isLoading ? (<h2>Loading...</h2>) : (
        <Container>
            <h2 className="text-center">Add Product </h2>
            <Form onSubmit={(e) => submitForm(e)}>
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

                <Button type="submit" className="btn btn-success">Submit</Button>
            </Form>
            <ProductModal product={productData} showModal={showModal} closeModal={closeModal} />
        </Container>
    )
}

export default AddProduct