import React, {Fragment, useEffect} from 'react';
import { Link} from 'react-router-dom';
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {useDispatch, useSelector} from 'react-redux';
import {allUsers, deleteUser, clearErrors} from '../../actions/userActions'
import Sidebar from './Sidebar'
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { DELETE_USER_RESET } from '../../constants/userConstant';


const UsersList = ({history}) => {   
    
        const alert = useAlert()
        const dispatch = useDispatch()
        
        
        const { loading, error, users} = useSelector(state => state.allUsers);
     const {isDeleted} = useSelector(state => state.user)
    

        
        useEffect(() => {
        
            dispatch(allUsers())
        
         if (error) { 
              alert.error(error)
              dispatch(clearErrors())
            }  
    
              if(isDeleted) {
                alert.success('User deleted')  
                history.push('/admin/users') 
                dispatch({type: DELETE_USER_RESET})
              }
        }, [dispatch, alert, isDeleted, history, error])
        
        
         const setUsers = () => {
             const data = {
                 columns: [
                     {
                         label: 'User ID',
                         field: 'id',
                         sort: 'asc'
                     },
        
                     {
                        label: 'Name',
                        field: 'name',
                        sort: 'asc'
                    },
    
                    {
                        label: 'Email',
                        field: 'email',
                        sort: 'asc'
                    },
    
                    {
                        label: 'Role',
                        field: 'role',
                        sort: 'asc'
                    },
    
                    {
                        label: 'Actions',
                        field: 'actions',
                      
                    },
        
                 ],
    
                 rows: []
             }
             users?.forEach(user => {
                 data.rows.push({
                     id: user._id,
                     name:user.name,
                     email: user.email,
                     role: user.role,
                     
                  actions: <Fragment>    
                  <Link  to={`/admin/user/${user._id}`} className="btn btn-primary  px-2 py-1" >
                             <i className='fa fa-pencil ' ></i>
                           </Link>
                           <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => dispatch(deleteUser(user._id))}>
                           <i className='fa fa-trash ' ></i> 
                           </button>
                           </Fragment> 
        
                 })
             })
        
             return data;
         
             
         }
       
    return (
        <Fragment>
        <MetaData title="All Users " />
          <div  className="row">
           <div className="col-12 col-md-2" >
            <Sidebar />
           </div>
           <div className="col-12 col-md-10" >
               <Fragment  >
                <h1 className='my-5' >All Users</h1>
              
                {loading ? <Loader /> : (
                   < MDBDataTable
                    data={setUsers()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />

                )}
        

               </Fragment>
           </div>
          </div>
        </Fragment>
    )
}

export default UsersList