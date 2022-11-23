import { PlayerList } from '../components/PlayerList'
import { connect, useSelector, useDispatch } from 'react-redux'
import { loadPlayers, removePlayer } from '../store/actions/playerActions.js'
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { playerService } from '../services/playerService';
import { Link } from 'react-router-dom';
import { GameList } from '../components/GameList';

export const SoccerTeamApp = (props) => {
  const { players } = useSelector(state => state.playerModule)
  const dispatch = useDispatch()
  const userCollectionRef = collection(db, "users")
  const gamesCollectionRef = collection(db, "games")
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [users, setUsers] = useState([])
  const [games, setGames] = useState([])
  // const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPlayers())
    fetchAllUsers()
    fetchAllGames()
    return () => {

    }
  }, [])

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [])



  const fetchAllUsers = async () => {
    const docSnap = await getDocs(userCollectionRef)
    setUsers(docSnap.docs.map((doc) => ({ ...doc.data() })))

  }

  const fetchAllGames = async () => {
    const docSnap = await getDocs(gamesCollectionRef)
    setGames(docSnap.docs.map((doc) => ({ ...doc.data() })))

  }



  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data()
      console.log(`fetchUserName ~ data`, data)
      setName(data.name);
      setUid(data.uid);
    } catch (err) {
      console.error(err.message);
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
    // playerService.savePlayer({ name, uid })
    // navigate('/dashboard')
    console.log(games)
  }

  if (!players) return <div>Loading... </div>
  return (
    <div className="soccer-team-app" >
      {/* {users.map((user) => { return <div><h1>Name: {user.name}</h1></div> })} */}
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        {/* <div>{uid}</div> */}
        <div>{user?.email}</div><br />
        <button className="dashboard__btn" onClick={onLogout}>Logout</button>
      </div>
      <div><Link to='/newGame'>Create New Game</Link></div>
      <br />
      {/* <div className="confirmed-players">
        <h3>Players Arriving Today's Match:</h3>
        <PlayerList onRemovePlayer={onRemovePlayer} users={users} />
      </div> */}
      <div className="games-list">
        <h3>games:</h3>
        {/* {games} */}
        <GameList games={games} />
      </div>
      <br />
      <section className='arriving-btn'>
        <button onClick={onConfirm} >I want to play!</button>
      </section>
    </div>
  )
}