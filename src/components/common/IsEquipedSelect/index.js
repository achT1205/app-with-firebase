import React, { Component , Fragment} from 'react'
import {MDBSelect} from 'mdbreact'
import { withNamespaces } from 'react-i18next';

class IsEquiped extends Component {
    state = {
        isEquipedOptions: []
    }

    componentDidMount() {
        const { t, selectedChoices } = this.props;
        this.formatIsEquipedOptions(selectedChoices, t)

    }

    componentWillReceiveProps(nextProps) {
        const { t, selectedChoices, lng, i18n } = nextProps;
        if (lng !== this.props.lng) {
            i18n.changeLanguage(lng);
            this.setState({ isEquipedOptions: [] })
            this.formatIsEquipedOptions(selectedChoices, t)
        }
    }

    formatIsEquipedOptions(selectedChoices, t) {
        debugger;
        this.setState((prevState) => {
            let prevOptions = [...prevState.isEquipedOptions];
            prevOptions.push(
                {
                    checked: selectedChoices && selectedChoices.includes(true) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.isEquiped.1')
                }
            );
            prevOptions.push(
                {
                    checked: selectedChoices && selectedChoices.includes(false) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.isEquiped.2')
                }
            );
            return { isEquipedOptions: prevOptions };
        })
    }


    render() {
        const {
            handelIsEquipedSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelIsEquipedSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.isEquipedOptions}
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

const IsEquipedWrapped = withNamespaces()(IsEquiped);
export default IsEquipedWrapped
