import React, { Fragment } from 'react'
import { MDBCol, MDBInput, MDBRow } from 'mdbreact'
import { withNamespaces } from 'react-i18next';
import HasSwimingPool from '../hasSwimingPoolSelect'

const VacationCriteria = ({t, announcement, handleCriteriaInputChange , handelHasSwimingPoolSelectChange}) => {
    return (
        <Fragment>
            <MDBRow>
                <MDBCol md="4">
                    <HasSwimingPool
                        handelHasSwimingPoolSelectChange={handelHasSwimingPoolSelectChange}
                        multiple={false}
                        search={false}
                        hideLabe={true}
                        selectedChoices={[announcement.criteria.hasSwimingPool]}
                        selectedDefault={t('common.labels.hasSwimingPool.select')}
                        label={t('common.labels.hasSwimingPool.label')}
                    />
                </MDBCol>
                <MDBCol md="4">
                    <MDBInput
                        label={t('common.labels.immovableCapacity')}
                        name="numberOfPeople"
                        value={announcement.criteria.numberOfPeople}
                        onChange={handleCriteriaInputChange} />
                </MDBCol>
                <MDBCol md="4">
                    <MDBInput
                        name="numberOfVacationRooms"
                        label={t('common.labels.numberOfVacationRooms')}
                        value={announcement.criteria.numberOfVacationRooms}
                        onChange={handleCriteriaInputChange} />
                </MDBCol>
            </MDBRow>
        </Fragment>
    )
}
const VacationCriteriaWrapped = withNamespaces()(VacationCriteria);
export default VacationCriteriaWrapped