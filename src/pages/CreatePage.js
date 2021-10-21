import React, {useContext, useEffect, useState} from 'react';
import useHttp from '../hooks/http.hook';
import AuthContext from "../context/AuthContext";
import {useHistory} from "react-router-dom";
import useMessage from "../hooks/message.hook";

const CreatePage = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link, setLink] = useState("");
    const message = useMessage();
    useEffect(() => {
        window.M.updateTextFields();
    }, []);


    const pressHandler = async event => {
        if (event.key === 'Enter') {
            try {
                const data = await request('/api/link/generate', 'POST',
                    {from: link}, {Authorization: `Bearer ${auth.token}`
                });
                history.push(`/detail/${data.link._id}`);
                console.log(data);
            } catch (e) {
                message(`Exception caught: ${e.message}`);
            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
                <div className="input-field">
                    <input
                        placeholder="Enter link"
                        id="link"
                        name="link"
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Link</label>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;