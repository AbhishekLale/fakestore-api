import React from 'react'
import { Card, ListGroup, ListGroupItem, Button, Col, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'


const Product = ({ product,delProduct }) => {

    return (
        <Col>
                <Card style={{ width: '18rem' }}>
                    <Col xs={6} md={6}>
                        <Image variant="top" src={product.image} thumbnail />
                    </Col>
                    <Card.Body>
                        <Link to={`/product/${product.id}`}>
                            <Card.Title >{product.title}</Card.Title>
                        </Link>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Price: {product.price}</ListGroupItem>
                        <ListGroupItem>Category: {product.category}</ListGroupItem>
                        <ListGroupItem>Rating: {product.rating.rate}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Link className="btn btn-warning" to={`/product/edit/${product.id}`} >Edit</Link>
                        <Button variant="danger" className="m-1" onClick={() => delProduct(product.id)}>Delete</Button>
                    </Card.Body>
                </Card>
        </Col>
        
    )
}

export default Product