import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

import './LinksList.scss';
const LinksList = ({links}) => {

    if (!links.length) {
        return <p className="center">No links :(</p>
    }

    return (
        <div className='center'>
        <table>
            <thead>
            <tr>
                <th>N</th>
                <th>Original</th>
                <th>Shortened</th>
                <th>Open</th>
            </tr>
            </thead>
            <tbody>
            { links.map((link, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td>
                            <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>

                    </tr>
                )
            })}
            </tbody>
        </table>
            <Link className="waves-effect waves-light btn" to={'/create'}>ADD LINK</Link>
        </div>
    );
};

export default LinksList;