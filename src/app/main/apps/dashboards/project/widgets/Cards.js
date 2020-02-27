import React, { Component } from "react";
import Card1 from "./Card1";
import Card2 from "./Card2";
import instance from 'app/services/firebaseService/firebaseService'


class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      developers: []
    };
  }

  componentDidMount() {
    var name = instance.getCardData();
  }

  render() {
    return (
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12 ">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
              <Card1 />
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Cards;