import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import RowCard from './RowCard';
import createHistory from 'history/createBrowserHistory';
const history = createHistory({ forceRefresh: true })

const handleClick = (id) => {
    history.push(`/details/${id}`);
}

const ListRow = ({ announcements } = this.props) => {
    const renderList = Object
        .keys(announcements)
        .map(key => (
            <MDBCol md="4" className="mb-lg-0 mb-4" key={key}>
                <RowCard announcement={announcements[key]} handleClick={handleClick} />
            </MDBCol>
        ))

    return (
        <section className="text-center my-5">
            <MDBRow>
                {renderList}
            </MDBRow>
        </section>
    );
}

export default ListRow;