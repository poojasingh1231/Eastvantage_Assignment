import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
} from "react-icons/fa";

interface Name {
  first: string;
  last: string;
}

interface Location {
  city: string;
  country: string;
}

interface User {
  name: Name;
  email: string;
  picture: {
    large: string;
  };
  dob: { date: string; age: number };
  location: Location;
}

const UserDisplay: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("https://randomuser.me/api");
      const userData = response.data.results[0] as User;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchData();
    }
  }, []);

  const handleRefresh = async () => {
    const response = await axios.get("https://randomuser.me/api");
    const data = response.data.results[0] as User;
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <div className="user-display">
      {user ? (
        <div className="user-box">
          <div className="user-data">
            <img src={user.picture.large} alt="profile" />
            <p>
              <FaUser className="icon" />{" "}
              {`${user.name.first} ${user.name.last}`}
            </p>
            <p>
              <FaEnvelope className="icon" /> {user.email}
            </p>
            <p>
              <FaBirthdayCake className="icon" />{" "}
              {`Age: ${user.dob.age} | DOB: ${new Date(
                user.dob.date
              ).toLocaleDateString()}`}
            </p>
            <p>
              <FaMapMarkerAlt className="icon" />{" "}
              {`${user.location.city}, ${user.location.country}`}
            </p>
          </div>
          <button className="refresh-button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
};

export default UserDisplay;
