import React from 'react';
import './Score.css';
import ribbon from '../../images/ribbon.png';
import bronze from '../../images/icons8-bronze-medal-100.png';
import silver from '../../images/icons8-silver-medal-100.png';
import gold from '../../images/icons8-trophy-100.png';

export default function Score(props) {
  let total = props.total;
  let nextLvl = 0;
  let fill = 0;
  let img = null;
  let alt = '';
  if (total < 10) {
    img = ribbon;
    alt = 'ribbon';
    nextLvl = 10;
  } else if (total < 40) {
    img = bronze;
    alt = 'bronze medal';
    nextLvl = 25;
    total -= 10;
  } else if (total < 100) {
    img = silver;
    alt = 'silver medal';
    nextLvl = 65;
    total -= 35;
  } else {
    alt = 'gold trophy';
    img = gold;
  }

  fill = 100 * (total / nextLvl);

  return (
    <>
      <div className="Score">
        <div>
          <div className="Score__text">{`Your total score is: ${props.total}`}</div>
          <div className="Score__meter">
            <span className="Score__fill" style={{ width: fill + '%' }}></span>
          </div>
        </div>
        <img src={img} alt={alt} />
      </div>
    </>
  );
}
