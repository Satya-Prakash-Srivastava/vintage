import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const FurnitureDetails = () => {

  const { id } = useParams();

  const [furnitureData, setFurnitureData] = useState(null);

  const fetchFurniture = async () => {
    const res = await fetch('http://localhost:5000/furniture/getbyid/' + id);
    console.log(res.status);
    const data = await res.json();
    setFurnitureData(data);
    console.log(data);
  }

  useEffect(() => {
    fetchFurniture();
  }, []);

  const displayDetails = () => {
    if (furnitureData !== null) {
      return <div className="card">
        <div className="card-body">
          <img width="200px" height="200px" src={"http://localhost:5000/" + furnitureData.image} alt="" />
          
          <h4>Rs.750{furnitureData.price}</h4>
          <hr />
          <h3>Furniture details</h3>
          <h5>Type : {furnitureData.type}</h5>
          <h5>Title : {furnitureData.title}</h5>
          
        </div>
      </div>
    }
  }

  return (
    <div>
      {displayDetails()}

    </div>


  )
}

export default FurnitureDetails