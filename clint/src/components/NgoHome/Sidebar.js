import React from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';


export default function Sidebar({setlarg, larg,setSelection}) {

    const handleLrg = () => {
        if(larg === true){
            setlarg(false)
        }else{
            setlarg(true)
        }
    }
    return (
        <div >
           
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                    setlarg(true)

                }}
                style={{marginTop:'70px',position: "fixed" }}
            >
                <SideNav.Toggle onClick={() => handleLrg()}/>
                    
                <SideNav.Nav defaultSelected="home" >
                    <NavItem eventKey="home" onClick={() => {setSelection('profile')}}>
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Profile
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="Caterning" onClick={() => {setSelection('allcaterning')}}>
                        <NavIcon>
                            <i className="fa fa-fw fa-Caterning" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            All Caterning
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="requestFood" onClick={() => {setSelection('requestfood')}}>
                        <NavIcon>
                            <i className="fa fa-fw fa-requestFood" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Request Food
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="Post">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-Post" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText >
                            Post
                        </NavText>
                        <NavItem eventKey="Post/viewpost" onClick={() => {setSelection('viewpost')}}>
                            <NavText>
                                View Post
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="Post/uploadpost" onClick={() => {setSelection('uploadpost')}}>
                            <NavText>
                                upload Post
                            </NavText>
                        </NavItem>
                    </NavItem>


                </SideNav.Nav>
            </SideNav>
        </div>
    )
}
