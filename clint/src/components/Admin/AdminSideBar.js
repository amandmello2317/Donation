
import React from 'react';

import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
export default function AdminSideBar({ setlarg, larg, setSelection, setDirect }) {



  return (

    <Sidebar >
      <Menu>
        <MenuItem onClick={() => setDirect("home")}>Home</MenuItem>
        <MenuItem onClick={() => setDirect("ngo")}>NGO</MenuItem>
        {/* <MenuItem> Caterning </MenuItem> */}
      </Menu>
    </Sidebar>
  );
}

