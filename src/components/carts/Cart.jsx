import React from 'react'
import { Col, Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './User'

const Cart = ({ cart }) => {

    return (
        <Col>
            <Card style={{ width: "18rem" }}>
                <Card.Header>{cart.date.toString()}</Card.Header>
                <Card.Body>
                    <User id={cart.userId}/>
                    <ListGroup className="list-group-flush">
                    {
                        cart.products.map((product)=>(
                            <ListGroupItem>{product.productId}</ListGroupItem>
                        ))
                    }
                    </ListGroup>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Cart