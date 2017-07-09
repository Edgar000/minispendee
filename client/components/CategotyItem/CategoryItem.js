import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './CategoryItem.scss';

export class CategoryItem extends Component {
    state = {
        inputValue: '',
        isEditing: false
    };

    setInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    toggleEditing = () => {
        this.setState({
            inputValue: '',
            isEditing: !this.state.isEditing
        });
    };

    render() {
        const {category, editCategory, deleteCategory} = this.props;

        return (
            <div className="category-item">
                {!this.state.isEditing ?
                    <div className="category-item_info">
                        <NavLink className="category-item_info_name" to={'/' + category.name}>
                            <span >{category.name}</span>
                        </NavLink>
                        <NavLink className="category-item_info_chart" to={'/' + category.name + '/chart'}>
                            <i className="fa fa-line-chart"/>
                        </NavLink>
                    </div> :
                    <div className="category-item_new-name">
                        <input type="text" onChange={this.setInputValue}/>
                        <div className="category-item_new-name_save">
                            <i className="fa fa-check-square-o"
                               onClick={() => {
                                   editCategory(category, this.state.inputValue);
                                   this.toggleEditing();
                               }}/>
                        </div>
                    </div>
                }
                <div className="category-item_change">
                    <div className="category-item_change_edit">
                        <i className="fa fa-pencil-square-o" onClick={this.toggleEditing}/>
                    </div>
                    <div className="category-item_change_delete">
                        <i className="fa fa-ban" onClick={() => deleteCategory(category)}/>
                    </div>
                </div>
            </div>
        );
    }
}
