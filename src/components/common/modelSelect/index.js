import React, { Component, Fragment } from "react";
import marks from '../markSelect/marks';
import {
    MDBSelect,
} from "mdbreact";



class ModelSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelOptions: [],
            marks: marks
        };
    }
    componentDidMount() {
        const { t,
            selectedMarks,
            selectedModels
        } = this.props;
        let marks = [];
        selectedMarks.forEach((sm) => {
            marks.push(this.state.marks.find(m => m.mark === sm));
        })
        if (marks) {
            this.formatModelOptions(marks, selectedModels, t);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            selectedMarks,
            selectedModels
        } = nextProps;
        this.setState({ modelOptions: [] });
        if (selectedMarks !== this.props.selectedMarks) {
            let marks = [];
            selectedMarks.forEach((sm) => {
                marks.push(this.state.marks.find(m => m.mark === sm));
            })
            if (marks) {
                this.formatModelOptions(marks, selectedModels);
            }
        }

    }

    formatModelOptions(selectedMarks, selectedModels) {
        if (selectedMarks && selectedMarks.length > 0 && selectedMarks[0]) {
            this.setState((prevState) => {
                let prevOptions = [...prevState.modelOptions];
                selectedMarks.forEach((mark) => {
                    mark.models.forEach((model) => {
                        let option = {
                            checked: selectedModels && selectedModels.includes(model) ? true : false,
                            disabled: false,
                            icon: null,
                            value: model
                        };
                        prevOptions.push(option);
                    });
                });
                return { modelOptions: prevOptions };
            });
        }
    }

    render() {
        const {
            categories,
            handelModelsSelectChange,
            multiple,
            search,
            hideLabe,
            label, 
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                {(categories.includes(2) || categories.includes(3)
                    || categories.includes(4) || categories.includes(5)) &&
                    <Fragment>
                        <MDBSelect getValue={handelModelsSelectChange}
                            color="primary"
                            multiple={multiple}
                            search={search}
                            options={this.state.modelOptions}
                            selected={selectedDefault}
                        />
                         {!hideLabe && <label>
                            {label}
                        </label>
                        }
                    </Fragment>
                }
            </Fragment>
        );

    }
}


export default ModelSelect