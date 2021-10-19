import React from 'react'
import { Col, Card, Button, ListGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import User from './User'
import CartProduct from './CartProduct';

const Cart = ({ cart }) => {

    return (
        <Col>
            <Card style={{ width: "18rem" }}>
                <Card.Header>Date: {cart.date.toString()}</Card.Header>
                <Card.Body>
                    <User id={cart.userId}/>
                    <ListGroup className="list-group-flush">
                    {
                        cart.products.map((product)=>(
                            <CartProduct productId={product.productId} />
                        ))
                    }
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Cart