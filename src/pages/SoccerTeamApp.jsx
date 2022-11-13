import { PlayerList } from '../components/PlayerList'
import { connect, useSelector, useDispatch } from 'react-redux'
import { loadPlayers, removePlayer } from '../store/actions/playerActions.js'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export const SoccerTeamApp = (props) => {
  const { players } = useSelector(state => state.playerModule)
  const dispatch = useDispatch()
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPlayers())
    // console.log(players);
    return () => {

    }
  }, [])

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading])

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      console.log(`fetchUserName ~ q`, q)
      const doc = await getDocs(q);
      const data = doc.docs[0].data()
      console.log(`fetchUserName ~ data`, data)
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }

  const onRemovePlayer = async (playerId) => {

    await dispatch(removePlayer(playerId))
  }

  const onLogout = () => {
    logout()
    console.log(`logged out`)
    navigate('/')
    // navigate(-2)
  }

  if (!players) return <div>Loading... </div>
  return (
    <div className="soccer-team-app" >
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={onLogout}>Logout</button>
      </div>
      <PlayerList onRemovePlayer={onRemovePlayer} players={players} />
    </div>
  )
}