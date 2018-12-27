import React, { Component , Fragment} from 'react'
import {MDBSelect} from 'mdbreact'

class Ges extends Component {
    state = {
        gesOptions: []
    }

    componentDidMount() {
        const {selectedChoices } = this.props;
        this.formatGesOptions(selectedChoices)

    }

    formatGesOptions(selectedChoices) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.gesOptions];
            let list = ["A", "B", "C", "D", "E", "F", "G", "I"];
            list.forEach((w, index) => {
                prevOptions.push(
                    {
                        checked: selectedChoices.includes(index + 1) ? true : false,
                        disabled: false,
                        icon: null,
                        value: w
                    }
                );
            }
            );
            return { gesOptions: prevOptions };
        })
    }
    render() {
        const {
            handelGesSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelGesSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.gesOptions}
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

export default Ges
