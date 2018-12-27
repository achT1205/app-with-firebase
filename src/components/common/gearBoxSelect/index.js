import React, { Component, Fragment } from 'react'
import { withNamespaces } from 'react-i18next';
import { MDBSelect } from 'mdbreact'

class GearBox extends Component {
    state = {
        gearBoxOptions: []
    }

    componentDidMount() {
        const { t,
            selectedGearBox } = this.props;
        this.formatGearBoxOptions(selectedGearBox, t)

    }

    componentWillReceiveProps(nextProps){
        const { t, selectedGearBox, lng, i18n } = nextProps;
        if (lng !== this.props.lng) {
          i18n.changeLanguage(lng);
          this.setState({ gearBoxOptions: [] })
          this.formatGearBoxOptions(selectedGearBox, t)
        }
    }


    formatGearBoxOptions(selectedGearBox, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.gearBoxOptions];
            prevOptions.push(
                {
                    checked: selectedGearBox &&  selectedGearBox.includes(1) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.gearBox.1')
                }
            );
            prevOptions.push(
                {
                    checked: selectedGearBox && selectedGearBox.includes(2) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.gearBox.2')
                }
            );
            return { gearBoxOptions: prevOptions };
        })
    }


    render() {
        const {
            handelGearBoxSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelGearBoxSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.gearBoxOptions}
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

const GearBoxWrapped = withNamespaces()(GearBox);
export default GearBoxWrapped