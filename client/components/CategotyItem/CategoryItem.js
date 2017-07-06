import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class CategoryItem extends Component {
    state = {
        inputValue: ''
    };

    setInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    render() {
        const {category, editCategory, deleteCategory} = this.props;

        return (
            <div>
                <Link to={'/' + category.name}>
                    <button type="button">{category.name}</button>
                </Link>
                <Link to={'/' + category.name + '/chart'}>
                    <button type="button">Chart</button>
                </Link>
                <input type="text" onChange={this.setInputValue}/>
                <button type="button" onClick={() => editCategory(category, this.state.inputValue)}>Edit</button>
                <button type="button" onClick={() => deleteCategory(category)}>Delete</button>
            </div>
        );
    }
}
