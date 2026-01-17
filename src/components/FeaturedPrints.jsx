import { useContext, useEffect, useState } from 'react'
import { getFeatured } from "../utils/featured"
import { PrintContext } from '../context/PrintContext'
import CardPrint from './CardPrint'
import { UserContext } from '../context/UserContext'

const FeaturedPrints = () => {
    const { prints } = useContext(PrintContext)
    const { users } = useContext(UserContext)
    const [featPrints, setFeatPrints] = useState([]);
    const [printsWithArtist, setPrintsWithArtist] = useState([])




    useEffect(() => {
        if (!prints.length || !users.length) return;

        const featured = getFeatured(prints);

        setPrintsWithArtist(
            featured.map(print => {
                const foundUser = users.find(u => String(u.id) === String(print.userId));
                console.log(`Print ${print.id} - userId: ${print.userId} - Found user:`, foundUser);
                return {
                    ...print,
                    user: foundUser
                }
            })
        );
    }, [prints, users]);




    return (
        <div>
            <br />
            <h2 className='text-center'>Featured Prints</h2>
            <section className='container-fluid d-flex justify-content-center gap-3'>
                {printsWithArtist.map(print => (
                    <CardPrint key={print.id} print={print} user={print.user} />
                ))}




            </section>
        </div>
    )
}

export default FeaturedPrints
