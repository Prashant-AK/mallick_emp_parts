import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Row, Col, ListGroup, Image, Card, Button ,Form,Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, orderId, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h3>Investment by {order.user.name}</h3>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <p style={{color:'black'}}>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p style={{color:'black'}}>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <div style={{padding: 30}} ></div>
          <h2 id="trans">INVESTMENTS</h2>
              <Table striped bordered hover responsive className='table-sm' >
            <thead>
              <tr>
                <th><Form.Label >PROPERTY</Form.Label></th>
                <th><Form.Label >DATE</Form.Label></th>
                <th><Form.Label >INVESTMENT AMOUNT</Form.Label></th>
                <th><Form.Label >R.O.I(%)</Form.Label></th>
                <th><Form.Label >Returns</Form.Label></th>
                
              </tr>
            </thead>
            <tbody>
                <tr key={order._id}>
                  <td><Form.Label >{order.name}</Form.Label></td>
                  <td><Form.Label >{order.createdAt.substring(0, 10)}</Form.Label></td>
                  <td><Form.Label >{order.totalPrice}</Form.Label></td>
                  <td><Form.Label >{order.taxPrice}</Form.Label></td>
                  <td><Form.Label >{order.return}</Form.Label></td>
                </tr>

            </tbody>
          </Table>
          <div style={{padding: 30}} ></div>
          <h2 id="trans">TRANSACTIONS</h2>

        
          <Table striped bordered hover responsive className='table-sm' >
            <thead>
              <tr>
                <th><Form.Label style={{color:'black'}}>DATE</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>PROPERTY NAME</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>DESCRIPTION</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>CREDIT / DEBIT</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>TYPE</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>TRANSACTION ID</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>AMOUNT</Form.Label></th>
                
              </tr>
            </thead>

            <tbody>
            {order.transactions.map((item, index) => (
                <tr key={index}>
                  <td><Form.Label style={{color:'black'}}>{item.date}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.propn}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.desc}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.cred}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.type}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.trid}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.amount}</Form.Label></td>
                </tr>
              ))}
            </tbody>
            

          </Table>
          <div style={{padding: 30}} ></div>
          <h2 id="docs">My DOCUMENTS</h2>

        
          <Table striped bordered hover responsive className='table-sm' >
            <thead>
              <tr>
                <th><Form.Label style={{color:'black'}}>DOCUMENT TYPE</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>PROPERTY NAME</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>OWNERSHIP</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>DATE</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>VIEW</Form.Label></th>
                
              </tr>
            </thead>
            

                <tbody>
                {order.documents.map((item, index) => (
                <tr key={index}>
                  <td><Form.Label style={{color:'black'}}>{item.type}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.propn}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.own}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.date}</Form.Label></td>
                  <td><a href={item.view} target="_blank"><Form.Label style={{color:'black'}}>VIEW</Form.Label></a></td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{padding: 30}} ></div>
          <h2 id="spv">SPV</h2>

        
          <Table striped bordered hover responsive className='table-sm' >
            <thead>
              <tr>
              <th><Form.Label style={{color:'black'}}>PROPERTY NAME</Form.Label></th>
              <th><Form.Label style={{color:'black'}}>DATE</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>SPV</Form.Label></th>
                <th><Form.Label style={{color:'black'}}>POWER OF ATTORNEY</Form.Label></th>
                
              </tr>
            </thead>
            <tbody>
              {order.documents.map((item, index) => (
                <tr key={index}>
                <td><Form.Label style={{color:'black'}}>{item.propn}</Form.Label></td>
                  <td><Form.Label style={{color:'black'}}>{item.date}</Form.Label></td>
                  <td><a href={item.spv} target="_blank"><Form.Label style={{color:'black'}}>VIEW</Form.Label></a></td>
                  <td><a href={item.attorney} target="_blank"><Form.Label style={{color:'black'}}>VIEW</Form.Label></a></td>
                </tr>
              ))}
            </tbody>
          </Table>
            </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total amount invested</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Interest</Col>
                  <Col>{order.interest}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Earnings</Col>
                  <Col>{order.earnings}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Present Value</Col>
                  <Col>{order.preval}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
