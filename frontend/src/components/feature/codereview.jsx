import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../src/styles/feature.css';
import '../../App.css';
import Header from '../Header';
import CodeDisplay from '../codeDisplay';


function Codereview({darkMode, toggleColorMode}) {
    const [request, setRequest] = useState('');
    const [json, setJson] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('c');
    const [loading, setLoading] = useState(false);
    const [inputLanguage, setInputLanguage] = useState(selectedLanguage);
    const host = process.env.REACT_APP_BACKEND_HOST;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch(`${host}/api/code/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: `Identify and analyse ${inputLanguage} code for ${request} please give the review of the code in easy and simple way` })
        });
        const json = await res.json();
        setJson(json);
        setLoading(false);
    };

    const handleChange = (e) => {
        if (e.target.name === "otp") {
            setRequest(e.target.value);
        }
    };

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setInputLanguage(selectedLanguage);
        setSelectedLanguage(selectedLanguage);
    };



    return (
        <div>
            <setion className={darkMode ? ' dark-mode' : 'light-mode'}>
                <Header Mode={darkMode ? ' dark-mode' : 'light-mode'} darkMode={darkMode} toggleColorMode={toggleColorMode}/>

                <div className="code1">
                    <h1 className='main_header'>ULTIMATE CODE REVIEWER</h1>
                    <div className="row">
                        <div className="col-md-6 left-section prompt1">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="language" className="form-label"><h4>Select Language:</h4></label>
                                    <select id="language" className="form-select translucent-select" value={inputLanguage} onChange={handleLanguageChange}>
                                        <option value="c">C</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">JAVA</option>
                                        <option value="python">Python</option>
                                    </select>
                                </div>

                                <label htmlFor="otp" autoComplete="false" className="form-label"><h4> Enter Your Code </h4></label>
                                <textarea value={request} onChange={handleChange} className="form-control translucent-input" id="otp" name="otp" required rows={10} cols={10} />
                                <button type="submit" className="golden-button mt-3">Submit</button>
                                {loading && <div className="loader"></div>}
                            </form>
                        </div>
                        <div className="col-md-6 right-section">
                            <h1 className='main_header'>{`Code Display `}</h1>
                            <CodeDisplay code={json.output} language={selectedLanguage} />
                        </div>
                    </div>
                </div>
            </setion>
        </div>
    )
}

export default Codereview
