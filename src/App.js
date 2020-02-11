// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';

import { ColumnChart } from '@gooddata/react-components';
import Dropdown from './Dropdown';
import { DATE_ATTRIBUTE_IN_MONTHS, GROSS_PROFIT_MEASURE, DATE_ATTRIBUTE, PROJECT_ID } from './envConstants';

const MONTH_LIST = [{
    value: 1,
    name: 'January'
}, {
    value: 2,
    name: 'February'
}, {
    value: 3,
    name: 'March'
}, {
    value: 4,
    name: 'April'
}, {
    value: 5,
    name: 'May'
}, {
    value: 6,
    name: 'June'
}, {
    value: 7,
    name: 'July'
}, {
    value: 8,
    name: 'August'
}, {
    value: 9,
    name: 'September'
}, {
    value: 10,
    name: 'October'
}, {
    value: 11,
    name: 'November'
}, {
    value: 12,
    name: 'December'
}];
const MEASURES = [
    {
        measure: {
            localIdentifier: 'm1',
            definition: {
                measureDefinition: {
                    item: {
                        uri: GROSS_PROFIT_MEASURE
                    }
                }
            },
            alias: '$ Gross Profit'
        }
    }
];
const VIEW_BY = {
    visualizationAttribute:
    {
        displayForm: {
            uri: DATE_ATTRIBUTE_IN_MONTHS
        },
        localIdentifier: 'a1'
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMonth: 1,
            filters: []
        };

        this.onSelectedMonthChange = this.onSelectedMonthChange.bind(this);
    }

    componentDidMount() {
        const filters = [this.getMonthFilter(this.state.selectedMonth)];

        this.setState(prevState => ({
            ...prevState,
            filters
        }));
    }

    getFirstDateStrOfMonth(month = 1, year = (new Date()).getFullYear()) {
        if (month < 0 || month > 12) {
            return null;
        }

        return `${ year }-${ month < 10 ? `0${ month }` : month }-01`;
    }

    getLastDateStrOfMonth(month = 1, year = (new Date()).getFullYear()) {
        switch (true) {
            case month > 0 && month < 12:
                const lastDate = new Date(year, month, 0);
                const day = lastDate.getDate();
                return `${ year }-${ month < 10 ? `0${ month }` : month }-${ day < 10 ? `0${ day }` : day }`;
            case month === 12:
                return `${ year }-12-31`;
            default:console.log(month, typeof month);
                return null;
        }
    }

    getMonthFilter(month) {
        const from = this.getFirstDateStrOfMonth(month, 2016);
        const to = this.getLastDateStrOfMonth(month, 2016);

        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: DATE_ATTRIBUTE
                },
                from,
                to
            }

        }
    }

    onSelectedMonthChange(month) {
        const selectedMonth = parseInt(month, 10) || 1;
        this.setState(prevState => ({
            ...prevState,
            selectedMonth,
            filters: [this.getMonthFilter(selectedMonth)]
        }))
    }

    render() {
        return (
            <div className="App">
                <h1>
                    $ Gross Profit in month 
                    <Dropdown
                        data={ MONTH_LIST }
                        selectedValue={ this.state.selectedMonth }
                        valueKey='value'
                        nameKey='name'
                        selectItemValue={ this.onSelectedMonthChange } /> 2016
                </h1>
                {
                    (this.state.selectedMonth && this.state.filters.length) ? <div>
                        <ColumnChart
                            measures={ MEASURES }
                            filters={ this.state.filters }
                            projectId={ PROJECT_ID }
                        />
                    </div> : null
                }
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={ MEASURES }
                        viewBy={ VIEW_BY }
                        projectId={ PROJECT_ID }
                    />
                </div>
            </div>
        );
    }
}

export default App;
