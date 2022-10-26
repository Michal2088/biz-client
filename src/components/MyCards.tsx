import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { deleteCard, getMyCards } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  useEffect(() => {
    getMyCards()
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => console.log(err));
  }, [isChanged]);
  const handleDelete = (card: Card) => {
    if (window.confirm("Are you sure?")) {
      deleteCard(card._id as string)
        .then(() => {
          successMsg(`${card.bizName} deleted successfully`);
          setIsChanged(!isChanged);
        })
        .catch((err) => {
          console.log(err.response.data);
          errorMsg(err.response.data);
        });
    }
  };
  return (
    <>
      <div className="container d-flex flex-column min-vh-100">
        <Navbar />
        <h3 className="display-5 text-center m-3">My Cards</h3>

     
        <div className="d-flex justify-content-around flex-wrap">
          {cards.length ? (
            cards.map((card: Card) => (
              <div
                key={card._id}
                className="card col-md-3  my-4 borderCard"
                style={{ width: "18rem" }}
              >
                <img src={card.bizImage} className="card-img-top m-1 p-2 pt-4 borderB" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{card.bizName}</h5>
                  <p className="card-text">{card.bizDescription}</p>
                <p> {card.bizPhone}</p>
                <p> {card.bizAddress} </p>
                  <div className="d-flex">
                    <Link to={`edit/${card._id}`}>
                      <i className="fa-solid fa-pen-to-square m-1"></i>
                    </Link>
                    <div onClick={() => handleDelete(card)} className="text-danger">
                      <i className="fa-solid fa-trash m-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>no cards</p>
          )}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MyCards;
