import { useEffect, useState } from 'react'
import './ProfileNewPost.css'

const ProfileNewPost = () => {
  const [descrInput, setDescrInput] = useState("")
  const [title, setTitle] = useState("")
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const [imgUrl, setImgUrl] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState({})


  const validateForm = () => {
    const newErrors = {}

    if (!title.trim()) {
      newErrors.title = "Title is required"
    }
    if (descrInput.trim().length < 10) {
      newErrors.descr = "Description must be at least 10 characters"
    }
    if (width <= 0) {
      newErrors.width = "Width must be greater than 0"
    }
    if (height <= 0) {
      newErrors.height = "Height must be greater than 0"
    }
    if (!imgUrl.trim()) {
      newErrors.imgUrl = "Image URL is required"
    }
    if (price <= 0) {
      newErrors.price = "Price must be greater than 0"
    }
    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
  }

  return (
    <div>
      <h2 className='newpost-form mb-5'>NEW PRINT</h2>
      <form onSubmit={handleSubmit} >
        <div className={'d-flex flex-column newpost-form gap-2'}>
          <label htmlFor="title">Title</label>
          {errors.title && (
            <small className="text-danger">{errors.title}</small>
          )}
          <input className={`w-50 ${errors.title ? "is-invalid" : ""}`} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="descr">Description</label>
          {errors.descr && (
            <small className="text-danger">{errors.descr}</small>
          )}
          <textarea value={descrInput} name="descr" id="descr" cols="30" rows="10" placeholder='Something funny, something deep, you decide... A good description always makes a difference.' maxLength={1000} className={`w-50 ${errors.descr ? "is-invalid" : ""}`} onChange={(e) => { setDescrInput(e.target.value) }}></textarea>
          <p className='text-secondary-emphasis'>{descrInput.length}/1000</p>
          <div className='d-flex input-dimensions'>
            <label htmlFor="width" className='me-2'>Width</label>
            {errors.width && (
              <small className="text-danger">{errors.width}</small>
            )}
            <input type="number" className={`${errors.width ? "is-invalid" : ""}`} onChange={(e) => setWidth(Number(e.target.value))} />
            <label htmlFor="height" className={`ms-3 me-2`}>Height</label>
            {errors.height && (
              <small className="text-danger">{errors.height}</small>
            )}
            <input type="number" className={`${errors.height ? "is-invalid" : ""}`} onChange={(e) => setHeight(Number(e.target.value))}/>
          </div>
          <p className='text-secondary-emphasis'>* in centimeters</p>
          <label htmlFor="imgUrl">Image URL</label>
          {errors.imgUrl && (
            <small className="text-danger">{errors.imgUrl}</small>
          )}
          <input type="text" name="" className={`w-50 ${errors.imgUrl ? "is-invalid" : ""}`} id="" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          <div className='d-flex '>
            <label htmlFor="price" className='me-2'>Price $</label>
            {errors.price && (
              <small className="text-danger">{errors.price}</small>
            )}
            <input type="number" className={`${errors.price ? "is-invalid" : ""}`} onChange={(e) => setPrice(Number(e.target.value))}/>
          </div>
          <div className='d-flex justify-content-end mt-3 w-50'>
            <button type='submit' className='btn btn-primary w-25'>Post!</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfileNewPost
