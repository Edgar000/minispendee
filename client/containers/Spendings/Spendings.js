import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {SpendingItem} from '../../components/SpendingItem/SpendingItem';
import './Spendings.scss';

export class Spendings extends Component {
    state = {
        isCategoryExist: false,
        spendings: [],
        inputValue: '',
        inputSumValue: '',
        inputDateValue: '',
        isAdding: false
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

    toggleAdding = () => {
        this.setState({
            inputValue: '',
            inputSumValue: '',
            inputDateValue: '',
            isAdding: !this.state.isAdding

        });
    };

    addSpending = () => {
        if (!this.state.inputValue || !this.state.inputSumValue || !this.state.inputDateValue) return;
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
        if (description) spendings[i].description = description;
        if (sum) spendings[i].sum = sum;
        if (date) spendings[i].date = date;
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
            <div className="spendings">
                <div className="spendings_info">
                    <NavLink to="/" className="spendings_info_back">
                        <i className="fa fa-arrow-left"/>
                        <span>back to categories</span>
                    </NavLink>
                    <div className="spendings_info_name">
                        <span>{this.props.match.params.name}</span>
                    </div>
                    <NavLink to={'/' + this.props.match.params.name + '/chart'} className="spendings_info_chart">
                        <span>view chart</span>
                        <i className="fa fa-line-chart"/>
                    </NavLink>
                </div>

                <div className="spendings_add">
                    {!this.state.isAdding ?
                        <div className="spendings_add_inactive">
                            <i className="fa fa-plus-square-o" onClick={this.toggleAdding}/>
                            <span onClick={this.toggleAdding}>add new spending</span>
                        </div> :
                        <div className="spendings_add_active">
                            <div>
                                <span>description</span>
                                <input type="text" onChange={this.setInputValue}/>
                            </div>
                            <div>
                                <span>sum</span>
                                <input type="number" onChange={this.setInputSumValue}/>
                            </div>
                            <div>
                                <span>date</span>
                                <input type="date" onChange={this.setInputDateValue}/>
                            </div>
                            <div className="spendings_add_active_buttons">
                                <i className="fa fa-check-square-o"
                                   onClick={() => {
                                       this.addSpending();
                                       this.toggleAdding();
                                   }}/>
                                <i className="fa fa-undo" onClick={this.toggleAdding}/>
                            </div>
                        </div>
                    }
                </div>

                <div className="spendings_list">
                    {spendings}
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        if (this.state.isCategoryExist) {
            localStorage.setItem(this.props.match.params.name, JSON.stringify(this.state.spendings));
        }
    };
}
