
import React from 'react';
import Sprint from './sprint.jsx';
import Verizon from './verizon.jsx';
import { Button } from 'reactstrap';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sprint_trueORfalse: false,
            verizon_trueORfalse: false,
            startdateval: '',
            enddateval: '',
            startdatepropval: '',
            enddatepropval: ''
        }
    }

    sprintButtonfunc =()=> {
        this.setState({
            sprint_trueORfalse: true,
            verizon_trueORfalse: false
        });
        
    }

    verizonButtonfunc =()=>{
        this.setState({
            verizon_trueORfalse: true,
            sprint_trueORfalse: false
        });
       
    }

    handleChangeStartDate =(event)=> {
        this.setState({ startdateval: event.target.value });
    }

    handleChangeEndDate=(event)=> {
        this.setState({ enddateval: event.target.value });
    }


    handleSubmit=(e)=> {
        this.setState({
            startdatepropval: this.state.startdateval,
            enddatepropval:this.state.enddateval
        });
        e.preventDefault();
    }

    renderOnScreenSprint = () => {
        if (this.state.startdatepropval == '' || this.state.enddatepropval == '') {
            return <div>Loading...</div>;
        } else {
           return <Sprint startdatepropval={this.state.startdatepropval} enddatepropval={this.state.enddatepropval} />;
        }
    }

    renderOnScreenVerizon = () => {
        if (this.state.startdatepropval == '' || this.state.enddatepropval == '') {
            return <div>Loading...</div>;
        } else {
            return <Verizon startdatepropval={this.state.startdatepropval} enddatepropval={this.state.enddatepropval} />;
        }
    }

    render() {
        return (
            <div>
                <h1 className="h1class">SPMS User Traffic Report</h1>

                <form onSubmit={this.handleSubmit}>
                    <label>
                        Start Date:
                        <input type="date" value={this.state.value} onChange={this.handleChangeStartDate} required />{' '}
                    </label>
                    <label>
                        End Date:
                        <input type="date" value={this.state.value} onChange={this.handleChangeEndDate} required />{' '}
                    </label>
                    <Button type="submit" color="primary" disabled={this.state.startdateval == '' || this.state.enddateval == ''} onClick={this.sprintButtonfunc}>Sprint</Button>{' '}
                    <Button type="submit" color="secondary" disabled={this.state.startdateval == '' || this.state.enddateval == ''} onClick={this.verizonButtonfunc}>Verizon</Button>{' '}
                </form>
                {this.state.sprint_trueORfalse && this.renderOnScreenSprint()}
                {this.state.verizon_trueORfalse && this.renderOnScreenVerizon()}
            </div>
        )
    }
}