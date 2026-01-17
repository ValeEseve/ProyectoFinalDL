import { useContext, useEffect, useState } from 'react'
import { getFeatured } from "../utils/featured"
import { PrintContext } from '../context/PrintContext'
import CardPrint from './CardPrint'

const FeaturedPrints = () => {
    const { prints } = useContext(PrintContext)
    const [featPrints, setFeatPrints] = useState([]);

    useEffect(() => {
        setFeatPrints(getFeatured(prints));
        console.log("Prints en featured"+featPrints)
    }, [prints]);


    return (
        <div>
            <br />
            <h2 className='text-center'>Featured Prints</h2>
        <section className='container-fluid d-flex justify-content-center gap-3'>
            {featPrints.map(print => (
                <CardPrint key={print.id} print={print} />
            ))}




        </section>
        </div>
    )
}

export default FeaturedPrints
