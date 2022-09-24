import { useState } from 'react';

function Signup(props) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    let handleSubmit = async (e) => {
        e.preventDefault();
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                mail: mail,
                password: password,
            }),
        };
        fetch('http://localhost:' + process.env.REACT_APP_BACKEND_PORT + '/signup', reqOptions)
            .then((res) => res.json())
            .then((data) => {
                window.location.replace('http://localhost:' + process.env.REACT_APP_FRONTEND_PORT + '/login');
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <form onSubmit={handleSubmit} className='container col-lg-12'>
            <h1 className='container col-xl-10 col-12 mt-3'>S'inscrire</h1>
            <div className='container col-xl-8 col-12 mt-4'>
                <label htmlFor='firstname' className='form-label'>
                    Prénom
                </label>
                <input
                    type='text'
                    id='firstname'
                    name='user[firstname]'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className='form-control'
                    placeholder='Xavier, Véronique, ect...'
                    aria-label='Prénom'
                    aria-describedby='basic-addon1'
                />
                <label htmlFor='lastname' className='form-label mt-3'>
                    Nom
                </label>
                <input
                    type='text'
                    id='lastname'
                    name='user[lastname]'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className='form-control'
                    placeholder='Dupont, Chevalier, ect...'
                    aria-label='Nom'
                    aria-describedby='basic-addon1'
                />
                <label htmlFor='email' className='form-label mt-3'>
                    Adresse Mail
                </label>
                <input
                    type='email'
                    id='email'
                    name='user[mail]'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    className='form-control'
                    placeholder='XavierChevalier@gmail.com, ect...'
                    aria-label='Adresse mail'
                    aria-describedby='basic-addon1'
                />
                <label htmlFor='password' className='form-label mt-3'>
                    Mot de passe
                </label>
                <input
                    type='password'
                    id='password'
                    name='user[password]'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='form-control'
                    placeholder=''
                    aria-label='Mot de passe'
                    aria-describedby='passwordHelpBlock'
                />
                <div id='passwordHelpBlock' className='form-text'>
                    Votre mot de passe doit faire 8 caractères, être composé de minuscule, de majuscule, de
                    chiffre et de symbole.
                </div>
                <button type='submit' className='btn btn-danger mt-3'>
                    s'incrire
                </button>
            </div>
        </form>
    );
}

export default Signup;
