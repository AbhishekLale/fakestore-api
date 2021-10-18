import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import { getAllProducts, getCategory, updateProduct } from '../../api/api'
import { Container, Form, Button } from 'react-bootstrap'
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

    const {id} = useParams()
    const [product,setProduct] = useState(initialFormData)
    const [productData,setProductData] = useState()
    const [categories, setCategories] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [showModal,setShowModal] = useState(false)

    const onFormChange = (e) => {
        setProduct({...product,[e.target.name]: e.target.value})
    }

    const closeModal = () => {
        setShowModal(false)
    }


    const submitForm = async (e) => {
        e.preventDefault()
        const res = await updateProduct(id,product)
        console.log(res.data)
        setProductData(res.data)
        setShowModal(true)
        // history.push('/')
    }

    const getProductData = async () => {
        try{
            const res = await getAllProducts(id)
            const cat = await getCategory()
            setCategories(cat.data)
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
        <Container>
            <h2 className="text-center">Edit Product </h2>
            <Form onSubmit={(e) => submitForm(e)}>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="title"
                        value={product.title}
                        onChange= {(e) => onFormChange(e)}
                        required
                        
                    />
                    <Form.Label>Title</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="number"
                        name="price"
                        value={product.price}
                        onChange= {(e) => onFormChange(e)}
                        required
                        
                    />
                    <Form.Label>Price</Form.Label>
                </Form.Floating>
                <Form.Floating className="mb-3">
                    <Form.Control
                        type="text"
                        name="description"
                        value = {product.description}
                        onChange= {(e) => onFormChange(e)}
                    />
                    <Form.Label >Description</Form.Label>
                </Form.Floating>
                <Form.Group className="mb-3">
                    <Form.Select
                    className="me-sm-2" 
                    name="category"
                    onChange= {(e) => onFormChange(e)}
                    value= {product.category}
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
                     value={product.image}
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

export default EditProduct