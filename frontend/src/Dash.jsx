import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from './redux/Login/loginAction';

const Dash = () => {

    // const { logindata, setLoginData } = useContext(LoginContext);

    // const [data, setData] = useState(false);
    const dispatch = useDispatch()


    // const history = useNavigate();

    let token = localStorage.getItem("usersdatatoken");

    const DashboardValid = async () => {
        console.log(token)

        const res = await fetch("http://localhost:8000/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
        console.log(data.ValidUserOne)
        dispatch(getUserData(data.ValidUserOne))

        // if (data.status == 401 || !data) {
        //     history("*");
        // } else {
        //     console.log("user verify");
        //     setLoginData(data)
        //     history("/dash");
        // }
    }


    useEffect(() => {
        // setTimeout(() => {
            DashboardValid();
            // setData(true)
        // }, 2000)

    }, [])


  return (
    <>
    <h1>Dashboard</h1>
        {/* {
                data ? <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img src="./man.png" style={{ width: "200px", marginTop: 20 }} alt="" />
                    <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
                </div> : <div>
                    Loading... &nbsp;
                    <CircularProgress />
                </div>
            } */}
    </>
  )
}

export default Dash
