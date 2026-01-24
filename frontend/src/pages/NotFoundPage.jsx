import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className='d-flex justify-content-center flex-column'>
      <div className='m-5 p-5'>
      <h1>404 Not found!</h1>
      <h2>Somehow you ended up here. Let's take you somewhere safe</h2>
      <Link to={"/"}><button className='btn btn-primary'>Go to Home</button></Link>
      </div>
    </div>
  )
}

export default NotFoundPage
