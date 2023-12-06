import React from 'react'
import Myh1 from '../../components/Myh1'

function UserHome() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full flex-col max-w-[400px] items-center space-y-3">
       <Myh1 title='Welcome to EventSphere'/>
    </div>
    </div>    
  )
}

export default UserHome