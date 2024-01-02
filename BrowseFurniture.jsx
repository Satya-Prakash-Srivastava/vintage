import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UpdateFurniture from './UpdateFurniture';

const BrowseFurniture = () => {
      const [furnitureList, setfurnitureList] = useState([]);
    const fetchfurnitureData = async () => {
        const res = await fetch('http://localhost:5000/furniture/getall');
        console.log(res.status);
        const data = await res.json();
        console.log(data);
        setfurnitureList(data);
    };
    useEffect(() => {
        fetchfurnitureData();
    }, []);

    const displayFurniture = () => {
      return furnitureList.map(furniture => (
        <div className='col-md-3 mb-4'>
          <div className="card">
          <img src={"http://localhost:5000/"+ furniture.image } alt="" />
          <img src={"https://www.shutterstock.com/image-photo/modern-sofa-260nw-426909265.jpg"} alt="" />
          <img src={"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTBNLZXkZlomHw-JNVl8ks-jIRTgUHdXuufV_YZa7xiI5z-_xKYVkpla28N0aj514VdzWRH6DOXOgrRnpZjHJLOoaKQLy58YYcxyElOUaPL_tFYkbsbu08lwg"+ furniture.image } alt="" />
            <div className="card-body">
              <h4>{furniture.title}</h4>
              <Link to={"/details/"+furniture._id} className='btn btn-primary mt-3'>View Details</Link>
            
            </div>
          </div>
        </div>
        
      ))
    }

  return (
    <div>
      <header></header>
      <div className='container'>
        <div className="row">
          {displayFurniture()}
        </div>
      </div>
    </div>
  )
}

export default BrowseFurniture