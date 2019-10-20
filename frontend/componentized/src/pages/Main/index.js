import React, { useState, useEffect } from 'react'
import SingleProductsCatagory from '../../components/SingleProductsCatagory'
import api from '../../api'

import './styles.css'

export default function Main() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {

    const { data } = await api.get('/categories')
    setCategories(data)

  }

  return (
    <div className="products-catagories-area clearfix">
      <div className="amado-pro-catagory clearfix">

        {categories.map(category => (
          <SingleProductsCatagory key={category.id} catagory={category} />
        ))}

      </div>
    </div>
  )
}