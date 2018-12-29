import React, { Component , Fragment} from 'react'
import {MDBSelect} from 'mdbreact'

class NumberOfRooms extends Component {
    state = {
        roomsNumberOptions: []
    }

    componentDidMount() {
        const { numberOfRooms } = this.props;
        this.formatRoomsNumberOptions(numberOfRooms)
    }

    componentWillReceiveProps(nextProps) {
        const { numberOfRooms, lng, i18n } = nextProps;
        if (lng !== this.props.lng) {
            i18n.changeLanguage(lng);
            this.setState({roomsNumberOptions: []})
            this.formatRoomsNumberOptions(numberOfRooms)
        }
    }

    formatRoomsNumberOptions(selected) {
        this.setState((prevState) => {
            let prevOptions = [...prevState.roomsNumberOptions];
            for (let i = 1; i < 7; i++) {
                prevOptions.push(
                    {
                        checked: selected && selected.includes(i) ? true : false,
                        disabled: false,
                        icon: null,
                        value: i.toString()
                    }
                );
            }
            return { roomsNumberOptions: prevOptions };
        })
    }

    render() {
        const {
            handelNumberOfRoomsSelectChange,
            multiple,
            search,
            hideLabe,
            label,
            selectedDefault
        } = this.props;
        return (
            <Fragment>
                <MDBSelect getValue={handelNumberOfRoomsSelectChange}
                    color="primary"
                    multiple={multiple}
                    search={search}
                    options={this.state.roomsNumberOptions}
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

export default NumberOfRooms
