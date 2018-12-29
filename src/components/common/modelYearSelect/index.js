import React, { Component, Fragment } from "react";
import {
    MDBSelect,
} from "mdbreact";

class ModelYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yearOptions: [],
        };
    }
    componentDidMount() {
        const {
            selectedYear,
            yearLimit,
            currentYear
        } = this.props;
        this.formatYearOfModel(yearLimit, currentYear, selectedYear);
    }

    componentWillReceiveProps(nextProps) {
        const {  
            selectedYear,
            yearLimit,
            currentYear, lng, i18n } = nextProps;
        if (lng !== this.props.lng) {
            i18n.changeLanguage(lng);
            this.setState({yearOptions: []})
            this.formatYearOfModel(yearLimit, currentYear, selectedYear);
        }
    }

    formatYearOfModel(limit, currentYear, selectedYear) {
        if (limit && currentYear)
            this.setState((prevState) => {
                let prevOptions = [...prevState.yearOptions];
                for (let i = 0; i < limit + 1; i++) {
                    let option = {
                        checked: currentYear && selectedYear.includes(currentYear - i) ? true : false,
                        disabled: false,
                        icon: null,
                        value: (currentYear - i).toString()
                    };
                    prevOptions.push(option);
                };
                return { yearOptions: prevOptions };
            })
    }

    render() {
        const {
            handelYearsSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelYearsSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.yearOptions}
                    selected={selectedDefault}
                />
                {!hideLabe && <label>
                    {label}
                </label>
                }
            </Fragment>
        );

    }
}


export default ModelYear