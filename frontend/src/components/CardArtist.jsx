import { Link } from "react-router-dom"

const CardArtist = (props) => {
    console.log("props.artist en CardArtist: ", props.artist)
    return (
        <article>
            <div className="card border-0" style={{width: "10rem"}}>
                <img src={props.artist.profile_img_url} className="card-img-top rounded-circle" alt={props.artist.name}/>
                    <div className="card-body">
                        <h5 className="card-title text-center">{props.artist.name}</h5>
                        <Link to={`/artists/${props.artist.slug}`}><button className="btn btn-primary">View artist's prints</button></Link>
                    </div>
            </div>
        </article>
    )
}

export default CardArtist
