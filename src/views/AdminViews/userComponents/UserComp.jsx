import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import User from './User'
import './userComponent.css'
import {getAllUsers, getUserById, cleanState}from '../../../redux/actions'

const UserComp = () => {
  const dispatch = useDispatch()
  const {id}= useParams()
  const users = useSelector((state)=> state.Users)
  const singleUser = useSelector((state)=> state.UserById)
  const [single, setSingle]= useState(false)

  useEffect(()=>{
    if(id){
      setSingle(true)
      dispatch(getUserById(id))
    }else{
      setSingle(false)
    dispatch(getAllUsers())
    }
    return ()=>{
      dispatch(cleanState())}
  },[id])

  return (
    <>
    {!id ?
     <div className='container-fluid'>
     <div className='row'> 
       {/* <div className='contain-user'> */}
        {users?.map((user)=>
        <div key={user.id} className="col-12 col-md-6 col-lg-3 my-2 me-2 mb-2">
        <User user={user} isSingleUser={single} />
        </div>
        )}
      </div>
      </div>
      
    :
    <>
    <div className="imageBack">
      <div className="coverBack">
        <div className="container-md modal-content colorBack formProductContainer rounded-4 shadow ">
          <User  key={singleUser.id} user={singleUser} isSingleUser={single}/>
        </div>
      </div>
      </div></>
      }
    </>
  )
}

export default UserComp
