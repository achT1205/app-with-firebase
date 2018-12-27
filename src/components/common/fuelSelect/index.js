import React, { Component, Fragment } from 'react'
import { withNamespaces } from 'react-i18next';
import { MDBSelect } from 'mdbreact'

class Fuel extends Component {
    state = {
        fuelOptions: []
    }

    componentDidMount() {
        const { t,
            selectedfuels } = this.props;
        this.formatFuels(selectedfuels, t)

    }

    componentWillReceiveProps(nextProps){
        const { t, selectedfuels, lng, i18n } = nextProps;
        if (lng !== this.props.lng) {
          i18n.changeLanguage(lng);
          this.setState({ fuelOptions: [] })
          this.formatFuels(selectedfuels, t)
        }
    }

    formatFuels(selectedfuels, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.fuelOptions];
            prevOptions.push(
                {
                    checked: selectedfuels && selectedfuels.includes(1) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.fuels.1')
                }
            );
            prevOptions.push(
                {
                    checked: selectedfuels && selectedfuels.includes(2) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.fuels.2')
                }
            );
            prevOptions.push(
                {
                    checked: selectedfuels && selectedfuels.includes(3) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.fuels.3')
                }
            );
            return { fuelOptions: prevOptions };
        })
    }


    render() {
        const {
            handelFuelsSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelFuelsSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.fuelOptions}
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

const FuelWrapped = withNamespaces()(Fuel);
export default FuelWrapped