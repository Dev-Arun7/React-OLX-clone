import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";


function View() {
  const [userDetails, setUserDetails] = useState(null)
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userId } = postDetails
        const firestore = getFirestore(firebase)
        const userCollection = collection(firestore, "users");
        const q = query(userCollection, where("id", "==", userId))
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs[0].data();
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    }
    fetchData()
  }, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageURL}
          alt=""
        />
      </div>a
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{postDetails?.price} </p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdAt}</span>
        </div>

        {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
