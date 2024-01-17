import { useForm } from 'react-hook-form';
import axios from 'axios';
import ShowSchools, { getServerSideProps } from './showSchools';
import styles from './AddSchool.module.css';
import React, { useState } from 'react';

const AddSchool = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [schools, setSchools] = useState([]);

  const onSubmit = async (data) => {

    try {
      await axios.post('/api/addSchool', data);
      alert('School added successfully!');
    } catch (error) {
      console.error('Error adding school:', error);
    }
  };

  const fetchSchoolList = async () => {
    try {
      const response = await axios.get('/api/getSchools');
      if(response.data[0].length==0){
        alert("No data found")
      }else{
      setSchools(response.data[0]);}
    } catch (error) {
      console.error('Error fetching schools:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
  

        <div className={styles.formGroup}>
          <label>Name:</label>
          <input {...register('name', { required: 'Name is required' })} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label>Address:</label>
          <input {...register('address', { required: 'Address is required' })} />
          {errors.address && <p>{errors.address.message}</p>}
        </div>

        <div>
          <label>City:</label>
          <input {...register('city', { required: 'City is required' })} />
          {errors.city && <p>{errors.city.message}</p>}
        </div>

        <div>
          <label>State:</label>
          <input {...register('state', { required: 'State is required' })} />
          {errors.state && <p>{errors.state.message}</p>}
        </div>

        <div>
          <label>Contact:</label>
          <input {...register('contact', { required: 'Contact is required' })} />
          {errors.contact && <p>{errors.contact.message}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input {...register('email_id', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
          {errors.email_id && <p>{errors.email_id.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Image:</label>
          <input type="file" {...register('image', { required: 'Image is required' })} />
          {errors.image && <p>{errors.image.message}</p>}
        </div>

        <div className={styles.formGroup}>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </div>
      </form>

      <div>
        <h2>Schools List</h2>
        <button onClick={fetchSchoolList} className={styles.fetchButton}>Fetch Schools</button>
        <ul className={styles.schoolList}>
          {schools.map((school) => (
            <li key={school.id} className={styles.schoolItem}>
              <h3>{school.name}</h3>
              <p>Address: {school.address}</p>
              <p>City: {school.city}</p>
              <p>State: {school.state}</p>
              <p>Contact: {school.contact}</p>
              <p>Email: {school.email_id}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AddSchool;
