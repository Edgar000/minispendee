import React, {Component} from 'react';

export class SpendingItem extends Component {
    state = {
        inputValue: '',
        inputSumValue: '',
        inputDateValue: ''
    };

    setInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    setInputSumValue = (event) => {
        this.setState({
            inputSumValue: event.target.value
        });
    };

    setInputDateValue = (event) => {
        this.setState({
            inputDateValue: event.target.value
        });
    };

    render() {
        const {spending, editSpending, deleteSpending} = this.props;

        return (
            <div>
                {spending.description}
                {spending.sum}
                {spending.date}
                <input type="text" onChange={this.setInputValue}/>
                <input type="text" onChange={this.setInputSumValue}/>
                <input type="text" onChange={this.setInputDateValue}/>
                <button type="button" onClick={() => editSpending(
                    spending,
                    this.state.inputValue,
                    this.state.inputSumValue,
                    this.state.inputDateValue
                )}>Edit
                </button>
                <button type="button" onClick={() => deleteSpending(spending)}>Delete</button>
            </div>
        );
    }
}
