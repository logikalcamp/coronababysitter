import {BASE_URL} from '../constants';
import axios from "axios";
import _ from 'lodash'


const meetingReducerDefaultState = {
    step:1,
    meetings:[],
    events:[{
        // _id:'',
        idp:'',
        agenda:"another text",
        timeDate:"2019-12-07T16:53:40.365Z",
        attendees:[{email:"aviram7168@gmail.com",show:false},{email:"shayezer@gmail.com",show:false},{email:"logikalcamp@gmail.com",show:false}],
        location:"tel aviv sarona",
        details:[{
            Sagenda:'',
            notes:[{value:''}],
            actions:[{value:'',user:'',deadline:'',done:false,userS:false}],
            files:[],
            filesName:[''],
            actionbutt:false,
            notebutt:false
        }],
        new:true,
        createBy:'',
        viewonly:false,
        AddedTimeStamp:'',
        SummitTimeStamp:'',
        ArchivedTimeStamp:'',
        SharedTimeStamp:''
    }]
};


export default (state = meetingReducerDefaultState,action)=>{
    switch (action.type){
        case 'MERGE_MEETINGS':
            console.log("merging")

            let meetings = [...state.meetings]
            console.log(meetings)
            action.events.map((event)=>{
                // console.log(event.id)
                // console.log(event)
                if(_.find([],{idp:event.idp})){
                    // console.log("what the fuck")
                }
                if(_.find(meetings,{idp:event.idp})){
                    // console.log("entered")
                    // console.log(event.agenda)
                    // console.log(_.find(state.meetings,{idp:event.idp}))
                    // // console.log(meetings[i].agenda)
                    // console.log("bla")
                    let i = meetings.indexOf(_.find(state.meetings,{idp:event.idp}))
                    meetings[i].agenda = event.agenda
                    meetings[i].location = event.location
                    meetings[i].timeDate = event.timeDate
                    meetings[i].endTime = event.endTime
                    // meetings[i].attendees = event.attendees
                }
                else{

                    meetings.push(event)
                }
            })
          
        //    let x =_.sortBy(meetings, [function(o) { return o.timeDate; }]);
           axios
           .post(BASE_URL + '/api/meeting/updateDB',{data:meetings})
           .then(res => {
            //    console.log("updateDB" ,res)
                // let events = res.data.data
                // return _.sortBy(events, [function(o) { return o.timeDate; }]);
           })
           
           return  {
                ...state,
                meetings:meetings
            }
        case "SAVE_ONGO":
            // console.log("saving")
            let meetings1 = [...state.meetings]
            let ii = -1
            if(_.find(meetings1,{idp:action.thi.state.idp})){
                // console.log("yesno")
                ii = meetings1.indexOf(_.find(state.meetings,{idp:action.thi.state.idp}))
                // console.log(ii)
                meetings1[ii]= action.thi.state 
                let arr = [meetings1[ii]]
                axios
                .post(BASE_URL + '/api/updateDB',{data:arr})
                .then(res => {
                    // console.log(res)
                    // console.log("yes")
                }) 
            }
            
            return{
                ...state,
                meetings:meetings1
            }
        case 'SET_TYPE':
            console.log("changed ",action.val)
            return {
                ...state,
                step:action.val
            }
        case 'SET_MEETINGS':
            return{
                ...state,
                meetings:action.val
            }
        case 'SET_EVENTS':
            return{
                ...state,
                events:action.val
            }
        default :
        return state
    }
}


/*

{
        id:'',
        agenda:"some text",
        timeDate:"2019-12-07T16:53:40.365Z",
        attendees:[{email:"aviram7168@gmail.com"},{email:"shayezer@gmail.com"},{email:"logikalcamp@gmail.com"}],
        location:"tel aviv sarona",
        details:[{
            Sagenda:'',
            notes:[{value:''}],
            actions:[{value:''}],
            files:[],
            filesName:['']
        }],
        new:true,
        AddedTimeStamp:'',
        SummitTimeStamp:'',
        ArchivedTimeStamp:'',
        SharedTimeStamp:''
    },{
        id:'',
        agenda:"another text",
        timeDate:"2019-12-07T16:53:40.365Z",
        attendees:[{email:"aviram7168@gmail.com"},{email:"shayezer@gmail.com"},{email:"logikalcamp@gmail.com"}],
        location:"tel aviv sarona",
        details:[{
            Sagenda:'',
            notes:[{value:''}],
            actions:[{value:''}],
            files:[],
            filesName:['']
        }],
        new:true,
        AddedTimeStamp:'',
        SummitTimeStamp:'',
        ArchivedTimeStamp:'',
        SharedTimeStamp:''
    }

    */