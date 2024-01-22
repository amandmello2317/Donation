// import React from 'react'
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// // Be sure to include styles at some point, probably during your bootstraping
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';


// export default function SideBarcat({ setlarg, larg, setSelection }) {

//     const handleLrg = () => {
//         if (larg === true) {
//             setlarg(false)
//         } else {
//             setlarg(true)
//         }
//     }
//     return (
//         <div >

//             <SideNav
//                 onSelect={(selected) => {
//                     // Add your code here
//                     setlarg(true)

//                 }}
//                 // style={{ marginTop: '70px', position: "fixed"}}
//                 style={{ marginTop: '70px', position: 'fixed', background: '#333' }}
//             >
//                 <SideNav.Toggle onClick={() => handleLrg()}/>

//                 <SideNav.Nav defaultSelected="home" >
//                     <NavItem eventKey="home" onClick={() => { setSelection('profile') }}>
//                         <NavIcon>
//                             <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
//                         </NavIcon>
//                         <NavText>
//                             Profile
//                         </NavText>
//                     </NavItem>


//                     <NavItem eventKey="Post">
//                         <NavIcon>
//                             <i className="fa fa-fw fa-line-Post" style={{ fontSize: '1.75em' }} />
//                         </NavIcon>
//                         <NavText >
//                             Post Food
//                         </NavText>
//                         <NavItem eventKey="Post/uploadpost" onClick={() => { setSelection('uploadfood') }}>
//                             <NavText>
//                                 Upload Post food
//                             </NavText>
//                         </NavItem>
//                         <NavItem eventKey="Post/viewpost" onClick={() => { setSelection('viewfood') }}>
//                             <NavText>
//                                 View Post food
//                             </NavText>
//                         </NavItem>

//                     </NavItem>

              

//                     <NavItem eventKey="requestFood" onClick={() => { setSelection('requestedfood') }}>
//                         <NavIcon>
//                             <i className="fa fa-fw fa-requestFood" style={{ fontSize: '1.75em' }} />
//                         </NavIcon>
//                         <NavText>
//                             Request Food
//                         </NavText>
//                     </NavItem>

//                 </SideNav.Nav>
//             </SideNav>
//         </div>
//     )
// }
import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { FaHome, FaUtensils, FaUpload, FaEye, FaQuestion } from 'react-icons/fa';

export default function SideBarcat({ setlarg, larg, setSelection }) {
  const handleLrg = () => {
    setlarg((prevLarg) => !prevLarg);
  };


  return (
    <SideNav
      onSelect={() => {
        setlarg(true);
      }}
      style={{ marginTop: '70px', position: 'fixed', background: '#333' }}
    >
      <Toggle onClick={handleLrg} />

      <Nav defaultSelected="home">
        <NavItem eventKey="home" onClick={() => setSelection('profile')}>
          <NavIcon>
            <FaHome style={{ fontSize: '1.75em', color: '#fff' }} />
          </NavIcon>
          <NavText style={{ color: '#fff' }}>Profile</NavText>
        </NavItem>

        <NavItem eventKey="Post">
          <NavIcon>
            <FaUtensils style={{ fontSize: '1.75em', color: '#fff' }} />
          </NavIcon>
          <NavText style={{ color: '#fff' }}>Post Food</NavText>

          <NavItem eventKey="Post/uploadpost" onClick={() => setSelection('uploadfood')}>
            {/* <NavIcon>
              <FaUpload style={{ fontSize: '1.5em', color: '#fff' }} />
            </NavIcon> */}
            <NavText style={{ color: '#fff' }}>Upload Post food</NavText>
          </NavItem>

          <NavItem eventKey="Post/viewpost" onClick={() => setSelection('viewfood')}>
            {/* <NavIcon>
              <FaEye style={{ fontSize: '1.5em', color: '#fff' }} />
            </NavIcon> */}
            <NavText style={{ color: '#fff' }}>View Post food</NavText>
          </NavItem>
        </NavItem>

        <NavItem eventKey="requestFood" onClick={() => setSelection('requestedfood')}>
          <NavIcon>
            <FaQuestion style={{ fontSize: '1.75em', color: '#fff' }} />
          </NavIcon>
          <NavText style={{ color: '#fff' }}>Request Food</NavText>
        </NavItem>
      </Nav>
    </SideNav>
  );
}

