import React from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';


import {days,callToNextmonthClick ,callToPreviousMonthClick} from '../calendar/hebrew-date';
import ControlCalendar from './ControlCalendar.js';
import DaysResualt from './DaysResualt'; 
import  Citis from './Citis'; 
import {addDays}  from '../actions/days.js';
import AcordingTtoButtons from './AcordingToButtons';
import HaflagaTime from './HaflagaTime';
import SuspiciousDayTime from './SuspiciousDayTime';





class CalendarPage extends React.Component{
       constructor(props){
           super(props);

           this.state={
            suspiciousDay: [],
               length: props.days.length,
               citi: undefined,
               dayTime: undefined,
               applay: false,
               startDay: false,
               endDay: false ,
               startDayShow: '',
               endDayShow: ''              
           };
        //    const { dispatch } = props;
        //    this.boundActions = bindActionCreators(actions, dispatch);
       };  
       onCheckClik = (suspiciousDay) => {
          this.props.dispatch(addDays(suspiciousDay.finalDay));
          axios.post('/days/guest',{body:suspiciousDay.finalDay}).then((response) => {
            console.log(response);
        }).catch((e) => {
            console.log(e);
        });

          this.setState(() => {
            this.state.suspiciousDay.push(suspiciousDay);     
          })
       };
       getCitiName = (citi) => {
           this.setState(() => ({ citi }))
       }
       haflagaArea = (applay) => {
      this.setState(() => ({ applay }))
       };
       getDaysHaflaga = (day) => {
            if(!this.state.startDay){
                const startDayShow = `${day.month_name} ${day.date}`;
                this.setState(() => ({startDay:day,startDayShow}));
            }else if(!this.state.endDay) {
                const endDayShow = `${day.month_name} ${day.date}`;
                this.setState(() => ({endDay:day,endDayShow}));

            }
       };
       getDayTime = (dayTime) => {
          this.setState(() => ({ dayTime }))
       }
     render(){
        return(
            <div>
            <Citis callbBacktoSelectCiti={(citi) => this.getCitiName(citi)} />
            <SuspiciousDayTime callBackToParent={(dayTime) => this.getDayTime(dayTime)} />
            <AcordingTtoButtons callBackToParent={(applay) => this.haflagaArea(applay)} sendApply={this.state.applay} />
            {this.state.applay && <HaflagaTime sendStartDay={this.state.startDayShow} sendEndDay={this.state.endDayShow} />}
            <ControlCalendar callBackToParent={(suspiciousDay) => this.onCheckClik(suspiciousDay)} 
            sendCiti={this.state.citi}
            sendApplay={this.state.applay}
            callToApplayDaysHaflaga={(day) => this.getDaysHaflaga(day)}
            sendStartDay={this.startDay}
            sendDayTime={this.state.dayTime}
            />
            {this.state.suspiciousDay.length > 0 && <DaysResualt /> } 
         
            </div>
        )
    }
}

const mapStateToProps = (state,props) => {
    return {
        days   : state.days
      }
} 

export default connect(mapStateToProps)(CalendarPage);