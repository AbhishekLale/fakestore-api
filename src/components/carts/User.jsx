import React, { useEffect,useState } from 'react'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from '../../api/api'


const User = ({id}) => {
    const [user,setUser] = useState()

    const getUserData = async(id) => {
        const res = await getUser(id)
        setUser(res.data)
    }

    useEffect(() => {
        getUserData()
    },[])
    return(
        <React.Fragment>
        <Card.Title>
            jk
            </Card.Title>
        </React.Fragment>
    )

}

export default User