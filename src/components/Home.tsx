import { FunctionComponent, useEffect, useState } from "react";
import { getUserForProfile } from "../services/usersService";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [user, setUser] = useState({
    name: "",
    biz: false,
  });
  useEffect(() => {
    getUserForProfile()
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container d-flex flex-column min-vh-100">
        <Navbar />
        <h1 className="m-3 text-center">Welcome  {sessionStorage.getItem("token") ? user.name : <>to biz</>} </h1>
        {user.biz? <h4 className="m-2 text-center"><b> Business user</b></h4>:null}
        <div className="row">
          <img className="col col-lg-4 mb-2" src="images/module644057856.png" />

          <img className="col col-lg-8 mb-2" src="images/BusinessCardsMan3.jpg" />
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
