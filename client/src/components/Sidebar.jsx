import React, {useState} from 'react'
// 1. Using NavLink(never use <a> tag) Component from React-Dom
import { NavLink } from 'react-router-dom'
// step18b: Now in sidebar.jsx importing the newly cerated athcontext
import { AuthContext } from '../Context/Auth';

// step-user1: Import {motion} and {useMediaQuary}
import {motion} from "framer-motion";
import {useMediaQuery} from "react-responsive";

import { 
  FaHome,
  FaUser,
  FaUsers,
  FaRecordVinyl,
  FaBars,
  FaSignOutAlt,
 } from "react-icons/fa";
// 2. Dynamically get the different routes based from Roles / hardcode
// 2a. Show without icons and build the basic structure
/* const routes = [
  {
    path: "/dashboard",
    name: "Home",
  },
  {
    path: "/orgs",
    name: "Orgs",
  },
  {
    path: "/users",
    name: "Users",
  },
  {
    path: "/leads",
    name: "Leads",
  },
  {
    path: "/",
    name: "Logout",
  },
]; */
// 3. Getting Ready using React icons
// 5. Show the routes array with icons
const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/orgs",
    name: "Orgs",
    icon: <FaRecordVinyl />,
  },
  {
    path: "/users",
    name: "Users",
    icon: <FaUser />,
  },
  {
    path: "/leads",
    name: "Leads",
    icon: <FaUsers />,
  },
  {
    path: "/",
    name: "Logout",
    icon: <FaSignOutAlt />,
  },
];
// 6. Update FaBars icon afted lead sense
// 7. Add the footer
// 8. Pass the {children}

const Sidebar = ({children}) => {
// step19: Define a state islogin and token, intial state should be false and null
const [isLogin, setIsLogin] = useState(false)
const [token, settoken] = useState(null);
// step20: Create an auth (object) to store all the auth states, t.e. isLogin, setIsLogin, token, settoken
const auth = {isLogin, setIsLogin, token, settoken};

//step-user2 : Add following (run code and see console that it is false, when screen size reduce it is true)
const isTabletOrMobile = useMediaQuery({query:"(max-width: 780px)"});
console.log(isTabletOrMobile);
const [isOpen, setIsOpen] = useState(true);
const toggle = () => {setIsOpen(!isOpen)};



//step-user5: Define the function showAnimation{}
const showAnimation = {
  hidden: {
    width:0,
    opacity:0,
    transition: {duration:0.5},
  },
  show: {
    width:"auto",
    opacity: 1,
    transition: {duration:0.2}
  },
  }

//Step21: Add Authcontext.provider  <AuthContext.Provider value={auth}> and pass the auth 
 //state inside main-container within return()
 //Step22: Place all the sidebar <div> inside  {isLogin && ( sidebar <div> here )}
 //then move to Login.jsx

 //step-user3: add the motion.div to the existing DIV <sidebar class>, add width and ternary operator {{width:!isTabletOrMobile? "200px": "36px"}
 //step-user4:  Modify sidebar_title, so that Leadsense is not visible when sidebar is 36px
 //step-user6: put conidtion for sidebar_title  {!isTabletOrMobile && isOpen && (
//step-user8: FaBars, Add onClick = {toggle} and then modify conditions  {{width: (!isTabletOrMobile && isOpen)?
 //step-user9: change app.css with .bars, .sidebar_title, and .sidebar_footer
 //now move to user.jsx

  return (
    <div className="main-container">
      <AuthContext.Provider value={auth}>
        {isLogin && (
      <motion.div  animate= {{width: !isTabletOrMobile && isOpen? "200px": "36px"}} className="sidebar">
        <div className="sidebar_top">
        {!isTabletOrMobile && isOpen && (     
          <motion.h2 variants={showAnimation} initial="hidden" animate="show" exit="hidden"                            
            className="sidebar_title"> Lead Sense</motion.h2>
        )}
          <div className="bars">
                <FaBars onClick={toggle} />
          </div>
        </div>
        <section className="routes">
              {routes.map((route) => {
                return (
                  <NavLink to={route.path} key={route.name} className="navlink">
                    <div className="icon">{route.icon}</div>
                    {route.name}
                  </NavLink>
                );
              })}
        </section>
        <footer className="sidebar_footer">&copy;KITES |2022-23</footer>
      </motion.div>)}
      <main className="app_container">{children} </main>
      </AuthContext.Provider>

    </div>
  )
}

export default Sidebar
