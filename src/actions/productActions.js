import axios from 'axios'
import{ ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
        NEW_REVIEW_SUCCESS,
        NEW_REVIEW_FAIL,
   
        ADMIN_PRODUCTS_REQUEST,
        ADMIN_PRODUCTS_SUCCESS,
        ADMIN_PRODUCTS_FAIL,
          NEW_PRODUCT_REQUEST,
        NEW_PRODUCT_SUCCESS,
      
        NEW_PRODUCT_FAIL,
        DELETE_PRODUCT_REQUEST,
        DELETE_PRODUCT_SUCCESS,
     
        DELETE_PRODUCT_FAIL,
        UPDATE_PRODUCT_REQUEST,
        UPDATE_PRODUCT_SUCCESS,
        UPDATE_PRODUCT_FAIL,
        GET_REVIEWS_REQUEST,
        GET_REVIEWS_SUCCESS,
        
        GET_REVIEWS_FAIL,
        DELETE_REVIEW_REQUEST,
        DELETE_REVIEW_SUCCESS,
        DELETE_REVIEW_FAIL,

} from '../constants/productConstants'


export const getProducts = (keyword= '', currentPage, price, category, rating=0) => async (dispatch) => {
    try {

        dispatch({type: ALL_PRODUCTS_REQUEST})

        //price of 0 is 1 dollar
       let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`

       if (category){
         link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}` 
       }

        const {data} = await axios.get(link)
        
        dispatch({type:ALL_PRODUCTS_SUCCESS,
                payload: data 



                // dispatch({type: ALL_PRODUCTS_REQUEST})

                // const {data} = await axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`)
        
                // //this was bfr we added keyword
                // // const {data} = await axios.get(`/api/v1/products?page=${currentPage}`)
                // //bfr we added pages
                // // const {data} = await axios.get(`/api/v1/products`)
                
                // dispatch({type:ALL_PRODUCTS_SUCCESS,
                //         payload: data
        })

         
    } catch (error) {
        dispatch({
          type: ALL_PRODUCTS_FAIL,
          payload: error.response.data.message
        })
    }
}



//NEW PRODUCT REDUCER


export const newProduct = (productData) => async (dispatch) => {
    try {

        dispatch({type: NEW_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
       
        const {data} = await axios.post(`/api/v1/admin/product/new`, productData, config)
        
       
        dispatch({type:NEW_PRODUCT_SUCCESS,
                payload: data
        })

    }
    catch (error) {
                dispatch({
                  type: NEW_PRODUCT_FAIL,
                  payload: error.response.data.message
                })
            }

}
  


//Delete product

export const deleteProduct = (id) => async (dispatch) => {
    try {

        dispatch({type: DELETE_PRODUCT_REQUEST})

       
       
        const {data} = await axios.delete(`/api/v1/admin/product/${id}`)
        
       
        dispatch({type:DELETE_PRODUCT_SUCCESS,
                payload: data.success
        })

    }
    catch (error) {
                dispatch({
                  type: DELETE_PRODUCT_FAIL,
                  payload: error.response.data.message
                })
            }

}


//Update Product

export const updateProduct = (id, productData) => async (dispatch) => {
    try {

        dispatch({type: UPDATE_PRODUCT_REQUEST})

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
       
        const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config )
        
       
        dispatch({type: UPDATE_PRODUCT_SUCCESS,
                payload: data.success
        })

    }
    catch (error) {
                dispatch({
                  type: UPDATE_PRODUCT_FAIL,
                  payload: error.response.data.message
                })
            }

}







//clear errors

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}

//Get Single Product

export const getProductDetails = (id) => async (dispatch) => {
    try {

        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(`/api/v1/product/${id}`)
        
        dispatch({type:PRODUCT_DETAILS_SUCCESS,
                payload: data.product
        })

         
    } catch (error) {
        dispatch({
          type:PRODUCT_DETAILS_FAIL,
          payload: error.response.data.message
        })
    }
}


//Create Review

export const newReview = (reviewData) => async (dispatch) => {
    try {

        dispatch({type: NEW_REVIEW_REQUEST})

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        //we use a put request cus at our Backend we check if is a new review or we updating a previous review
        const {data} = await axios.put(`/api/v1/review`, reviewData, config)
        
       
        dispatch({type:NEW_REVIEW_SUCCESS,
                payload: data.success
        })


    }
    catch (error) {
                dispatch({
                  type: NEW_REVIEW_FAIL,
                  payload: error.response.data.message
                })
            }

}

//GET PRODUCT REVUEWS FOR ADMIN

export const getAdminProducts = () => async (dispatch) => {
    try {

        dispatch({type: ADMIN_PRODUCTS_REQUEST})
         
              const {data} = await axios.get(`/api/v1/admin/products`)
              
              dispatch({type:ADMIN_PRODUCTS_SUCCESS,
                     payload: data.products})
         
    } catch (error) {
        dispatch({
          type: ADMIN_PRODUCTS_FAIL,
          payload: error.response.data.message
        })
    }
}
        
//GET PRODUCTS REVIEWS FOR ADMIN

export const getProductReviews = (id) => async (dispatch) => {
    try {

        dispatch({type: GET_REVIEWS_REQUEST})
         
              const {data} = await axios.get(`/api/v1/reviews?id=${id}`)
              
              dispatch({type:GET_REVIEWS_SUCCESS,
                     payload: data.reviews})

                    
         
    } catch (error) {
        dispatch({
          type: GET_REVIEWS_FAIL,
          payload: error.response.data.message
        
        })
    }
}
  

//delete PRODUCT review FOR ADMIN

export const deleteProductReview = (id, productId) => async (dispatch) => {
    try {

        dispatch({type: DELETE_REVIEW_REQUEST})
         
              const {data} = await axios.delete(`/api/v1/reviews?id=${id}&productId=${productId}`)
              
            
              dispatch({type:DELETE_REVIEW_SUCCESS,
                     payload: data.success})

                    
         console.log(data)
    } catch (error) {
        dispatch({
          type: DELETE_REVIEW_FAIL,
          payload: error.response.data.message
        
        })

        console.log (error.response.data.message)
    }
}