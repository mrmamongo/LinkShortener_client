import React, {useContext} from 'react';

import './LinkCard.scss';
import useMessage from "../../hooks/message.hook";
import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";
import {useHistory} from "react-router-dom";

const LinkCard = ({ link }) => {
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const {request} = useHttp();
    const history = useHistory();

    const deleteHandler = async () => {
        try {
            const a = await request(`/api/link/${link._id}`, 'POST', null,
                {Authorization : `Bearer ${token}`});
            message(a.message);
            history.goBack();
        } catch (e) {
            message(`Exception caught: ${e}`);
            console.log(e);
            message(link._id);
        }
    }

    return (
        <div className='card'>
            <div className='card-content'>
            <h2>Link</h2>
            <p>Shortened Link: <a href={link.to} target="_blank"
            rel="noopener noreferrer"
            >{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank"
            rel="noopener noreferrer"
            >{link.from}</a></p>
            <p>Clicks: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
            </div>
            <div className="card-action">
                <button className="waves-effect waves-light btn" onClick={deleteHandler}>DELETE</button>
            </div>
        </div>
    );
};

export default LinkCard;