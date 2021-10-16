import React,{useEffect,useState} from 'react'
import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCarts } from '../../api/api';
import Cart from './Cart';

const CartsGrid = () => {
    const [carts,setCarts] = useState()
    const [isLoading,setIsLoading] = useState(true)

    //fetching carts
    const getCartsData = async () => {
        try{
            const res = await getCarts()
            setCarts(res.data)
            setIsLoading(false)
        }
        catch(e){
            console.log(e)
        }
    }

    //
    useEffect(() => {
        getCartsData()
    },[])
    return isLoading ? (<h2>Loading...</h2>) : (
        <Container>
            <Row xs={3}>
                {
                    carts.map((cart,id)=> (
                        <Cart cart={cart} key={id}/>
                    ))
                }
            </Row>
        </Container>
    )
}


export default CartsGrid