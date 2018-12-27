import React, { Component, Fragment } from "react";
import {
    MDBSelect,
} from "mdbreact";
import marks from './marks';
import markOptions from './markOption';
const iconUrlBabe = "https://images.caradisiac.com/logos-ref/auto/auto--";
const defaultIconUrl = "https://static.caradisiac.com/img_site/mobileResponsive/logo_marqueDefault.gif";
const extension = ".png";

class MarksSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markOptions: [],
            marks: marks
        };
    }
    componentDidMount() {
        const {
            selectedMarks
        } = this.props;
        let ops = markOptions();
        this.setState({ markOptions: ops });
        this.formatMarkOptions(selectedMarks);
    }

    formatMarkOptions(selectedMarks) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.markOptions];
            prevOptions.forEach((op) => {
                let mark = this.state.marks.find(m => m.mark === op.value);
                op.icon = !mark.shortName ? defaultIconUrl : iconUrlBabe + mark.shortName + extension;
                if (selectedMarks && selectedMarks.length > 0 && selectedMarks.includes(op.value)) {
                    op.checked = true;
                }
            });
            return { markOptions: prevOptions };
        })
    }

    render() {
        const {
            categories,
            handelMarksSelectChange,
            multiple,
            search,
            hideLabe,
            selectedDefault,
            label
        } = this.props;
        return (
            <Fragment>
                {(categories.includes(2) || categories.includes(3)
                    || categories.includes(4) || categories.includes(5)) &&
                    <Fragment>
                        <MDBSelect getValue={handelMarksSelectChange}
                            color="primary"
                            multiple={multiple}
                            search={search}
                            options={this.state.markOptions}
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
export default MarksSelect
