import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const SingleUser = ({ user, index, refetch }) => {
    const  {email, role} = user

    const makeAdmin =  () =>
        fetch(`https://cryptic-springs-54649.herokuapp.com/allusers/admin/${email}`,{
            method: 'PUT',
            headers:{
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)        
                refetch();
                toast('Become Admin Successfully')       
        
        })
    
    
    return (
       
            <tr>
                <th>{index + 1}</th>
                <td>{email}</td>
                <td>{ role !== 'admin' && <button onClick={makeAdmin} className='btn btn-xs'>Make Admin</button>}</td>
                
               
            </tr>
       
    );
};

export default SingleUser;