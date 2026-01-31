import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';

const ProfileSettings = () => {
  const { token, user, updateUser } = useContext(UserContext)

  const [profileImg, setProfileImg] = useState("");
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [isArtist, setIsArtist] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSaveImage = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile_img_url: profileImg,
        }),
      });

      updateUser({
        ...user,
        profile_img_url: profileImg,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveUsername = async (e) => {
    e.preventDefault();

    if (!username.trim()) return;

    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) throw new Error("Failed to update username");

      const updatedUser = await response.json();

      updateUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveName = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: name }),
      });

      if (!response.ok) throw new Error("Failed to update name");

      const updatedUser = await response.json();

      updateUser(updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBecomeArtist = () => {

  }


  useEffect(() => {
    if (user?.profile_img_url) {
      setProfileImg(user.profile_img_url);
    }
    if (user?.username) {
      setUsername(user.username);
    }
    if (user?.name) {
      setName(user.name);
    }
    if (user?.is_artist) {
      setIsArtist(user.is_artist);
    }
  }, [user]);


  return (
    <div>
      <h1>SETTINGS</h1>
      <form onSubmit={handleSaveImage}>
        <label>Profile image URL</label>
        <input
          type="text"
          value={profileImg}
          onChange={(e) => setProfileImg(e.target.value)}
        />
        <button type="submit">Update image</button>
      </form>

      <form onSubmit={handleSaveUsername}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" disabled={!username.trim()}>
          Update username
        </button>
      </form>

      <form onSubmit={handleSaveName}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" disabled={!name.trim()}>
          Update Name
        </button>
      </form>


            {!isArtist && (
        <button
          className="btn btn-outline-primary"
          onClick={handleBecomeArtist}
        >
          Become an artist
        </button>
      )}

    </div >
  )
}

export default ProfileSettings
