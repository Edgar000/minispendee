import React, {Component} from 'react';
import {CategoryItem} from '../../components/CategotyItem/CategoryItem';
import './Categories.scss';

export class Categories extends Component {
    state = {
        categories: [],
        inputValue: '',
        isAdding: false
    };

    setInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    toggleAdding = () => {
        this.setState({
            inputValue: '',
            isAdding: !this.state.isAdding

        });
    };

    addCategory = () => {
        if (!this.state.inputValue) return;
        const categories = this.state.categories;
        categories.push({id: Date.now(), name: this.state.inputValue});
        localStorage.setItem(this.state.inputValue, '[]');
        this.setState({categories: categories});
    };

    editCategory = (category, name) => {
        if (!name) return;
        const categories = this.state.categories;
        const i = categories.indexOf(category);
        localStorage.setItem(name, localStorage.getItem(category.name));
        localStorage.removeItem(category.name);
        categories[i].name = name;
        this.setState({categories: categories});
    };

    deleteCategory = (category) => {
        const categories = this.state.categories;
        const i = categories.indexOf(category);
        categories.splice(i, 1);
        localStorage.removeItem(category.name);
        this.setState({categories: categories});
    };

    componentDidMount() {
        if (localStorage.getItem('categories')) {
            this.setState({categories: JSON.parse(localStorage.getItem('categories'))});
        }
    }

    render() {
        const categories = this.state.categories.map((category) => {
            return (
                <CategoryItem
                    category={category}
                    deleteCategory={this.deleteCategory}
                    editCategory={this.editCategory}
                    key={category.id}/>
            );
        });

        return (
            <div className="categories">
                <div className="categories_add">
                    {!this.state.isAdding ?
                        <div className="categories_add_inactive">
                            <i className="fa fa-plus-square-o" onClick={this.toggleAdding}/>
                            <span onClick={this.toggleAdding}>add new category</span>
                        </div> :
                        <div className="categories_add_active">
                            <input type="text" onChange={this.setInputValue}/>
                            <i className="fa fa-check-square-o"
                               onClick={() => {
                                   this.addCategory();
                                   this.toggleAdding();
                               }}/>
                            <i className="fa fa-undo" onClick={this.toggleAdding}/>
                        </div>
                    }
                </div>

                <div className="categories_list">
                    {categories}
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        localStorage.setItem('categories', JSON.stringify(this.state.categories));
    };
}
