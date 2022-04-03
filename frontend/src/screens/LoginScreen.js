import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      
      <img
            style={{ border: "8px solid white", borderRadius: "4%" ,height:'500px'}}
            alt="complex"
            src="https://i.guim.co.uk/img/media/ac01822e1237b350779e9e41ab69c8bcc8d292ea/0_0_6016_3611/master/6016.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e8ed1dcb5b915acb79446d4bf5202eac"
          />
          

{error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      
      
      <h1 style={{color:'white'}}>LOG IN</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label><h4 style={{color:'white'}}>EMAIL ADDRESS</h4></Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label><h4 style={{color:'white'}}>PASSWORD</h4></Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
        <h5 style={{color:'white'}}>LOG IN</h5>
        </Button>
      </Form>
      
      <Col>
      <Row className='py-3'>
        <Col>
        <p style={{color:'white'}}>NEW CUSTOMER ?{' '}</p>
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          <h5 style={{color:'#808080'}}>REGISTER</h5>
          </Link>
        </Col>
      </Row>

      </Col>

      

      
      
    </FormContainer>
  )
}

export default LoginScreen