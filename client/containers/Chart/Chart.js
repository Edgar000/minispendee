import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {LineChart} from 'react-d3';

export class Chart extends Component {
    state = {
        spendings: []
    };

    componentWillMount() {
        this.setState({spendings: JSON.parse(localStorage.getItem(this.props.match.params.name))})
    }

    render() {
        const spendingsData = [{x: 0, y: 0}];
        this.state.spendings.reduce((previousValue, spending) => {
            let count = 1;
            if (+spending.date !== previousValue.date) {
                spendingsData.push({
                    x: +spending.date,
                    y: +spending.sum + previousValue.sum,
                });
                count += 1;
            } else {
                spendingsData[count].y += +spending.sum;
            }
            return {date: +spending.date, sum: +spending.sum + previousValue.sum};
        }, {date: 0, sum: 0});

        const lineData = [
            {
                name: this.props.match.params.name,
                values: spendingsData,
                strokeWidth: 3,
                strokeDashArray: "5,5",
            }
        ];

        return (
            <div>
                <LineChart
                    legend={true}
                    data={lineData}
                    width='100%'
                    height={400}
                    viewBoxObject={{
                        x: 0,
                        y: 0,
                        width: 500,
                        height: 400
                    }}
                    yAxisLabel="Money spent"
                    xAxisLabel="Date"
                    gridHorizontal={true}
                />
                <Link to={'/' + this.props.match.params.name}>
                    <button type="button">Back</button>
                </Link>
                <Link to="/">
                    <button type="button">Home</button>
                </Link>
            </div>

        );
    }
}
