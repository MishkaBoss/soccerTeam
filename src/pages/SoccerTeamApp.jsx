import { PlayerList } from '../components/PlayerList'
import { connect, useSelector, useDispatch } from 'react-redux'
import { loadPlayers, removePlayer } from '../store/actions/playerActions.js'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { ImArrivingButton } from '../components/ImArrivingButton';
import { playerService } from '../services/playerService';

export const SoccerTeamApp = (props) => {
  const { players } = useSelector(state => state.playerModule)
  const dispatch = useDispatch()
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPlayers())
    // console.log(players);
    return () => {

    }
  }, [players])

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading])

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data()
      setName(data.name);
      setUid(data.uid);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }

  const onRemovePlayer = async (playerId) => {

    await dispatch(removePlayer(playerId))
    console.log(`removed!`);
    // const isConfirmed = false
  }

  const onLogout = () => {
    logout()
    console.log(`logged out`)
    navigate('/')
    // navigate(-2)
  }

  const onConfirm = async (ev) => {
    playerService.savePlayer({ name, uid })
    navigate('/dashboard')
  }

  if (!players) return <div>Loading... </div>
  return (
    <div className="soccer-team-app" >
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{uid}</div>
        <div>{user?.email}</div><br />
        <button className="dashboard__btn" onClick={onLogout}>Logout</button>
      </div>
      <br />
      <div className="confirmed-players">
        <h3>Players Arriving Today's Match:</h3>
        <PlayerList onRemovePlayer={onRemovePlayer} players={players} />
      </div>
      <br />
      <section className='arriving-btn'>
        <button onClick={onConfirm} >I want to play!</button>
      </section>
    </div>
  )
}