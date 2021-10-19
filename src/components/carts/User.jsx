import React, { useEffect,useState } from 'react'
import { Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUser } from '../../api/api'


const User = ({id}) => {
    const [user,setUser] = useState()
    const [isloading, setIsLoading] = useState(true)

    const getUserData = async() => {
        const res = await getUser(id)
        setUser(res.data)
        setIsLoading(false)
    }

    useEffect(() => {
        getUserData()
    },[])
    return isloading ? (<React.Fragment> </React.Fragment>) : (
        <React.Fragment>
        <Card.Title>
            {user.name.firstname} {user.name.lastname}
            </Card.Title>
        </React.Fragment>
    )

}

export default User