import React, { useEffect, useState } from 'react'
import { addNewProduct, getCategory } from '../../api/api';
import { Container, Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import {useHistory} from 'react-router-dom'

const AddProduct = () => {
    const [categories, setCategories] = useState()
    const [isLoading, setIsLoading] = useState(true)
    
    let history = useHistory()


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
        const res = await addNewProduct()
        console.log(res.data)
        history.push('/')
    }

    return isLoading ? (<h2>Loading...</h2>) : (
        <Container>
            <h2 className="text-center">Add Product </h2>
            <Form onSubmit={(e) => submitForm(e)}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        
                        required
                        
                    />
                    <Form.Label>Title</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="number"
                        name="price"
                        
                        required
                        
                    />
                    <Form.Label>Price</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="description"
                        
                    />
                    <Form.Label >Description</Form.Label>
                </Form.Floating>
                <Form.Group className="mb-3">
                    <Form.Select className="me-sm-2" name="category" required >
                        {
                            categories.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                     type="file" 
                     name="image"
                    
                    />
                    <Form.Label>Image of Product</Form.Label>
                </Form.Group>

                <Button type="submit" className="btn btn-success">Submit</Button>
            </Form>

        </Container>
    )
}

export default AddProduct