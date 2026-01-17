import './CardPrint.css'

const CardPrint = ({print, user}) => {
    console.log("User =>" + user)
    return (
        <article>
            <div className="card" style={{width: "18rem"}}>
                <img src={print.img} className="card-img-top p-2 card-img-fixed" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{print.name}</h5>
                        <h6>Art by {user?.name}</h6>
                        <a href="#" className="btn btn-primary"><i class="fa-solid fa-cart-arrow-down"></i></a>
                    </div>
            </div>
        </article>
    )
}

export default CardPrint
