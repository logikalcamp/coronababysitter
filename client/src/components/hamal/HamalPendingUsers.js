import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import GridComp from '../Grid';
import {BASE_URL} from '../../constants'
import Axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SchoolIcon from '@material-ui/icons/School';
import * as DateUtils from '../../utils/dateUtils';
import DotLoader from "react-spinners/DotLoader";

const styles = makeStyles(theme => ({}));

export const HamalPendingUsers = (props) => {
    const classes = styles();

    return (
        <Container>
            <ContainerHeader>
                משתמשים הממתינים לאישור
            </ContainerHeader>
            <ContainerContent>

            </ContainerContent>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    padding: 15px 50px 50px 50px;
    display:flex;
    flex-direction:column;
`

const ContainerHeader = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    font-size: 34px;
    height: 15%;
`

const ContainerContent = styled.div`
    display:flex;
    justify-content:flex-start;
    height: 85%;
    width: 100%;
`