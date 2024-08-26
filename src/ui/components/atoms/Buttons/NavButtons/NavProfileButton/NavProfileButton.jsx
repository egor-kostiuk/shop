import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "/src/hooks/useProfile.js";
import { useEditProfileImg } from "/src/hooks/useEditProfileImg.js";

import { NavLogoutButton } from "../NavLogoutButton/NavLogoutButton.jsx";

import "./NavProfileButton.css";

export const NavProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userDetails, handleLogout } = useProfile();
  const { profileImg } = useEditProfileImg();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const navigateToProfileSettingPage = () => {
    navigate("/settings");
    closeDropdown();
  };

  return (
    <div className="profile-dropdown">
      <button className="nav-profile-button" onClick={toggleDropdown}>
        <img src={profileImg} alt=""/>
      </button>
      <nav className={`profile-dropdown-content ${isOpen ? 'open' : ''}`}>
        <h6 className="user-profile-title">User profile</h6>
        <ul>
          <div className="user-profile">
            <div className="user-profile-box">
              <img src={profileImg} alt=""/>
              <div className="user-info-box">
                <h6 className="dropdown-username">{userDetails?.firstName} {userDetails?.lastName}</h6>
                <h6 className="dropdown-activity">Designer</h6>
                <h6 className="dropdown-mail">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    className="iconify iconify--majesticons MuiBox-root css-cnvj7y"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      d="m7 9l3.75 3a2 2 0 0 0 2.5 0L17 9m4 8V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2"
                    ></path>
                  </svg>
                  {userDetails?.email}
                </h6>
              </div>
            </div>
          </div>
          <hr className={'profile-hr'}/>
          <div className="profile-settings">
            <div className="profile-settings-box" onClick={navigateToProfileSettingPage}>
              <div className="profile-settings-img">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--fa MuiBox-root css-14fq1ur"
                  width="20px"
                  height="20px"
                  viewBox="0 0 1792 1792"
                >
                  <path
                    fill="rgb(113, 142, 191)"
                    d="M896 0q182 0 348 71t286 191t191 286t71 348q0 181-70.5 347T1531 1529t-286 191.5t-349 71.5t-349-71t-285.5-191.5t-190.5-286T0 896t71-348t191-286T548 71T896 0m619 1351q149-205 149-455q0-156-61-298t-164-245t-245-164t-298-61t-298 61t-245 164t-164 245t-61 298q0 250 149 455q66-327 306-327q131 128 313 128t313-128q240 0 306 327m-235-647q0-159-112.5-271.5T896 320T624.5 432.5T512 704t112.5 271.5T896 1088t271.5-112.5T1280 704"
                  ></path>
                </svg>
              </div>
              <div className="profile-box">
                <h6 className="dropdown-my-profile">My profile</h6>
                <h6 className="dropdown-account-settings">Account Settings</h6>
              </div>
            </div>
          </div>
          <div className="logout-button-box">
            <NavLogoutButton label={'Logout'} onClick={handleLogout}/>
          </div>
        </ul>
      </nav>
      {isOpen && <div className="dropdown-overlay" onClick={closeDropdown}></div>}
    </div>
  );
};