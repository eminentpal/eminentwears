import {
    CREATE_ORDER_REQUEST ,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDERS_DETAILS_REQUEST,
    ORDERS_DETAILS_SUCCESS,
    ORDERS_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_RESET,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_RESET,
    CLEAR_ERRORS 
} from '../constants/orderConstants'

export const newOrderReducer = (state = {}, action) => {
      switch(action.type){
         
     case   CREATE_ORDER_REQUEST :
         
         return {
             ...state,
             loading: true
        }

       case CREATE_ORDER_SUCCESS:

        return { 
            
           loading: false,
           order: action.payload
        }

        case CREATE_ORDER_FAIL :
            return{
                
                loading: false,
                error: action.payload
            }
               case CLEAR_ERRORS:
                   return {
                       ...state,
                       error: null
                   }
     


          default:
              return state
      }
}


export const myOrdersReucer = (state = {orders: []} , action) => {
    switch (action.type) {

      case  MY_ORDERS_REQUEST: 
      return{
          loading: true
      }

      case MY_ORDERS_SUCCESS:
          return {
              loading: false,
              orders: action.payload
          }

          case MY_ORDERS_FAIL: 
          return {
              loading: false,
              error: action.payload
          }

          case CLEAR_ERRORS:
              return {
                 ...state,
                  error: null
              }
        default:
            return state;
    }
}


//note thta order:{} because we expecting an object from backend but the above one os orders:[] because we expect array of orders
export const myOrderDetailsReducer = (state = { order: {} } , action) => {
    switch (action.type) {

      case  ORDERS_DETAILS_REQUEST: 
      return{
          loading: true
      }

      case ORDERS_DETAILS_SUCCESS:
          return {
              loading: false,
              order: action.payload
          }

          case ORDERS_DETAILS_FAIL: 
          return {
              loading: false,
              error: action.payload
          }

          case CLEAR_ERRORS:
              return {
                 ...state,
                  error: null
              }
        default:
            return state;
    }
}


export const allOrdersReducer = (state = { orders: [] } , action) => {
    switch (action.type) {

      case  ALL_ORDERS_REQUEST: 
      return{
          loading: true
      }

      case ALL_ORDERS_SUCCESS:
          return {
              loading: false,
              //we are expecting an object and in the object we are targeting the orders array inside the action.payload object thats
              //whey we said action.payload.orders. Console log to see it in action.
              orders: action.payload.orders,
              totalAmount: action.payload.totalAmount
          }

          case ALL_ORDERS_FAIL: 
          return {
              loading: false,
              error: action.payload

          }

          case CLEAR_ERRORS:
              return {
                 ...state,
                  error: null
              }
        default:
            return state;
    }
}

//(state =  {} , action) if you put state this way and its not pulling out on the useselector
//den for eg in const  put order: {} it will pull it out from the store

export const orderReducer = (state =  {} , action) =>{
    switch (action.type) {
        
            case UPDATE_ORDER_REQUEST:
            case  DELETE_ORDER_REQUEST:
           return { 
               ...state,
             loading: true,
           } 

    
            

            case UPDATE_ORDER_SUCCESS :
        
            return {
                ...state,
                loading: false,
                 isUpdated: action.payload
            }

            case DELETE_ORDER_SUCCESS :
        
            return {
                ...state,
                loading: false,
                 isDeleted: action.payload
            }

            
                case UPDATE_ORDER_FAIL:
                case  DELETE_ORDER_FAIL:
                return {
                   ...state, 
                   error: action.payload
                  
                } 
           
                case UPDATE_ORDER_RESET :
                return {
                   ...state,
                   isUpdated: false
                }

                case DELETE_ORDER_RESET :
                    return {
                       ...state,
                       isDeleted: false
                    }

         case CLEAR_ERRORS:
                    return{
                        ...state,
                        error: null
                    }

        default:
          return  state;
    }
}