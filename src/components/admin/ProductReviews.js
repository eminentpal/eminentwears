import React, {Fragment, useState, useEffect} from 'react';

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {useDispatch, useSelector} from 'react-redux';
import {getProductReviews , clearErrors, deleteProductReview} from '../../actions/productActions'
import Sidebar from './Sidebar'
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { DELETE_REVIEW_RESET } from '../../constants/productConstants';

const ProductReviews = ({history}) => {
    const[productId, setProductId] = useState('')
    const alert = useAlert()
    const dispatch = useDispatch()
    
    
    const { loading, error, reviews} = useSelector(state => state.productReviews);

 const { isDeleted } = useSelector(state => state.newReview)

    
    useEffect(() => {
    

    
     if(error) { 
          alert.error(error);
          dispatch(clearErrors());
        }  

        if(productId !== '') {
            dispatch(getProductReviews(productId) )
        }

          if(isDeleted) {
            alert.success('Review deleted')  
            history.push('/admin/reviews') 
            dispatch({type: DELETE_REVIEW_RESET})
          }

      
       
    }, [dispatch, isDeleted, alert, productId])



    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId))
    }
    
     const setReviews = () => {
         const data = {
             columns: [
                 {
                     label: 'Review ID',
                     field: 'id',
                     sort: 'asc'
                 },
    
                 {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },

                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },

                {
                    label: '    User',
                    field: 'user',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                  
                },
    
             ],

             rows: []
         }
         reviews?.forEach(review => {
             data.rows.push({
                 id: review._id,
                 rating:review.rating,
                 comment: review.comment,
                 user: review.name,
                 
              actions: 
                       <button className="btn btn-danger py-1 px-2 ml-2"   onClick={() => dispatch(deleteProductReview(review._id, productId))}   >
                       <i className='fa fa-trash ' ></i> 
                       </button>
                       
    
             })
         })
    
         return data;
     
       
     }

    return (
        <Fragment>
        <MetaData title="Product Reviews" />
          <div  className="row">
           <div className="col-12 col-md-2" >
            <Sidebar />
           </div>
           <div className="col-12 col-md-10" >
               <Fragment  >
                
               <div className="row justify-content-center mt-5">
			<div className="col-5">
                            <form  onSubmit={submitHandler} >
                                <div className="form-group">
                                    <label htmlFor="productId_field">Enter Product ID</label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        name='productId'
                                        value={productId}
                                        onChange={(e) =>setProductId(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
								</button>
                            </form>
                        </div>
            
        </div>
          {reviews  && reviews.length > 0 ? (
            
                   < MDBDataTable
                    data={setReviews()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />

                
          ) : ( <p className='mt-5 text-center'> No Reviews. </p>  ) }
               
        

               </Fragment>
           </div>
          </div>
        </Fragment>
    )
}

export default ProductReviews
