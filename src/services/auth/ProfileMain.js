import { useEffect, useState } from 'react';

import { auth, db } from '/src/services/api/firebase.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const ProfileMain = () => {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("User is not logged in");
      }
    }
  };

  // Function for updating user data
  useEffect(() => {
    fetchUserData();
  }, []);

  // Function for updating profile data
  const updateProfileData = async (updatedData) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        await updateDoc(docRef, updatedData);
        console.log("Profile data successfully updated!");
        await fetchUserData();
      }
    } catch (error) {
      console.error("Error saving profile data:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return {userDetails, updateProfileData, handleLogout};
}