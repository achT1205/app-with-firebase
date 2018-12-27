import React, { Fragment } from 'react'
import { MDBCol, MDBInput, MDBRow } from 'mdbreact'

const VacationCriteria = ({announcement, handleCriteriaInputChange }) => {
    return (
        <Fragment>
            <MDBRow>
                <MDBCol md="4">
                    <MDBInput
                        label={"Number of people"}
                        name="numberOfPeople"
                        value={announcement.criteria.numberOfPeople}
                        onChange={handleCriteriaInputChange} />
                </MDBCol>
                <MDBCol md="4">
                    <MDBInput
                        name="numberOfVacationRooms"
                        label={"Number of vacation rooms"}
                        value={announcement.criteria.numberOfVacationRooms}
                        onChange={handleCriteriaInputChange} />
                </MDBCol>
            </MDBRow>
        </Fragment>
    )
}

export default VacationCriteria