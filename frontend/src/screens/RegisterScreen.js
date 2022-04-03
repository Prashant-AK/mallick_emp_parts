import React, { useState, useEffect ,useRef  } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import emailjs from 'emailjs-com';
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_vhq5502', 'template_gzau49r', form.current, 'user_5XaMjCgheClff4rjVTN1G')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset();
      
  };

  const submitHandler = (e) => {

    
    
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
    <h1 style={{color:'white'}}>REGISTER</h1>
    
    
      {message }
      {error }
      {loading }
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label><h4 style={{color:'white'}}>NAME</h4></Form.Label>
          <Form.Control
            type='name'
            name='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label><h4 style={{color:'white'}}>EMAIL ADDRESS</h4></Form.Label>
          <Form.Control
            type="email"
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

        <Form.Group controlId='confirmPassword'>
          <Form.Label><h4 style={{color:'white'}}>CONFIRM PASSWORD</h4></Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <form ref={form} onSubmit={sendEmail}>
        <h4 style={{color:'white'}}>CONFIRM EMAIL ADDRESS</h4>
        <input type="email" name="mail" required='true' placeholder='Confirm mail' size="70"/>
        <div style={{padding: 10}} ></div>
        <Button><input type="submit" value="REGISTER" /></Button>
        </form>
      </Form>

      
      

      <Row className='py-3'>
        <Col>
        <p style={{color:'white'}}>Have an Account?{' '}</p>
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
          <h2 style={{color:'white'}}>LOG IN</h2>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
