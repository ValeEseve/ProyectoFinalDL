import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext';
import './ProfileSettings.css';

const ProfileSettings = () => {
  const { token, user, updateUser } = useContext(UserContext)
  const [profileImg, setProfileImg] = useState("");
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")

  const [isUpdating, setIsUpdating] = useState({
    image: false,
    username: false,
    name: false,
    artist: false
  });

  const [successMessages, setSuccessMessages] = useState({});
  const [errors, setErrors] = useState({});

  const apiUrl = import.meta.env.VITE_API_URL;

  const showSuccess = (field, message) => {
    setSuccessMessages(prev => ({ ...prev, [field]: message }));
    setTimeout(() => {
      setSuccessMessages(prev => {
        const newMessages = { ...prev };
        delete newMessages[field];
        return newMessages;
      });
    }, 3000);
  };

  const showError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
    setTimeout(() => {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }, 3000);
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();

    if (!profileImg.trim()) {
      showError('image', 'Image URL cannot be empty');
      return;
    }

    setIsUpdating(prev => ({ ...prev, image: true }));

    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile_img_url: profileImg,
        }),
      });

      if (!response.ok) throw new Error("Failed to update image");

      const updatedUser = await response.json();
      updateUser(updatedUser);
      showSuccess('image', 'Profile image updated successfully!');
    } catch (error) {
      console.error(error);
      showError('image', 'Failed to update profile image');
    } finally {
      setIsUpdating(prev => ({ ...prev, image: false }));
    }
  };

  const handleSaveUsername = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      showError('username', 'Username cannot be empty');
      return;
    }

    if (username.trim().length < 3) {
      showError('username', 'Username must be at least 3 characters');
      return;
    }

    setIsUpdating(prev => ({ ...prev, username: true }));

    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update username");
      }

      const updatedUser = await response.json();
      updateUser(updatedUser);
      showSuccess('username', 'Username updated successfully!');
    } catch (error) {
      console.error(error);
      showError('username', error.message || 'Failed to update username');
    } finally {
      setIsUpdating(prev => ({ ...prev, username: false }));
    }
  };

  const handleSaveName = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      showError('name', 'Name cannot be empty');
      return;
    }

    setIsUpdating(prev => ({ ...prev, name: true }));

    try {
      const response = await fetch(`${apiUrl}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) throw new Error("Failed to update name");

      const updatedUser = await response.json();
      updateUser(updatedUser);
      showSuccess('name', 'Name updated successfully!');
    } catch (error) {
      console.error(error);
      showError('name', 'Failed to update name');
    } finally {
      setIsUpdating(prev => ({ ...prev, name: false }));
    }
  };

  const handleBecomeArtist = async () => {
    if (user?.is_artist) return;

    setIsUpdating(prev => ({ ...prev, artist: true }));

    try {
      const response = await fetch(`${apiUrl}/artists`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create artist profile");
      }

      const data = await response.json();
      updateUser({ ...user, is_artist: true });
      showSuccess('artist', '🎨 Congratulations! You are now an artist!');
    } catch (error) {
      console.error(error);
      showError('artist', 'Failed to create artist profile');
    } finally {
      setIsUpdating(prev => ({ ...prev, artist: false }));
    }
  };

  const handleSaveBio = async (e) => {
  e.preventDefault();
  
  if (!bio.trim()) {
    showError('bio', 'Bio cannot be empty');
    return;
  }

  if (bio.trim().length < 10) {
    showError('bio', 'Bio must be at least 10 characters');
    return;
  }

  setIsUpdating(prev => ({ ...prev, bio: true }));

  try {
    const response = await fetch(`${apiUrl}/artists/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update bio");
    }

    const updatedArtist = await response.json();
    
    updateUser({ ...user, bio: updatedArtist.bio });
    showSuccess('bio', 'Artist bio updated successfully!');
  } catch (error) {
    console.error(error);
    showError('bio', error.message || 'Failed to update artist bio');
  } finally {
    setIsUpdating(prev => ({ ...prev, bio: false }));
  }
};

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
  }, [user]);

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>
          <i className="bi bi-gear-fill me-2"></i>
          Account Settings
        </h1>
        <p className="text-muted">Manage your profile and account preferences</p>
      </div>

      <div className="card settings-card">
        <div className="card-body">
          <h5 className="card-title">
            <i className="bi bi-image me-2"></i>
            Profile Image
          </h5>

          {successMessages.image && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              {successMessages.image}
            </div>
          )}

          {errors.image && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {errors.image}
            </div>
          )}

          <div className="row align-items-center">
            <div className="col-md-3 text-center mb-3 mb-md-0">
              <img
                src={profileImg || 'https://via.placeholder.com/150'}
                alt="Profile preview"
                className="profile-preview rounded-circle"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                }}
              />
            </div>
            <div className="col-md-9">
              <form onSubmit={handleSaveImage}>
                <div className="mb-3">
                  <label htmlFor="profileImg" className="form-label">Image URL</label>
                  <input
                    type="url"
                    id="profileImg"
                    className="form-control"
                    value={profileImg}
                    onChange={(e) => setProfileImg(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <small className="text-muted">Enter a direct URL to your profile image</small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isUpdating.image || !profileImg.trim()}
                >
                  {isUpdating.image ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Updating...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      Save Image
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="card settings-card">
        <div className="card-body">
          <h5 className="card-title">
            <i className="bi bi-person-fill me-2"></i>
            Personal Information
          </h5>

          <form onSubmit={handleSaveName} className="mb-4">
            {successMessages.name && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {successMessages.name}
              </div>
            )}
            {errors.name && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errors.name}
              </div>
            )}

            <div className="row align-items-end">
              <div className="col-md-8">
                <label htmlFor="name" className="form-label">Display Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="col-md-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isUpdating.name || !name.trim() || name === user?.name}
                >
                  {isUpdating.name ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      Save Name
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={handleSaveUsername}>
            {successMessages.username && (
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>
                {successMessages.username}
              </div>
            )}
            {errors.username && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errors.username}
              </div>
            )}

            <div className="row align-items-end">
              <div className="col-md-8">
                <label htmlFor="username" className="form-label">Username</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                  />
                </div>
                <small className="text-muted">This is your unique identifier</small>
              </div>
              <div className="col-md-4">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isUpdating.username || !username.trim() || username === user?.username}
                >
                  {isUpdating.username ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>
                      Save Username
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="card settings-card">
        <div className="card-body">
          <h5 className="card-title">
            <i className="bi bi-palette-fill me-2"></i>
            Artist Profile
          </h5>

          {successMessages.artist && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              <i className="bi bi-check-circle-fill me-2"></i>
              {successMessages.artist}
            </div>
          )}
          {errors.artist && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {errors.artist}
            </div>
          )}

          <p className="text-muted mb-3">
            {user?.is_artist
              ? "You have an artist profile. You can now upload and sell your prints!"
              : "Upgrade to an artist account to start selling your prints on our platform."
            }
          </p>

          <button
            className={`btn ${user?.is_artist ? 'btn-success' : 'btn-info'} w-100`}
            onClick={handleBecomeArtist}
            disabled={user?.is_artist || isUpdating.artist}
          >
            {isUpdating.artist ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating artist profile...
              </>
            ) : user?.is_artist ? (
              <>
                <i className="bi bi-check-circle-fill me-2"></i>
                You are an artist
              </>
            ) : (
              <>
                <i className="bi bi-star-fill me-2"></i>
                Become an Artist
              </>
            )}
          </button>
        </div>
          {user?.is_artist && (
            <div className="card settings-card">
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-pencil-square me-2"></i>
                  Artist Bio
                </h5>

                {successMessages.bio && (
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    {successMessages.bio}
                  </div>
                )}

                {errors.bio && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {errors.bio}
                  </div>
                )}

                <form onSubmit={handleSaveBio}>
                  <div className="mb-3">
                    <label htmlFor="bio" className="form-label">Your Artist Biography</label>
                    <textarea
                      id="bio"
                      className="form-control"
                      rows="6"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell your story... Share your artistic journey, inspirations, and what makes your work unique."
                      maxLength={1500}
                    ></textarea>
                    <small className="text-muted">{bio.length}/1500 characters</small>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isUpdating.bio || !bio.trim() || bio === user?.bio}
                  >
                    {isUpdating.bio ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Saving...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-save me-2"></i>
                        Save Bio
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default ProfileSettings