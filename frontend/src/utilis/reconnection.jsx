import userInfoSuppr from './userInfoSuppr.jsx';

async function userConnect(authCtx, navigate, ApiURL, setUserInfo) {
    console.log('--------userConnect Profil---------');
    console.log(authCtx);
    let storageOrStateToken, storageOrStateId;
    if (!authCtx.token) {
        if (!sessionStorage.getItem('token')) {
            userInfoSuppr();
        } else {
            storageOrStateToken = sessionStorage.getItem('token');
            storageOrStateId = sessionStorage.getItem('id');
        }
    } else {
        storageOrStateToken = authCtx.token;
        storageOrStateId = authCtx.id;
    }
    const reqOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + storageOrStateToken,
        },
    };
    await fetch(ApiURL + '/user/' + storageOrStateId, reqOptions)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            setUserInfo(data);
            if (authCtx.token == null) {
                authCtx.token = sessionStorage.getItem('token');
                authCtx.id = Number(sessionStorage.getItem('id'));
                authCtx.permission = data.permission;
                authCtx.img = data.imgUrl;
            }
        })
        .catch((err) => {
            console.log(err);
            navigate('/login');
        });
}

export default userConnect;