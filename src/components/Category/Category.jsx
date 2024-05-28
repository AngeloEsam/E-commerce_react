import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
function Category() {
  const [categoryList, setCategories] = useState([]);
 async function getCategories(){
    const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    // console.log(data.data)
    setCategories(data.data)
  }
  useEffect(()=>{
    getCategories()
  },[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };
  return (
    <div>
      <Slider {...settings}>
        {categoryList.map((category)=>{
          return <div key={category._id}>
          <img src={category.image} alt={category.name} className='w-100' height={300}/>
          <p>{category.name}</p>
          </div>
        })}
      </Slider>
    </div>
  )
}

export default Category
