import React, {Component} from 'react';
import './SpendingItem.scss';

export class SpendingItem extends Component {
    state = {
        inputValue: '',
        inputSumValue: '',
        inputDateValue: '',
        isDescriptionEditing: false,
        isSumEditing: false,
        isDateEditing: false
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
        console.log(+event.target.value.substr(8));
    };

    toggleEditing = (type) => {
        this.setState({
            inputValue: '',
            inputSumValue: '',
            inputDateValue: ''
        });
        switch (type) {
            case 'description':
                this.setState({
                    isDescriptionEditing: true,
                    isSumEditing: false,
                    isDateEditing: false
                });
                return;
            case 'sum' :
                this.setState({
                    isDescriptionEditing: false,
                    isSumEditing: true,
                    isDateEditing: false
                });
                return;
            case 'date' :
                this.setState({
                    isDescriptionEditing: false,
                    isSumEditing: false,
                    isDateEditing: true
                });
                return;
            default :
                this.setState({
                    isDescriptionEditing: false,
                    isSumEditing: false,
                    isDateEditing: false
                });
                return
        }
    };

    render() {
        const {spending, editSpending, deleteSpending} = this.props;

        return (
            <div className="spending-item">
                <div className="spending-item_info">
                    {!this.state.isDescriptionEditing ?
                        <div className="spending-item_info_description">
                            <span onClick={() => this.toggleEditing('description')}>{spending.description}</span>
                        </div> :
                        <div className="spending-item_info_edit-description">
                            <input type="text" onChange={this.setInputValue}/>
                            <i className="fa fa-check-square-o"
                               onClick={() => {
                                   editSpending(spending, this.state.inputValue);
                                   this.toggleEditing();
                               }}/>
                            <i className="fa fa-undo" onClick={this.toggleEditing}/>
                        </div>
                    }

                    {!this.state.isSumEditing ?
                        <div className="spending-item_info_sum">
                            <span onClick={() => this.toggleEditing('sum')}>
                                {spending.sum > 0 ? '+' + spending.sum + '$' : spending.sum + '$'}
                            </span>
                        </div> :
                        <div className="spending-item_info_edit-sum">
                            <input type="number" onChange={this.setInputSumValue}/>
                            <i className="fa fa-check-square-o"
                               onClick={() => {
                                   editSpending(spending, null, this.state.inputSumValue);
                                   this.toggleEditing();
                               }}/>
                            <i className="fa fa-undo" onClick={this.toggleEditing}/>
                        </div>
                    }

                    {!this.state.isDateEditing ?
                        <div className="spending-item_info_date">
                            <span onClick={() => this.toggleEditing('date')}>{spending.date}</span>
                        </div> :
                        <div className="spending-item_info_edit-date">
                            <input type="date" onChange={this.setInputDateValue}/>
                            <i className="fa fa-check-square-o"
                               onClick={() => {
                                   editSpending(spending, null, null, this.state.inputDateValue);
                                   this.toggleEditing();
                               }}/>
                            <i className="fa fa-undo" onClick={this.toggleEditing}/>
                        </div>
                    }
                </div>

                <div className="spending-item_delete">
                    <i className="fa fa-ban" onClick={() => deleteSpending(spending)}/>
                </div>
            </div>
        );
    }
}
