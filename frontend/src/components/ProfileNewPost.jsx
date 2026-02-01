import { useContext, useState } from 'react'
import './ProfileNewPost.css'
import { PrintContext } from '../context/PrintContext'

const ProfileNewPost = () => {
  const { addPrint } = useContext(PrintContext)
  const [descr, setDescr] = useState("")
  const [title, setTitle] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [price, setPrice] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!title.trim()) {
      newErrors.title = "Title is required"
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!descr.trim()) {
      newErrors.descr = "Description is required"
    } else if (descr.trim().length < 10) {
      newErrors.descr = "Description must be at least 10 characters"
    }

    if (!width || Number(width) <= 0) {
      newErrors.width = "Width must be greater than 0"
    }

    if (!height || Number(height) <= 0) {
      newErrors.height = "Height must be greater than 0"
    }

    if (!imgUrl.trim()) {
      newErrors.imgUrl = "Image URL is required"
    } else if (!imgUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
      newErrors.imgUrl = "Please enter a valid image URL"
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = "Price must be greater than 0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setShowSuccess(false)

    try {
      await addPrint(title, descr, Number(width), Number(height), imgUrl, Number(price))
      
      // Mostrar mensaje de éxito
      setShowSuccess(true)
      
      // Limpiar el formulario
      setTitle("")
      setDescr("")
      setWidth("")
      setHeight("")
      setImgUrl("")
      setPrice("")
      setErrors({})

      // Ocultar mensaje después de 5 segundos
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)

    } catch (error) {
      console.error("Error creating print:", error)
      setErrors({ submit: "Failed to create print. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDismissSuccess = () => {
    setShowSuccess(false)
  }

  return (
    <div className="new-post-container">
      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          <strong>Success!</strong> Your print has been posted successfully!
          <button 
            type="button" 
            className="btn-close" 
            onClick={handleDismissSuccess}
            aria-label="Close"
          ></button>
        </div>
      )}

      {errors.submit && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {errors.submit}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setErrors({ ...errors, submit: null })}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h2 className="mb-0">
            <i className="bi bi-image me-2"></i>
            Create New Print
          </h2>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label fw-semibold">
                Title <span className="text-danger">*</span>
              </label>
              <input 
                type="text" 
                id="title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a captivating title"
                maxLength={100}
              />
              {errors.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
              <small className="text-muted">{title.length}/100</small>
            </div>

            <div className="mb-4">
              <label htmlFor="descr" className="form-label fw-semibold">
                Description <span className="text-danger">*</span>
              </label>
              <textarea 
                id="descr" 
                className={`form-control ${errors.descr ? "is-invalid" : ""}`}
                rows="6"
                value={descr}
                onChange={(e) => setDescr(e.target.value)}
                placeholder="Something funny, something deep, you decide... A good description always makes a difference."
                maxLength={1500}
              ></textarea>
              {errors.descr && (
                <div className="invalid-feedback">{errors.descr}</div>
              )}
              <small className="text-muted">{descr.length}/1500 characters</small>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Dimensions (cm) <span className="text-danger">*</span>
              </label>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-arrows-expand"></i> Width
                    </span>
                    <input 
                      type="number" 
                      className={`form-control ${errors.width ? "is-invalid" : ""}`}
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="0"
                      min="1"
                      step="0.1"
                    />
                    <span className="input-group-text">cm</span>
                    {errors.width && (
                      <div className="invalid-feedback">{errors.width}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-arrows-expand"></i> Height
                    </span>
                    <input 
                      type="number" 
                      className={`form-control ${errors.height ? "is-invalid" : ""}`}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="0"
                      min="1"
                      step="0.1"
                    />
                    <span className="input-group-text">cm</span>
                    {errors.height && (
                      <div className="invalid-feedback">{errors.height}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="imgUrl" className="form-label fw-semibold">
                Image URL <span className="text-danger">*</span>
              </label>
              <input 
                type="url" 
                id="imgUrl"
                className={`form-control ${errors.imgUrl ? "is-invalid" : ""}`}
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {errors.imgUrl && (
                <div className="invalid-feedback">{errors.imgUrl}</div>
              )}
              <small className="text-muted">
                Supported formats: JPG, JPEG, PNG, WEBP, GIF
              </small>
              
              {imgUrl && !errors.imgUrl && (
                <div className="mt-3">
                  <p className="text-muted small mb-2">Preview:</p>
                  <img 
                    src={imgUrl} 
                    alt="Preview" 
                    className="img-thumbnail"
                    style={{ maxWidth: '300px', maxHeight: '300px' }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      setErrors({ ...errors, imgUrl: "Failed to load image" })
                    }}
                    onLoad={(e) => {
                      e.target.style.display = 'block'
                      const newErrors = { ...errors }
                      delete newErrors.imgUrl
                      setErrors(newErrors)
                    }}
                  />
                </div>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="form-label fw-semibold">
                Price <span className="text-danger">*</span>
              </label>
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  id="price"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  min="0.01"
                  step="0.01"
                />
                <span className="input-group-text">USD</span>
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => {
                  setTitle("")
                  setDescr("")
                  setWidth("")
                  setHeight("")
                  setImgUrl("")
                  setPrice("")
                  setErrors({})
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Clear
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Posting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Post Print
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileNewPost