import React from 'react'
import { Modal, Button, ListGroup, ListGroupItem } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductModal = ({ product, showModal, closeModal }) => {
  return !showModal ? (<React.Fragment></React.Fragment>) : (
    <Modal show={showModal} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header >
        <Modal.Title>{product.title} : {product.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {product.description}
      </Modal.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Price: {product.price}</ListGroupItem>
          <ListGroupItem>category: {product.category}</ListGroupItem>
        </ListGroup>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProductModal