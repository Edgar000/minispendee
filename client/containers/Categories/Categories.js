import React, {Component} from 'react';
import {CategoryItem} from '../../components/CategotyItem/CategoryItem';

export class Categories extends Component {
    state = {
        categories: [],
        inputValue: ''
    };

    setInputValue = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };

    addCategory = () => {
        const categories = this.state.categories;
        categories.push({id: Date.now(), name: this.state.inputValue});
        localStorage.setItem(this.state.inputValue, '[]');
        this.setState({categories: categories});
    };

    editCategory = (category, name) => {
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
            <div>
                <input type="text" onChange={this.setInputValue}/>
                <button type="button" onClick={this.addCategory}>Add Category</button>
                {categories}
            </div>
        );
    }

    componentDidUpdate() {
        localStorage.setItem('categories', JSON.stringify(this.state.categories));
    };
}
