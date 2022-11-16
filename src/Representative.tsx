import React from 'react';
import { IRep } from "./IRep";

const Representative = (props: { rep: IRep} ) => {
    const { rep } = props;

    return (
        
        <div className="representative">
            <h1>Your MLA</h1>
            <div className="profile">
                <div className="photo">
                    <img src={rep.photo_url} alt={rep.name} />
                </div>
                <div className="information">
                    <h3>Name</h3>
                    <p>{rep.name}</p>
                    <h3>Email</h3>
                    <p>{rep.email}</p>
                    <h3>District</h3>
                    <p>{rep.district_name}</p>
                    <h3>Offices</h3>
                </div>
            </div>
            
        </div>
    );
};

export default Representative;