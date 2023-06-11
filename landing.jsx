import React, { useState, useEffect } from 'react';
import './landing.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const LandingPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState({
    restaurantid: '',
    restaurantname: '',
    outlets: '',
    location: '',
    offers: '',
    orderproviders: '',
    rating: '',
    contactno: '',
    timing: '',
    hallbookings: '',
    vegOrNonveg: '',
    AcORNonAc: ''
  });
  const [showInputs, setShowInputs] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:8080/getval');
      setRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRestaurant((prevRestaurant) => ({
      ...prevRestaurant,
      [name]: value
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/post', restaurant);
      setRestaurants((prevRestaurants) => [...prevRestaurants, response.data]);
      setRestaurant({
        restaurantid: '',
        restaurantname: '',
        outlets: '',
        location: '',
        offers: '',
        orderproviders: '',
        rating: '',
        contactno: '',
        timing: '',
        hallbookings: '',
        vegOrNonveg: ''
        
      });
      setShowInputs(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (index) => {
    const updatedRestaurant = restaurants[index];
    try {
      await axios.put(`/api/updateRestaurant/${updatedRestaurant.restaurantid}`, updatedRestaurant);
      fetchRestaurants();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    const restaurantToDelete = restaurants[index];
    try {
      await axios.delete(`/api/deleteRestaurant/${restaurantToDelete.restaurantid}`);
      fetchRestaurants();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="contain">
      <h2>Restaurant Database</h2>

      {!showInputs && (
        <button type="button" onClick={() => setShowInputs(true)}>
          Add Restaurant
        </button>
      )}
      {showInputs && (
        <form onSubmit={handleAdd}>
          <div style={{marginLeft:-400}}><div style={{marginLeft:-30}}><label style={{fontWeight:'bold'}}>Restaurant ID:</label>
          <input type="text" name="restaurantid" value={restaurant.restaurantid} onChange={handleChange} /></div>
          <br/>
          <div style={{marginLeft:-50}}><label style={{fontWeight:'bold'}}>Restaurant Name:</label>
          <input type="text" name="restaurantname" value={restaurant.restaurantname} onChange={handleChange} /></div>
          <br/>
          <div style={{marginLeft:13}}>

          <label style={{fontWeight:'bold'}}>Outlets:</label>
          <input type="text" name="outlets" value={restaurant.outlets} onChange={handleChange} />
          </ div>
          <br/>
          <div style={{marginLeft:3}}> 

          <label style={{fontWeight:'bold'}}>Location:</label>
          <input type="text" name="location" value={restaurant.location} onChange={handleChange} />
          </div>
          <br/>
          <div style={{marginLeft:20}}>
          <label style={{fontWeight:'bold'}}>Offers:</label>
          <input type="text" name="offers" value={restaurant.offers} onChange={handleChange} />
          </div>
</div>
          <div style={{marginLeft:400,marginTop:-170}}><div style={{}}><label style={{fontWeight:'bold'}}>Order Providers:</label>
          <input type="text" name="orderproviders" value={restaurant.orderproviders} onChange={handleChange} /></div>
          <br/>
          <div style={{marginLeft:57}}>
          <label style={{fontWeight:'bold'}}>Rating:</label>
          <input type="text" name="rating" value={restaurant.rating} onChange={handleChange} /></div>
          <br/>          <div style={{marginLeft:-5}}>

          <label style={{fontWeight:'bold'}}>Contact Number:</label>
          <input type="text" name="contactno" value={restaurant.contactno} onChange={handleChange} /></div>
          <br/>
          <div style={{marginLeft:53}}>
          <label style={{fontWeight:'bold'}}>Timing:</label>
          <input type="text" name="timing" value={restaurant.timing} onChange={handleChange} /></div>
          <br/>
          <div style={{marginLeft:10}}>
          <label style={{fontWeight:'bold'}}>Hall Bookings:</label>
          <input type="text" name="hallbookings" value={restaurant.hallbookings} onChange={handleChange} /></div>
          <br/>          <div style={{marginLeft:-3}}>

          <label style={{fontWeight:'bold'}}>Veg or Non-Veg:</label>
          <input type="text" name="vegOrNonveg" value={restaurant.vegOrNonveg} onChange={handleChange} /></div>
</div>
          {/* <label>AC or Non-AC:</label>
          <input type="text" name="AcORNonAc" value={restaurant.AcORNonAc} onChange={handleChange} /> */}

          <button type="submit">Add</button>
        </form>
      )}
      <table>
        <thead>
          <tr>
            <th>Restaurant ID</th>
            <th>Restaurant Name</th>
            <th>Outlets</th>
            <th>Location</th>
            <th>Offers</th>
            <th>Order Providers</th>
            <th>Rating</th>
            <th>Contact Number</th>
            <th>Timing</th>
            <th>Hall Bookings</th>
            <th>Veg or Non-Veg</th>
            {/* <th>AC or Non-AC</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, index) => (
            <tr key={index}>
              <td>{restaurant.restaurantid}</td>
              <td>{restaurant.restaurantname}</td>
              <td>{restaurant.outlets}</td>
              <td>{restaurant.location}</td>
              <td>{restaurant.offers}</td>
              <td>{restaurant.orderproviders}</td>
              <td>{restaurant.rating}</td>
              <td>{restaurant.contactno}</td>
              <td>{restaurant.timing}</td>
              <td>{restaurant.hallbookings}</td>
              <td>{restaurant.vegOrNonveg}</td>
              {/* <td>{restaurant.AcORNonAc}</td> */}
              <td>
                <button type="button" className="edit-button" onClick={() => handleEdit(index)}>
                 <Link to='/up'> Edit</Link>
                </button>
                <button type="button" className="delete-button" onClick={() => handleDelete(index)}>
                <Link to='/del'> Delete</Link>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant='contained'><Link to='/'>Back</Link></Button>
    </div>
  );
};

export default LandingPage;