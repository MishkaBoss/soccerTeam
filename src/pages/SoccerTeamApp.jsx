import { useSelector, useDispatch } from "react-redux";
import { loadPlayers } from "../store/actions/playerActions.js";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../services/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { GameList } from "../components/GameList";
import { AppNav } from "../components/AppNav.jsx";
import { ArrowLeftOnRectangleIcon, XMarkIcon, Bars3BottomRightIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/24/outline'



export const SoccerTeamApp = () => {
  const [nav, setNav] = useState(false)
  const dispatch = useDispatch();
  const userCollectionRef = collection(db, "users");
  const gamesCollectionRef = collection(db, "games");
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [uid, setUid] = useState("");
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  // const [isConfirmed, setIsConfirmed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadPlayers());
    fetchAllUsers();
    fetchAllGames();
    return () => { };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user]);

  const fetchAllUsers = async () => {
    const docSnap = await getDocs(userCollectionRef);
    setUsers(docSnap.docs.map((doc) => ({ ...doc.data() })));
  };

  const fetchAllGames = async () => {
    const docSnap = await getDocs(gamesCollectionRef);
    setGames(docSnap.docs.map((doc) => ({ ...doc.data() })));
  };

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(`fetchUserName ~ data`, data);
      setName(data.name);
      setUid(data.uid);
    } catch (err) {
      console.error(err.message);
      alert("An error occured while fetching user data");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
    console.log(`logged out`);
    // navigate(-2)
  };

  const handleNav = () => {
    setNav(!nav)
  }

  if (!user) return <div>Loading... </div>;
  return (
    <div className="">
      <nav className="sticky top-0 left-0 bg-navBg ">
        <div className="flex justify-between items-center  text-white px-8 h-24">
          <div className="flex-col justify-center items-center">
            <h1 className="font-bold text-2xl text-mainColor">Soccer Team App</h1>
            <p className="text-lg">Hi, {name}</p>
          </div>
          <div className="flex-col hidden md:block">
            <button className="" onClick={handleLogout}>
              <p><ArrowLeftOnRectangleIcon className="inline h-7 w-7" /> Logout</p>
            </button>
            <div>
              <p><PlusIcon className='inline h-7 w-7' /><Link to={'/newGame'}>New Game</Link></p>
            </div>
          </div>
          <div className="block md:hidden">
            {
              nav ?
                <XMarkIcon onClick={handleNav} className="h-8 w-8" /> :
                <Bars3BottomRightIcon onClick={handleNav} className="h-8 w-8" />
            }
          </div>
        </div>


      </nav>
      <div className={`fixed text-lg h-full left-0 top-0 w-[60%] border-r border-r-gray-900 bg-bgColor text-white duration-500 ${nav ? '' : 'left-[-100%]'}`}>
        <button className="my-6 px-6 " onClick={handleLogout}>
          <p><ArrowLeftOnRectangleIcon className="inline h-7 w-7 mr-2" /> Logout</p>
        </button>
        <div className="mb-6 px-6">
          <p><PlusIcon className='inline h-7 w-7 mr-2' /><Link to={'/newGame'}>New Game</Link></p>
        </div>
      </div>
      <div className="">
        <h3 className="text-3xl my-5 text-center font-bold text-mainColor">Games List</h3>
        <div className="">
          <GameList className="items-center" games={games} name={name} />
        </div>
      </div>
    </div>
  );
};
