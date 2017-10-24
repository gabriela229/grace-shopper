import React from 'react';
import { connect } from 'react-redux';

const ProductImageCarousel = ({ images }) => {
    return (
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                <li data-target="#myCarousel" data-slide-to="1"></li>
                <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                {
                    images.map((image, index) => (
                        <div key={index} className={index === 0 ? "item active" : "item"}>
                            <img src={image} style={{ margin: "0 auto" }} />
                        </div>
                    ))
                }
            </div>
            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                <span className="glyphicon glyphicon-chevron-left"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                <span className="glyphicon glyphicon-chevron-right"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export default ProductImageCarousel;