import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/Card";
import { getAllCards } from "../services/cardsService";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface AllCardsProps {}

const AllCards: FunctionComponent<AllCardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards()
      .then((result) => {
        setCards(result.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const [value, setValue] = useState<string>("");

  let afterFilter: Card[] = cards.filter((card: Card) => {
    return card.bizName.toLowerCase().includes(value.toLowerCase());
  });

  return (
    <>
      <div className="container d-flex flex-column min-vh-100">
        <Navbar />
        <h3 className="display-5 text-center m-3">All cards</h3>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            value={value}
            placeholder="Search for card"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="btn btn-outline-secondary"
            type="submit"
            id="button-addon2"
          >
            Search
          </button>
        </div>

        <div className="d-flex justify-content-around flex-wrap">
          {afterFilter.length ? (
            afterFilter.map((card: Card) => (
              <div
                key={card._id}
                className="card col-md-3 my-4 borderCard"
                style={{ width: "18rem" }}
              >
                <img
                  src={card.bizImage}
                  className="card-img-top m-1 p-2 pt-4"
                  alt="..."
                />
                <hr />
                <div className="card-body">
                  <h5 className="card-title">{card.bizName}</h5>
                  <p className="card-text">{card.bizDescription}</p>
                  <hr />
                  <p> {card.bizPhone}</p>
                  <hr />
                  <p> {card.bizAddress} </p>
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

export default AllCards;
