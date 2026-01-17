import { useContext, useEffect, useState } from 'react'
import { getFeatured } from "../utils/featured"
import { PrintContext } from '../context/PrintContext'
import CardPrint from './CardPrint'

const FeaturedPrints = () => {
    const { prints } = useContext(PrintContext)
    const [featPrints, setFeatPrints] = useState([]);

    useEffect(() => {
        setFeatPrints(getFeatured(prints));
        console.log(prints)
    }, [prints]);


    return (
        <section className='container-fluid'>
            <h2>Featured prints</h2>
            {featPrints.map(print => (
                <CardPrint key={print.id} print={print} />
            ))}




        </section>
    )
}

export default FeaturedPrints
