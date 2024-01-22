
import React, { useState } from 'react'
import NgoLogin from './NgoAuth/NgoLogin'
import './loginpage.css'
import NavBar from '../NavBar/NavBar'
import CateringLogin from './CateringAuth/CateringLogin'
import CateringSingUp from './CateringAuth/CateringSingUp'

export default function LoginPage({ log, setLog }) {

    const [selectUser, setSelectUser] = useState('ngo')

    return (
        <div className='body1'>

            <div className='log-Contain'>
                <div className='submit-container'>
                    <div className={selectUser === 'ngo' ? 'submit ' : 'submit gray'} onClick={() => setSelectUser('ngo')}>Login As Ngo</div>
                    <div className={selectUser === 'caterning' ? 'submit ' : 'submit gray'} onClick={() => setSelectUser('caterning')}>caterning</div>
                </div>

                {
                    selectUser === 'ngo' ? (
                        <NgoLogin
                            setLog={setLog}
                            log={log}
                        />

                    ) : (
                        <CateringLogin
                            setLog={setLog}
                            log={log}
                        />

                    )
                }
            </div>
        </div>
    )
}
