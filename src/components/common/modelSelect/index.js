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
        if ( !this.isEqual(selectedMarks, this.props.selectedMarks) || !this.isEqual(selectedModels, this.props.selectedModels)) {
            let marks = [];
            this.setState({ modelOptions: [] });
            selectedMarks.forEach((sm) => {
                marks.push(this.state.marks.find(m => m.mark === sm));
            })
            if (marks) {
                this.formatModelOptions(marks, selectedModels);
            }
        }
    }

    isEqual(array1, array2) {
        if (array1.length !== array2.length) {
            return false
        }
        for (let i = 0; i < array1.length; i++) {
            if (array2[i] !== array1[i]) {
                return false;
            }
        }
        return true;
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