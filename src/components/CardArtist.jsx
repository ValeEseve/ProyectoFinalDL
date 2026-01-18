const CardArtist = (props) => {
    console.log("props: ", props)
    return (
        <article>
            <div className="card" style={{width: "10rem"}}>
                <img src={props.artist.img} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title text-center">{props.artist.name}</h5>
                        <a href="#" className="btn btn-primary">View artist's prints</a>
                    </div>
            </div>
        </article>
    )
}

export default CardArtist
