import React, { useState } from 'react'

export default function Carousel(props) {

    const [active, setActive] = useState(0)

    function handleActive(e) {

        const active = e.target.getAttribute('data-slide-to')
        setActive(Number(active))
        
    }

    return (
        <div id={props.id} className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {props.images.map((image, index) => (
                    <div key={index} className={`carousel-item ${index === active ? 'active' : ''}`}>
                        <a className="gallery_img" href={image}>
                            <img className="d-block w-100" src={image} alt={'image ' + index} /> 
                        </a>
                    </div>
                ))}
            </div>
            <ol className="carousel-indicators">
                {props.images.map((image, index) => (
                    <li key={index}
                        className={`${index === active ? 'active' : ''}`}
                        // data-target={'#' + props.id}
                        data-slide-to={index} 
                        style={{backgroundImage: `url(${image})`}}
                        onClick={handleActive}
                        >
                    </li>
                ))}
            </ol>
        </div>
    )

}