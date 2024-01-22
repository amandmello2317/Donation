import React, { useState, useEffect } from 'react';

export default function WaitingPage({status}) {
    return (
        <div>
            <div className="container mt-5">
                <div className="card text-center">
                    <div className="card-body">
                        {status === 'waiting' && (
                            <div>
                                <h2 className="card-title">Waiting for Admin Approval</h2>
                                <p className="card-text">Please wait while the admin reviews your registration.</p>
                            </div>
                        )}

            
                        {status === 'rejected' && (
                            <div>
                                <h2 className="card-title">Registration Rejected</h2>
                                <p className="card-text">Sorry, your registration has been rejected by the admin.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
