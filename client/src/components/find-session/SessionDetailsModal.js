import React, { useState } from 'react';
import styled from 'styled-components';
import PhoneIcon from '@material-ui/icons/Phone';

const Header = styled.div`
  font-size: 28px;

  img {
    width: 100%;
  }

  div {
    heigth: 35px;
    font-weight: 600;
  }
`;
const Footer = styled.div`
  height: calc(100% - 335px);
  font-size: 20px;
  line-height: 1.5;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  div {
    span {
      font-weight: 600;
    }
  }
`;

export const SessionDetailsModal = (props) => {
  return (
    <div style={{height: '100%', padding: '1.5em', textAlign: 'center', color: '#53B493'}}>
      <Header>
        <img src={window.location.origin + '/images/giphy.gif'}/>
        <div>העולם צריך עוד אנשים כמוך !</div>
      </Header>
      <Footer>
        <div>
          הצעת ההתנדבות שלך נשלחה למשפחה והמשך התיאום יתבצע באופן טלפוני
          <br />
          בשם כל מי שנלחם כרגע בקורונה,<span> תודה לך</span>
        </div>
        <div style={{color: '#8A8A8A'}}>
          ניתן לפנות לתמיכה מחמ"ל משרד הבריאות בכל שלב של התהליך
          <br />
          <PhoneIcon />
          03-9898888
        </div>
      </Footer>
    </div>
  )
}