import { Link } from "react-router-dom";


export default function Card ({ id, name, price, score, image}) {

    return (
        <Link to={`/product/${id}`}>
            <div>
                <img src={image}/>
                <h3>{name}</h3>
                <span>$ {price}</span>
                <span>{score}</span>
            </div>
        </Link>
    )
}   