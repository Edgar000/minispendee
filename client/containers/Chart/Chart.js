import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {LineChart} from 'react-d3';
import './Chart.scss';

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
            let dateNumber = +spending.date.substr(8);
            if (dateNumber !== previousValue.date) {
                spendingsData.push({
                    x: dateNumber,
                    y: +spending.sum + previousValue.sum,
                });
                count += 1;
            } else {
                spendingsData[count].y += +spending.sum;
            }
            return {date:dateNumber, sum: +spending.sum + previousValue.sum};
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
            <div className="chart">
                <div className="chart_info">
                    <Link to={'/' + this.props.match.params.name} className="chart_info_back">
                        <i className="fa fa-arrow-left"/>
                        <span>back to spendings</span>
                    </Link>
                    <div className="chart_info_name">
                        <span>{this.props.match.params.name}</span>
                    </div>
                    <Link to="/" className="chart_info_home">
                        <span>back to categories</span>
                        <i className="fa fa-list-ul"/>
                    </Link>
                </div>

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
            </div>
        );
    }
}
