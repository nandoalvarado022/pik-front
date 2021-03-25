import React from 'react'
import Gallery from 'react-grid-gallery'
import './multimedia.scss'

export default function(){
    const images = [{
        src: "/images/places/a/a.jpg",
        thumbnail: "/images/places/a/a.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 212,
        caption: "Texto ejemplo"},
        {src: "/images/places/a/2.jpg",
        thumbnail: "/images/places/a/2.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 211,
        caption: "Texto ejemplo"},
        {src: "/images/places/a/3.jpg",
        thumbnail: "/images/places/a/3.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 474,
        caption: "Texto ejemplo"},
        {src: "/images/places/a/4.jpg",
        thumbnail: "/images/places/a/4.jpg",
        thumbnailWidth: 320,
        thumbnailHeight: 211,
        caption: "Texto ejemplo"},
        {src: "/images/places/a/5.jpg",
        thumbnail: "/images/places/a/5.jpg",
        thumbnailWidth: 400,
        thumbnailHeight: 267,
        caption: "Texto ejemplo"},
        {src: "/images/places/a/6.jpg",
        thumbnail: "/images/places/a/6.jpg",
        thumbnailWidth: 400,
        thumbnailHeight: 266,
        caption: "Texto ejemplo"},
        {src: "/images/places/a/7.jpg",
        thumbnail: "/images/places/a/7.jpg",
        thumbnailWidth: 400,
        thumbnailHeight: 264,
        caption: "Texto ejemplo"}
    ]
    return (<div id="view_Multimedia">
        <Gallery margin={1} showImageCount={false} enableImageSelection={false} images={images}/>
    </div>)
}