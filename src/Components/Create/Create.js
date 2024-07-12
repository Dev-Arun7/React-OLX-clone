import React, { Fragment, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getFirestore, doc, setDoc } from "firebase/firestore";
// import { FirebaseContext, AuthContext } from './../../store/FirebaseContext'
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('')
  const date = new Date().toDateString();
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const storage = getStorage();
  const navigate = useNavigate()
  const firestore = getFirestore(firebase)

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }
    try {
      const storage = getStorage();
      console.log(1, storage)
      const storageRef = ref(storage, `/images/${image.name}`);
      console.log(2, storageRef)
      const snapshot = await uploadBytes(storageRef, image)
      console.log(3, snapshot)
      const imageURL = await getDownloadURL(snapshot.ref);
      const productsCollection = collection(firestore, "products");
      await setDoc(doc(productsCollection), {
        name,  // Here we don't want mention like name: name because both are same
        category,
        price,
        imageURL,
        description,
        createdAt: date.toString(),
        userId: user.uid
      });
      console.log("let going to navigate")
      navigate("/");
    } catch (error) {
      console.error("Error uploading image or saving product:", error);
    }

  }

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="fname"
          name="Name"
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          id="fname"
          name="category"
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input
          className="input"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          id="fname"
          name="Price" />
        <br />
        <br />
        <img alt="Uploaded Preview" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
      </div>
    </Fragment>
  );
};

export default Create;
