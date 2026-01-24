import { useContext, useEffect, useState } from 'react'
import { PrintContext } from '../context/PrintContext'
import { UserContext } from '../context/UserContext'
import CardPrint from '../components/CardPrint'

const PrintsPage = () => {
  const { prints } = useContext(PrintContext)
  const { users } = useContext(UserContext)
  const [printsWithArtist, setPrintsWithArtist] = useState([])

  useEffect(() => {
    if (!prints.length || !users.length) return;
    setPrintsWithArtist(
      prints.map(print => {
        const foundUser = users.find(u => String(u.id) === String(print.userId));
        return {
          ...print,
          user: foundUser
        }
      })
    );
  }, [prints, users]);
  return (
    <main>
      <section className='d-flex justify-content-center flex-wrap gap-5'>
        {printsWithArtist.map((print) => (
          <CardPrint key={print.id} print={print} user={print.user} />
        ))}
      </section>
    </main>
  )
}

export default PrintsPage
