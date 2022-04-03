import axios from 'axios'
import {
  INVEST_LIST_REQUEST,
  INVEST_LIST_SUCCESS,
  INVEST_LIST_FAIL,
  INVEST_DETAILS_REQUEST,
  INVEST_DETAILS_SUCCESS,
  INVEST_DETAILS_FAIL,
  INVEST_DELETE_SUCCESS,
  INVEST_DELETE_REQUEST,
  INVEST_DELETE_FAIL,
  INVEST_CREATE_REQUEST,
  INVEST_CREATE_SUCCESS,
  INVEST_CREATE_FAIL,
  INVEST_UPDATE_REQUEST,
  INVEST_UPDATE_SUCCESS,
  INVEST_UPDATE_FAIL,
  INVEST_CREATE_REVIEW_REQUEST,
  INVEST_CREATE_REVIEW_SUCCESS,
  INVEST_CREATE_REVIEW_FAIL,
  INVEST_TOP_REQUEST,
  INVEST_TOP_SUCCESS,
  INVEST_TOP_FAIL,
} from '../constants/INVESTConstants'
import { logout } from './userActions'

export const listINVESTs = (keyword = '', pageNumber = '') => async (
  dispatch
) => {
  try {
    dispatch({ type: INVEST_LIST_REQUEST })

    const { data } = await axios.get(
      `/api/INVESTs?keyword=${keyword}&pageNumber=${pageNumber}`
    )

    dispatch({
      type: INVEST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INVEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listINVESTDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVEST_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/INVESTs/${id}`)

    dispatch({
      type: INVEST_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INVEST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteINVEST = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVEST_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/INVESTs/${id}`, config)

    dispatch({
      type: INVEST_DELETE_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: INVEST_DELETE_FAIL,
      payload: message,
    })
  }
}

export const createINVEST = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVEST_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/INVESTs`, {}, config)

    dispatch({
      type: INVEST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: INVEST_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateINVEST = (INVEST) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVEST_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/INVESTs/${INVEST._id}`,
      INVEST,
      config
    )

    dispatch({
      type: INVEST_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: INVEST_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: INVEST_UPDATE_FAIL,
      payload: message,
    })
  }
}

export const createINVESTReview = (INVESTId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: INVEST_CREATE_REVIEW_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.post(`/api/INVESTs/${INVESTId}/reviews`, review, config)

    dispatch({
      type: INVEST_CREATE_REVIEW_SUCCESS,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: INVEST_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

export const listTopINVESTs = () => async (dispatch) => {
  try {
    dispatch({ type: INVEST_TOP_REQUEST })

    const { data } = await axios.get(`/api/INVESTs/top`)

    dispatch({
      type: INVEST_TOP_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: INVEST_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
