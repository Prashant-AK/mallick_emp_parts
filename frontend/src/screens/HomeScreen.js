import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { listProducts } from '../actions/productActions'



export const homeObjThree = {
  lightBg: true,
  lightText: false,
  lightTextDesc: false,
  topLine: "",
  headline: "",
  description:
    "",
  buttonLabel: "View Opportunity",
  imgStart: "start",
  img: "https://firebasestorage.googleapis.com/v0/b/wasd4gogul.appspot.com/o/Mobile.gif?alt=media&token=7ffa6f1b-889a-4083-8a18-f9e13662fa80",
  alt: "Vault"
};

const HomeScreen = ({ match }) => {
  


  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
 const backgroundH="https://firebasestorage.googleapis.com/v0/b/wasd4gogul.appspot.com/o/Mobile.gif?alt=media&token=7ffa6f1b-889a-4083-8a18-f9e13662fa80"
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
    </>
  )
}

export default HomeScreen
