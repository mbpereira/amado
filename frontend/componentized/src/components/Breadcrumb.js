import React from 'react'

export default function Breadcrumb() {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb mt-50">
                <li class="breadcrumb-item"><a href="#">Home</a></li>
                <li class="breadcrumb-item"><a href="#">Furniture</a></li>
                <li class="breadcrumb-item"><a href="#">Chairs</a></li>
                <li class="breadcrumb-item active" aria-current="page">white modern chair</li>
            </ol>
        </nav>
    )
}