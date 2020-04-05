import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import PhoneIcon from '@material-ui/icons/Phone';
import EventIcon from '@material-ui/icons/Event';
import { FaRegClock, FaHeart } from 'react-icons/fa';
import { TiLocationOutline } from 'react-icons/ti';
import { FiCheckCircle } from 'react-icons/fi';

const Header = styled.div`
  font-size: 28px;

  img {
    width: 100%;
  }

  div {
    heigth: 35px;
    font-weight: 600;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    cursor: pointer;
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
const SessionDetailsComp = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const FormHeader = styled.div`
  height: 100px;
  align-self: center;
  display: flex;
  align-items: center;

  span {
    background-color: #53B4931A;
    padding: 0.5em 1em;
    border-radius: 25px;
    color: #935ED7;
    font-size: 25px;
  }

  svg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    cursor: pointer;
  }
`;
const FormRow = styled.div`
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  label {
    font-size: 20px;
    color: #935ED7;
    margin-bottom: 0.5em;
  }
`;
const Basic = styled.div`
  line-height: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  div {
    display: flex;
    align-items: center;

    svg {
      width: 26px;
      height: 26px;
      margin-inline-end: 5px;
    }

    span {
      font-size: 12PX;
      color: #53B493B3;
      margin-inline-start: 3px;
    }
  }
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  color: #8A8A8A;
  line-height: 1.5em;
`;
const ListItem = styled.span`
  display: flex;
  align-items: center;

  svg {
    margin-inline-end: 5px;
  }
`;
const ChildrenHobbiesList = styled.div`
  display: flex;
  height: 5em;
  border: 1px solid #935ED733;
  border-radius: 20px;
  margin-top: 0.5em;
`;
const ChildrenList = styled.div`
  background-color: #935ED733;
  border: 1px solid transparent;
  border-radius: 19px;

  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }

  div {
    flex: 0 0 auto;
    width: 30%;
  }
`;
const HobbiesList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  overflow-y: auto;
  align-items: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }

  div {
    flex: 0 0 auto;
    height: 1.5em;
    margin-inline-start: 5px;

    display: flex;
    align-items: center;
    
    span {
      font-size: 14px;
    }

    svg {
      width: 14px;
      height: 14px;
      margin-inline-end: 5px;
    }
  }
`;
const FormButtoms = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - 4em);
  padding: 2em 2em;
  display: flex;
  justify-content: center;

  button {
    font-size: 18px;
    padding: 0.5em 1.5em;
  }
`;
const ChildComp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100% !important
`;


const AppliedComp = (props) => {
  return (
    <div style={{height: '100%', padding: '1.5em', textAlign: 'center', color: '#53B493'}}>
      <Header>
        <CloseIcon onClick={props.onClose}/>
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

const Child = (props) => {
  let {child} = props;
  let img = '';

  if (child.age < 3) img = 'child';
  else if (child.isFemale) img = 'girl';
  else img = 'boy';

  return (
    <div>
      <ChildComp>
        <div><img src={window.location.origin + '/images/icons8_' + img + '_96px.png'} /></div>
        <div>{child.age}</div>
      </ChildComp>
    </div>
  )
}

const Tasks = (props) => {
  return (
    <div style={{width: '100%', marginBottom: '1em'}}>
      <span>{`בנוסף, ישנן ${props.tasks.length} מטלות לבצע`}</span>
      <List>
        {props.tasks.map(task => {
          return (<ListItem><FiCheckCircle />{task}</ListItem>)
        })}
      </List>
    </div>
  )
}

const Notes = (props) => {
  return (
    <div style={{width: '100%'}}>
      <span>הערות נוספות</span>
      <List>
        <ListItem>{props.notes}</ListItem>
      </List>
    </div>
  )
}

const SessionDetails = (props) => {
  console.log(props.session);
  const firstName = _.get(props, 'session.doctor_o[0].firstName');
  const lastName = _.get(props, 'session.doctor_o[0].lastName');
  const header = _.join([firstName, lastName, 'צריכ/ה את עזרתך!'], ' ');

  const startTime = moment(_.get(props, 'session.startTime'));
  const endTime = moment(_.get(props, 'session.endTime'));

  const date = startTime.format("DD-MM-YY");
  const sessionHours = endTime.format("H:mm") + ' - ' + startTime.format("H:mm")

  const addr = _.get(props, 'session.doctor_o[0].address');
  const addressArr = addr.split(',')
  const address = _.join([addressArr[0], addressArr[1]], ', ').replace(/[0-9]/g, '');

  const tasks = _.get(props.session, 'tasks');
  const notes = _.get(props.session, 'notes');

  return (
    <SessionDetailsComp>
      <FormHeader>
        <span>{header}</span>
        <CloseIcon onClick={props.onClose}/>
      </FormHeader>
      <FormRow style={{height: '100px'}}>
        <label>אז מה חשוב לדעת לפני?</label>
        <Basic>
          <div style={{width: '50%'}}>
            <EventIcon />
            {date}
          </div>
          <div style={{width: '50%'}}>
            <FaRegClock />
            {sessionHours}
          </div>
          <div style={{width: '100%', flexWrap: 'wrap', lineHeight: '1em'}}>
            <TiLocationOutline />
            {address}
            <span>*כתובת מדוייקת תתקבל בתיאום טלפוני</span>
          </div>
        </Basic>
      </FormRow>
      <FormRow>
        <label>איך אפשר לעזור?</label>
        <div>
          <div style={{width: '100%', marginBottom: '1em'}}>
            <span>{`משפחה זו צריכה עזרה לשמור על ${_.get(props, 'session._childrenCount')} ילדים`}</span>
            <ChildrenHobbiesList>
              <ChildrenList style={{width: '50%'}}>
                {_.get(props, 'session.doctor_o[0].children').map(child => {
                  return (<Child child={child} />)
                })}
              </ChildrenList>
              <HobbiesList style={{width: '50%'}}>
                {_.get(props, 'session.doctor_o[0].hobbies').map(hobby => {
                  return (<div><FaHeart /><span>{hobby}</span></div>)
                })}
              </HobbiesList>
            </ChildrenHobbiesList>
          </div>
          { tasks.length > 0 ? <Tasks  tasks={tasks}/> : ''}
          { notes > 0 ? <Notes  notes={notes}/> : ''}
        </div>
      </FormRow>
      <FormButtoms>
        <Button onClick={props.handleApply} variant="contained" color="primary">אשר את ההתנדבות</Button>
      </FormButtoms>
    </SessionDetailsComp>
  )
}

export const SessionDetailsModal = (props) => {
  const [isApplied, setIsApplied] = useState(false);

  const applyCallback = () => {
    setIsApplied(true);
  }

  const handleApply = (event) => {
    props.onApply(props.session, applyCallback);
  }

  return (
    <Fragment>
      {isApplied ? <AppliedComp {...props}/> : <SessionDetails {...props} handleApply={handleApply}/>}
    </Fragment>
  )
}