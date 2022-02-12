import React, { useEffect } from "react";
import styled from "styled-components";
import {
  selectUserPhoto,
  selectUserName,
  setUserLogin,
  setSignOut,
} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        navigate("/");
      }
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      navigate("/");
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      navigate("/login");
    });
  };
  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a href="">
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </a>
            <a href="">
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </a>
            <a href="">
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </a>
            <a href="">
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </a>
            <a href="">
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </a>
            <a href="">
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg
            onClick={signOut}
            src="data:image/jpeg;base64,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"
          />
        </>
      )}
    </Nav>
  );
};

export default Header;

const Nav = styled.div`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: auto;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    color: white;
    text-decoration: none;
    cursor: pointer;
    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: end;
`;
