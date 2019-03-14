import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalSchedule extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modal: true,
  //     manager_id: 0,
  //     dailyWeeklyMonthly: "daily",
  //     hour: 1,
  //     min: 1,
  //     amPm: "AM",
  //     timeZone: "EST",
  //   };

  //   this.toggle = this.toggle.bind(this);
  // }

  // toggle() {
  //   this.setState(prevState => ({
  //     modal: !prevState.modal
  //   }));
  // }

  onChangeDropDown = event => {
    console.log(event.target.value, event.target.id);
    if (
      event.target.id === "manager_id" ||
      event.target.id === "hour" ||
      event.target.id === "min" 
    ) {
      let number = event.target.value;
      number = Number(number);
      console.log(number);
      this.setState({
        ...this.state,
        [event.target.id]: number
      });
    } else {
      this.setState({
        ...this.state,
        [event.target.id]: event.target.value
      });
    }
  };

  render() {
    return (
      <div className="survey-schedule">
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Schedule</ModalHeader>
          <ModalBody> */}
            {/* <div className="survey-instructions">
                <p className="instruction-p">Set up a schedule for your survey to be sent out!</p>
            </div> */}
            <p>Step 3/4: Schedule a time for your survey to be sent out.</p>
            <div className="survey-inputbox">
                <label className="survey-inputlabel">Recurrence</label>
                <select id="dailyWeeklyMonthly" value={this.props.state.dailyWeeklyMonthly} onChange={this.props.onChangeDropDown}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                </select> 
            </div>
            <div className="survey-inputbox">
                <label className="survey-inputlabel">Hour</label>
                <select id="hour" value={this.props.state.hour} onChange={this.props.onChangeDropDown}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                </select>
            </div>
            <div className="survey-inputbox">
                <label className="survey-inputlabel">Minute</label>
                <select id="min" value={this.props.state.min} onChange={this.props.onChangeDropDown}>
                <option value={0}>00</option>
                <option value={1}>01</option>
                <option value={2}>02</option>
                <option value={3}>03</option>
                <option value={4}>04</option>
                <option value={5}>05</option>
                <option value={6}>06</option>
                <option value={7}>07</option>
                <option value={8}>08</option>
                <option value={9}>09</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
                <option value={13}>13</option>
                <option value={14}>14</option>
                <option value={15}>15</option>
                <option value={16}>16</option>
                <option value={17}>17</option>
                <option value={18}>18</option>
                <option value={19}>19</option>
                <option value={20}>20</option>
                <option value={21}>21</option>
                <option value={22}>22</option>
                <option value={23}>23</option>
                <option value={24}>24</option>
                <option value={25}>25</option>
                <option value={26}>26</option>
                <option value={27}>27</option>
                <option value={28}>28</option>
                <option value={29}>29</option>
                <option value={30}>30</option>
                <option value={31}>31</option>
                <option value={32}>32</option>
                <option value={33}>33</option>
                <option value={34}>34</option>
                <option value={35}>35</option>
                <option value={36}>36</option>
                <option value={37}>37</option>
                <option value={38}>38</option>
                <option value={39}>39</option>
                <option value={40}>40</option>
                <option value={41}>41</option>
                <option value={42}>42</option>
                <option value={43}>43</option>
                <option value={44}>44</option>
                <option value={45}>45</option>
                <option value={46}>46</option>
                <option value={47}>47</option>
                <option value={48}>48</option>
                <option value={49}>49</option>
                <option value={50}>50</option>
                <option value={51}>51</option>
                <option value={52}>52</option>
                <option value={53}>53</option>
                <option value={54}>54</option>
                <option value={55}>55</option>
                <option value={56}>56</option>
                <option value={57}>57</option>
                <option value={58}>58</option>
                <option value={59}>59</option>
                </select>
            </div>
            <div className="survey-inputbox">
                <label className="survey-inputlabel">Period</label>
                <select id="amPm" value={this.props.state.amPm} onChange={this.props.onChangeDropDown}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
                </select>
            </div>
            <div className="survey-inputbox">
                <label className="survey-inputlabel">Time Zone</label>
                <select id="timeZone" value={this.props.state.timeZone} onChange={this.props.onChangeDropDown}>
                <option value="EST">est</option>
                <option value="PST">pst</option>
                </select>
            </div>
          {/* </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Return</Button>{' '}
          </ModalFooter>
        </Modal> */}
      </div>
    );
  }
}

export default ModalSchedule;
