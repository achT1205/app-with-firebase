import React, { Component, Fragment } from 'react'
import { withNamespaces } from 'react-i18next';
import { MDBSelect } from 'mdbreact'
import getTypeOptionsOptions from './typeOptions';

class ImmovableType extends Component {
    state = {
        options: []
    };

    componentDidMount() {
        const { t, selectedTypes } = this.props;
        let ops = getTypeOptionsOptions(t);
        this.setState({ options: ops });
        if (selectedTypes && selectedTypes[0])
            this.formatImmovableType(selectedTypes, t);
    }


    componentWillReceiveProps(nextProps) {
        const { t, selectedTypes, lng, i18n } = nextProps;
        if (lng !== this.props.lng) {
            i18n.changeLanguage(lng);
            let ops = getTypeOptionsOptions(t);
            this.setState({ options: ops });
            if (selectedTypes && selectedTypes[0])
                this.formatImmovableType(selectedTypes, t);
        }
    }


    formatImmovableType(selectedTypes, t) {
        this.setState(prevState => {
            let prevOptions = [...prevState.options];
            selectedTypes.forEach((val) => {
                prevOptions.forEach((op) => {
                    if (op.value === t('common.immovableTypes.'.concat(val.toString()))) {
                        op.checked = true;
                    }
                });
            });
            return { options: prevOptions };
        });
    }
    render() {
        const { handelImmovableTypesSelectChange, multiple, search, hideLabe, label, selectedDefault } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelImmovableTypesSelectChange}
                    color="primary"
                    options={this.state.options}
                    selected={selectedDefault}
                    multiple={multiple}
                    search={search}
                />
                {!hideLabe && <label>
                    {label}
                </label>
                }
            </Fragment>
        )
    }
}
const ImmovableTypeWrapped = withNamespaces()(ImmovableType);
export default ImmovableTypeWrapped