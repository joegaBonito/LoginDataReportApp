import React from 'react';
const moment = require('moment-timezone');
var c3;
if (typeof window !== 'undefined') {
require("d3");
c3 = require('c3');
};
require('../public/c3.css');
require('../public/resources/app.css');
import axios from 'axios';
const url = 'http://localhost:8090/api/sprint/getLoginDataOutputList';

export default class Sprint extends React.Component {

    componentDidMount() {
        axios.get(url).then(response => {
            //console.log(response.data);
            this.user_login_data = response.data;
            this.weekday = ["Weekdays", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            this.sun_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.mon_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.tues_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.wed_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.thurs_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.fri_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.sat_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.hoursRep = ["0 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm"
                , "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"];
            this.dataInNYTime = [];
            this.ySprint = ["Users", 0, 0, 0, 0, 0, 0, 0];
            this.total_cts = 0;
            this.calculate();
        }).catch(err => console.log(err));
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.startdatepropval !== this.props.startdatepropval) || (prevProps.enddatepropval !== this.props.enddatepropval)) {
            console.log("PrevProps " + prevProps.startdatepropval + prevProps.enddatepropval);
            console.log("this.props: " + this.props.startdatepropval + this.props.enddatepropval);
            axios.get(url).then(response => {
                this.user_login_data = response.data;
                this.weekday = ["Weekdays", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                this.sun_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.mon_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.tues_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.wed_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.thurs_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.fri_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.sat_hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.hoursRep = ["0 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm"
                    , "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"];
                this.dataInNYTime = [];
                this.ySprint = ["Users", 0, 0, 0, 0, 0, 0, 0];
                this.total_cts = 0;
                this.calculate();
            }).catch(err => console.log(err));
        }
    }

    weekdayCalc = (datetimestampdata) => {
        let newyork = moment(datetimestampdata).subtract(14,'hours'); //13 hours with no datelight savings.
        //console.log("Korean time: " + korea.format("YYYYMMDD hh:mm:ss a"));
        //console.log("New York time: " + newyork.format("YYYYMMDD hh:mm:ss a"));
        //console.log(newyork.format("dddd"));
        this.dataInNYTime.push(newyork);
        //console.log(newyork.format("dddd"));
    }

    calculate = () => {
        for (let i = 0; i < this.user_login_data.length; i++) {
            this.weekdayCalc(this.user_login_data[i].loginTime);
            //if(this.dataInNYTime[i].format("YYYY-MM-DD") == "2018-10-22") console.log(this.dataInNYTime[i].format("YYYY-MM-DD hh:mm:ss a"));
        }
        
        for (let i = 0; i < this.dataInNYTime.length; i++) {
            // console.log(this.dataInNYTime[i].format("YYYY-MM-DD"));
            // console.log(this.state.startdatepropval);
            // console.log(this.state.enddatepropval);
            if (this.dataInNYTime[i].format("YYYY-MM-DD") >= this.props.startdatepropval && this.dataInNYTime[i].format("YYYY-MM-DD") <= this.props.enddatepropval) {
                    //console.log(this.dataInNYTime[i].format("hh:mm:ss a"));
                    //console.log(this.dataInNYTime[i].format("dddd"));
                    //console.log(this.dataInNYTime[i].format("YYYY-MM-DD hh:mm:ss a"));  
                    if (this.dataInNYTime[i].format("dddd") == "Sunday") this.ifSunday(i);
                    else if (this.dataInNYTime[i].format("dddd") == "Monday") this.ifMonday(i);
                    else if (this.dataInNYTime[i].format("dddd") == "Tuesday") this.ifTuesday(i);
                    else if (this.dataInNYTime[i].format("dddd") == "Wednesday") this.ifWednesday(i);
                    else if (this.dataInNYTime[i].format("dddd") == "Thursday") this.ifThursday(i);
                    else if (this.dataInNYTime[i].format("dddd") == "Friday") this.ifFriday(i);
                    else if (this.dataInNYTime[i].format("dddd") == "Saturday") this.ifSaturday(i);
            }
        }

        for (let j = 0; j < this.weekday.length; j++) {
            this.total_cts = 0;
            //console.log("Day: " + this.weekday[j]);
            for (let i = 0; i < 24; i++) {
                if (this.weekday[j] == "Sunday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.sun_hours[i]);
                    this.total_cts += this.sun_hours[i];
                }
                else if (this.weekday[j] == "Monday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.mon_hours[i]);
                    this.total_cts += this.mon_hours[i];
                }
                else if (this.weekday[j] == "Tuesday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.tues_hours[i]);
                    this.total_cts += this.tues_hours[i];
                }
                else if (this.weekday[j] == "Wednesday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.wed_hours[i]);
                    this.total_cts += this.wed_hours[i];
                }
                else if (this.weekday[j] == "Thursday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.thurs_hours[i]);
                    this.total_cts += this.thurs_hours[i];
                }
                else if (this.weekday[j] == "Friday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.fri_hours[i]);
                    this.total_cts += this.fri_hours[i];
                }
                else if (this.weekday[j] == "Saturday") {
                    //console.log(this.hoursRep[i] + ": logged in users? " + this.sat_hours[i]);
                    this.total_cts += this.sat_hours[i];
                }

            }
            //console.log("Total User Counts: " + this.total_cts + "\n");
        }
        let countTime = 0;
        for (let i = 0; i < this.user_login_data.length; i++) {
            let korea = moment.tz(this.user_login_data[i].loginTime, "Asia/Seoul");
            let newyork = korea.clone().tz("America/New_York");

            if (korea.format("hh a") == "01 pm")
                countTime += this.user_login_data[i].count;
        }
        //console.log("Counts by time to see if numbers add up correctly: " + countTime);


        for (let i = 0; i < this.user_login_data.length; i++) {
            if (this.dataInNYTime[i].format("YYYY-MM-DD") >= this.props.startdatepropval && this.dataInNYTime[i].format("YYYY-MM-DD") <= this.props.enddatepropval) {
                if (this.dataInNYTime[i].format("dddd") == this.weekday[1])
                    this.ySprint[1] += this.user_login_data[i].count;
                else if (this.dataInNYTime[i].format("dddd") == this.weekday[2])
                    this.ySprint[2] += this.user_login_data[i].count;
                else if (this.dataInNYTime[i].format("dddd") == this.weekday[3])
                    this.ySprint[3] += this.user_login_data[i].count;
                else if (this.dataInNYTime[i].format("dddd") == this.weekday[4])
                    this.ySprint[4] += this.user_login_data[i].count;
                else if (this.dataInNYTime[i].format("dddd") == this.weekday[5])
                    this.ySprint[5] += this.user_login_data[i].count;
                else if (this.dataInNYTime[i].format("dddd") == this.weekday[6])
                    this.ySprint[6] += this.user_login_data[i].count;
                else if (this.dataInNYTime[i].format("dddd") == this.weekday[7])
                    this.ySprint[7] += this.user_login_data[i].count;
            }
        }

        this.chart_sprint = c3.generate({
            bindto: '#chart_sprint',
            data: {
                columns: [
                    this.ySprint
                ]
            },
            axis: {
                x: {
                    type: 'category',
                    categories: [this.weekday[1], this.weekday[2], this.weekday[3], this.weekday[4], this.weekday[5], this.weekday[6], this.weekday[7]]
                }
            }
        });

        this.sun_hours.unshift("Sunday");
        this.mon_hours.unshift("Monday");
        this.tues_hours.unshift("Tuesday");
        this.wed_hours.unshift("Wednesday");
        this.thurs_hours.unshift("Thursday");
        this.fri_hours.unshift("Friday");
        this.sat_hours.unshift("Saturday");
        this.hours_sprint = c3.generate({
            bindto: '#hours_sprint',
            data: {
                columns: [
                    this.sun_hours,
                    this.mon_hours,
                    this.tues_hours,
                    this.wed_hours,
                    this.thurs_hours,
                    this.fri_hours,
                    this.sat_hours
                ]
            },
            axis: {
                x: {
                    type: 'category',
                    categories: ["0 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm"
                        , "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"]
                }
            }
        });
    }
    

    ifSunday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.sun_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.sun_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.sun_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.sun_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.sun_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.sun_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.sun_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.sun_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.sun_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.sun_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.sun_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.sun_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.sun_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.sun_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.sun_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.sun_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.sun_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.sun_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.sun_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.sun_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.sun_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.sun_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.sun_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.sun_hours[23] += count
    };

    ifMonday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.mon_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.mon_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.mon_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.mon_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.mon_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.mon_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.mon_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.mon_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.mon_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.mon_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.mon_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.mon_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.mon_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.mon_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.mon_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.mon_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.mon_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.mon_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.mon_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.mon_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.mon_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.mon_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.mon_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.mon_hours[23] += count
    };

    ifTuesday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.tues_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.tues_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.tues_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.tues_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.tues_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.tues_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.tues_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.tues_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.tues_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.tues_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.tues_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.tues_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.tues_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.tues_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.tues_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.tues_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.tues_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.tues_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.tues_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.tues_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.tues_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.tues_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.tues_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.tues_hours[23] += count
    };

    ifWednesday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.wed_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.wed_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.wed_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.wed_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.wed_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.wed_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.wed_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.wed_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.wed_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.wed_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.wed_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.wed_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.wed_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.wed_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.wed_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.wed_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.wed_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.wed_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.wed_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.wed_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.wed_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.wed_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.wed_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.wed_hours[23] += count
    };

    ifThursday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.thurs_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.thurs_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.thurs_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.thurs_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.thurs_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.thurs_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.thurs_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.thurs_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.thurs_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.thurs_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.thurs_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.thurs_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.thurs_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.thurs_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.thurs_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.thurs_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.thurs_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.thurs_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.thurs_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.thurs_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.thurs_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.thurs_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.thurs_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.thurs_hours[23] += count
    };

    ifFriday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.fri_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.fri_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.fri_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.fri_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.fri_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.fri_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.fri_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.fri_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.fri_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.fri_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.fri_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.fri_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.fri_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.fri_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.fri_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.fri_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.fri_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.fri_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.fri_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.fri_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.fri_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.fri_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.fri_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.fri_hours[23] += count
    };

    ifSaturday = (i) => {
        let count = this.user_login_data[i].count;
        if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 am")
            this.sat_hours[0] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 am")
            this.sat_hours[1] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 am")
            this.sat_hours[2] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 am")
            this.sat_hours[3] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 am")
            this.sat_hours[4] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 am")
            this.sat_hours[5] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 am")
            this.sat_hours[6] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 am")
            this.sat_hours[7] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 am")
            this.sat_hours[8] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 am")
            this.sat_hours[9] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 am")
            this.sat_hours[10] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 am")
            this.sat_hours[11] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "12:00:00 pm")
            this.sat_hours[12] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "01:00:00 pm")
            this.sat_hours[13] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "02:00:00 pm")
            this.sat_hours[14] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "03:00:00 pm")
            this.sat_hours[15] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "04:00:00 pm")
            this.sat_hours[16] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "05:00:00 pm")
            this.sat_hours[17] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "06:00:00 pm")
            this.sat_hours[18] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "07:00:00 pm")
            this.sat_hours[19] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "08:00:00 pm")
            this.sat_hours[20] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "09:00:00 pm")
            this.sat_hours[21] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "10:00:00 pm")
            this.sat_hours[22] += count
        else if (this.dataInNYTime[i].format("hh:mm:ss a") == "11:00:00 pm")
            this.sat_hours[23] += count
    };

    renderOnScreen = () => {
        if (this.props.startdatepropval == null || this.props.enddatepropval == null) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h2>{'From: '}{this.props.startdatepropval}{' To: '}{this.props.enddatepropval}</h2>
                    <h2>Sprint (Users vs Weekdays)</h2>
                    <div id="chart_sprint"></div>
                    <br /> <br />
                    <h2>Sprint (Users vs Hours)</h2>
                    <div id="hours_sprint"></div>
                    <br /><br />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderOnScreen()}
            </div>
        )
    }
}