import React, { Component , Fragment} from 'react'
import {MDBSelect} from 'mdbreact'

class EnergyClassification extends Component {
    state = {
        energyClassificationOptions: []
    }

    componentDidMount() {
        const {selectedChoices } = this.props;
        this.formatEnergyClassificationOptions(selectedChoices)

    }

    formatEnergyClassificationOptions(selectedChoices) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.energyClassificationOptions];
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
            return { energyClassificationOptions: prevOptions };
        })
    }
    render() {
        const {
            handelEnergyClassificationSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelEnergyClassificationSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.energyClassificationOptions}
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

export default EnergyClassification
