import React,{useEffect,useState, useRef} from 'react'
import { getAllProducts, limitProducts } from '../../api/api'
import Products from '../products/ProductCard'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Button,Form } from 'react-bootstrap'
import { useHistory } from 'react-router';


const Home = () => {
    //Initilising states
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const checkbox = useRef()

    const getLimitProducts = async () => {
        const res = await limitProducts()
        setProducts(res.data)
        setIsLoading(false)
    }

    const onCheck = () => {
        if( checkbox.current.checked === true){
            getLimitProducts()
        }
        else{
            getData()
        }
    }

    //fetching data
    const getData = async () => {
        try{
            const res =  await getAllProducts()
            setProducts(res.data)
            setIsLoading(false)
        }
        catch(e){
            console.log(e)
        }
    }
    //
    useEffect(() => {
        getData()
    },[])
    return isLoading ? (<h2>Loading...</h2>) : (
        <div>
            <h2 className="text-center">Welcome</h2>
            
            <Container className="mt-1">
            <div className="d-flex justify-content-end m-1">
                <Form.Check label="Limit Products" className="m-1" ref={checkbox} onChange={onCheck} />
            </div>
            <Row xs={3}>
                
            {
                products.map((product,id) => (
                    <Products product={product} key={id}/>
                ))
            }
            </Row>
            </Container>
        </div>
    )
}

export default Home