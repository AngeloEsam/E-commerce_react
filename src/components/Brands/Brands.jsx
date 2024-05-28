import axios from 'axios'
import React from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query'

function Brands() {
  async function getBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)   
  }

  const { data, isLoading, isFetching ,refetch} = useQuery('brands', getBrands,{cacheTime:3000,enabled:false});
  console.log(data?.data.data)
  if (isLoading) {
    return <div className="d-flex align-items-center justify-content-center vh-100">
    <BallTriangle
    height={100}
    width={100}
    radius={5}
    color="#4fa94d"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />
  </div>;
  }


  return (
    <div className='row'>
      <button className='btn bg-main text-light' onClick={()=>refetch()}>Refetch Data</button>
      {data?.data.data.map((brand) => (
        <div className="col-md-3" key={brand._id}>
          <img src={brand.image} className='w-100' alt={brand.name} />
          <p>{brand.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Brands;
