import './CardPrint.css'

const CardPrint = (props) => {
    return (
        <article>
            <div className="card" style={{width: "18rem"}}>
                <img src={props.print.img} className="card-img-top p-2 card-img-fixed" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{props.print.name}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </article>
    )
}

export default CardPrint
