import React, { Component, Fragment } from 'react'
import { MDBSelect } from 'mdbreact'
import { withNamespaces } from 'react-i18next';

class HasSwimingPool extends Component {
    state = {
        swimingPoolOptions: []
    }
    componentDidMount() {
        const { t, selectedChoices } = this.props;
        this.formatSwimingPoolOption(selectedChoices, t);
    }

    componentWillReceiveProps(nextProps) {
        const { t, lng, selectedChoices } = nextProps;
        if (lng !== this.props.lng) {
            this.setState({swimingPoolOptions: []})
            this.formatSwimingPoolOption(selectedChoices, t);
        }
    }

    formatSwimingPoolOption(selectedChoices, t) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.swimingPoolOptions];
            prevOptions.push(
                {
                    checked: selectedChoices && selectedChoices.includes(true) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.swimingPoolOptions.1')
                }
            );
            prevOptions.push(
                {
                    checked: selectedChoices && selectedChoices.includes(false) ? true : false,
                    disabled: false,
                    icon: null,
                    value: t('common.swimingPoolOptions.2')
                }
            );
            return { swimingPoolOptions: prevOptions };
        })
    }

    render() {
        const {
            handelHasSwimingPoolSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelHasSwimingPoolSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.swimingPoolOptions}
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

const HasSwimingPoolWrapped = withNamespaces()(HasSwimingPool);
export default HasSwimingPoolWrapped
