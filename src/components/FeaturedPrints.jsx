import { useContext } from 'react'
import { PrintContext } from '../context/PrintContext'

const FeaturedPrints = () => {
    const {prints} = useContext(PrintContext)

    
  return (
    <section>
      Featured prints
      <div className='container-fluid'>
        <article>

        </article>
      </div>
    </section>
  )
}

export default FeaturedPrints
