import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {SpendingItem} from '../../components/SpendingItem/SpendingItem';

export class Spendings extends Component {
    state = {
        isCategoryExist: false,
        spendings: [],
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

    addSpending = () => {
        const spendings = this.state.spendings;
        spendings.push({
            id: Date.now(),
            description: this.state.inputValue,
            sum: this.state.inputSumValue,
            date: this.state.inputDateValue
        });
        this.setState({spendings: spendings});
    };

    editSpending = (spending, description, sum, date) => {
        const spendings = this.state.spendings;
        const i = spendings.indexOf(spending);
        spendings[i].description = description;
        spendings[i].sum = sum;
        spendings[i].date = date;
        this.setState({spendings: spendings});
    };

    deleteSpending = (spending) => {
        const spendings = this.state.spendings;
        const i = spendings.indexOf(spending);
        spendings.splice(i, 1);
        this.setState({spendings: spendings});
    };

    componentDidMount() {
        localStorage.getItem(this.props.match.params.name) ?
            this.setState({
                isCategoryExist: true,
                spendings: JSON.parse(localStorage.getItem(this.props.match.params.name))
            }) :
            this.setState({isCategoryExist: false})
    }

    render() {
        if (!this.state.isCategoryExist) {
            return (
                <div>
                    Not found
                </div>
            )
        }

        const spendings = this.state.spendings.map((spending) => {
            return (
                <SpendingItem
                    spending={spending}
                    editSpending={this.editSpending}
                    deleteSpending={this.deleteSpending}
                    key={spending.id}/>
            );
        });

        return (
            <div>
                {this.props.match.params.name}
                <Link to={'/' + this.props.match.params.name + '/chart'}>
                    <button type="button">Chart</button>
                </Link>
                <div>
                    description
                    <input type="text" onChange={this.setInputValue}/>
                    sum
                    <input type="text" onChange={this.setInputSumValue}/>
                    date
                    <input type="text" onChange={this.setInputDateValue}/>
                    <button type="button" onClick={this.addSpending}>Add Spending</button>
                </div>
                {spendings}
                <Link to="/">
                    <button type="button">Back</button>
                </Link>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.state.isCategoryExist) {
            localStorage.setItem(this.props.match.params.name, JSON.stringify(this.state.spendings));
        }
    };
}
