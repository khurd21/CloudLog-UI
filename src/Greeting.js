import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

import { useState, useEffect } from "react";

import "./Greeting.css";

const Greeting = () => {
    const { user } = useContext(AuthContext);
    const [profilePicture, setProfilePicture] = useState(null);
    const [hasFetchedProfilePicture, setHasFetchedProfilePicture] = useState(false);

    useEffect(() => {
        if (user?.pictureLink && !hasFetchedProfilePicture) {
            setHasFetchedProfilePicture(true);
            const cachedPicture = localStorage.getItem(`profilePicture-${user.pictureLink}`);
            if (cachedPicture) {
                setProfilePicture(cachedPicture);
                return;
            }

            fetch(user.pictureLink)
                .then((response) => {
                    if (response.ok) {
                        return response.blob();
                    }
                    throw new Error('Failed to fetch profile picture: ', user.pictureLink);
                })
                .then((blob) => {
                    const image = URL.createObjectURL(blob);
                    setProfilePicture(image);
                    localStorage.setItem(`profilePicture-${user.pictureLink}`, image);
                })
                .catch((error) => {
                    console.error('Error fetching profile picture:', error);
                });
        }
    }, [user, hasFetchedProfilePicture]);

    return (
        <div className="card">
            <img
                src={profilePicture}
                alt="Profile"
                style={{ width: '75px', height: '75px', borderRadius: '50%' }}
            />
            <p>Hello, <i>{user.firstName} {user.lastName}</i>.</p>
        </div>
    );
}

export default Greeting;