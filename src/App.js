import React , { useState , useEffect} from 'react'
import './index.css'

const url = 'https://api.dotpe.in/api/catalog/store/1/menu?mDomain=fryerstory.in&saletype=delivery&serviceSubtype=delivery';

export const App = () => {
    const [data , setdata] = useState([]);
    const [menuitems , setmenuitems] = useState([]);
    const getdishes = async () =>
    {
      const response = await fetch(url);
      const data = await response.json();
      const menuitems = [data.menuItems];
      
        setdata(data);
        setmenuitems(menuitems);
    }

    useEffect(() => {
      getdishes();
    } , []);

    return(
      <>
          <h2>Recommended items</h2>
          {menuitems.map((object) => {
            console.log(object);
            let req_info = [];
            for(let key in object)
            {
              let subobject = object[key];
              let temp_object = {
                name : subobject.itemName,
                description : subobject.description,
                veg : subobject.isVegetarian,
                image : subobject.image[0]
              }
              req_info.push(temp_object);
            }
            return (
            <div>
                 {req_info.map((object) => {
                   return (
                      <Itembox {...object}/>                  
                   );
                 })}
            </div>
             );
          })}
      </>
    );
  }

const Itembox =(props) =>
{
    const {name ,veg , description , image} = props;
    return(
    <div className='container'>
    <img src = {image} alt =''></img>
    <ul>{veg}</ul>
    <ul className='menu-item-name'>{name}</ul>
    <ul className = 'menu-item-description'>{description}</ul>
    </div>
    );
}

export default App