import React from 'react'

export default function Carousel(props) {
    console.log(props)

    return (
        <div id={props.id} className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
                {props.images.map((image, index) => (
                    <div key={index} className={"carousel-item " + (index === 0) ? 'active' : ''}>
                        <a className="gallery_img" href={image}>
                            <img className="d-block w-100" src={image} alt={'image ' + index} /> 
                        </a>
                    </div>
                ))}
            </div>
            <ol className="carousel-indicators">
                {props.images.map((image, index) => (
                    <li key={index}
                        className={index === 0 ? 'active' : ''}
                        data-target={'#' + props.id}
                        data-slide-to={index} 
                        style={{backgroundImage: `url(${image})`}}>
                    </li>
                ))}
            </ol>
        </div>
    )

}