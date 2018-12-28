import React, { Fragment } from 'react'
import { MDBCol, MDBInput, MDBRow } from 'mdbreact'
import { withNamespaces } from 'react-i18next';
import MarksSelect from '../markSelect'
import ModelSelect from '../modelSelect'
import ModelYear from '../modelYearSelect'
import Fuel from '../fuelSelect'
import GearBox from '../gearBoxSelect'


const VehiculeCriteria = ({ announcement, handelMarksSelectChange, handelGearBoxSelectChange, handleCriteriaInputChange, handelFuelsSelectChange, handelModelsSelectChange, handelYearsSelectChange , t}) => {
    return (
        <Fragment>
            <MDBRow>
                {announcement.category === 2 &&
                    <Fragment>
                        <MDBCol md="4">
                            <MarksSelect
                                categories={[announcement.category]}
                                handelMarksSelectChange={handelMarksSelectChange}
                                multiple={false}
                                search={true}
                                hideLabe={true}
                                selectedDefault={t('common.labels.mark.select')}
                                label={t('common.labels.mark.label')}
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <ModelSelect
                                categories={[announcement.category]}
                                handelModelsSelectChange={handelModelsSelectChange}
                                multiple={false}
                                search={true}
                                hideLabe={true}
                                selectedDefault={t('common.labels.model.select')}
                                label={t('common.labels.model.label')}
                                selectedMarks={[announcement.criteria.mark]}
                                selectedModels={[announcement.criteria.model]}
                            />
                        </MDBCol>
                    </Fragment>
                }
                {announcement.category > 1 && announcement.category < 6 &&
                    <MDBCol md={[4].includes(announcement.category) ? '6' : '4'}>
                        <ModelYear
                            handelYearsSelectChange={handelYearsSelectChange}
                            multiple={false}
                            search={true}
                            hideLabe={true}
                            selectedDefault={t('common.labels.year.select')}
                            label={t('common.labels.year.label')}
                            selectedYear={[announcement.criteria.selectedYear]}
                            yearLimit={30}
                            currentYear={2019}
                        />
                    </MDBCol>
                }
                {[2, 5].includes(announcement.category) &&
                    <MDBCol md="4">
                        <Fuel
                            handelFuelsSelectChange={handelFuelsSelectChange}
                            multiple={false}
                            search={false}
                            hideLabe={true}
                            selectedDefault={t('common.labels.fuel.select')}
                            label={t('common.labels.fuel.label')}
                            selectedfuels={[announcement.criteria.typeOfFuel]}
                        />
                    </MDBCol>
                }
                {
                    announcement.category === 2 &&
                    <MDBCol md="4">
                        <GearBox
                            handelGearBoxSelectChange={handelGearBoxSelectChange}
                            multiple={false}
                            search={false}
                            hideLabe={true}
                            selectedDefault={t('common.labels.gear.select')}
                            label={t('common.labels.gear.label')}
                            selectedGearBox={[announcement.criteria.typeOfGearBox]}
                        />
                    </MDBCol>
                }
                {announcement.category === 3 &&
                    <MDBCol md="4">
                        <MDBInput
                            label={t('common.labels.cylinder')}
                            name="cylinder"
                            value={announcement.criteria.cylinder}
                            onChange={handleCriteriaInputChange} />
                    </MDBCol>
                }
                {announcement.category > 1 && announcement.category < 6 &&
                    <MDBCol md={[4].includes(announcement.category) ? '6' : '4'}>
                        <MDBInput
                            label={t('common.labels.mileage')}
                            type="text"
                            name="mileage"
                            onBlur={handleCriteriaInputChange} />
                    </MDBCol>
                }
            </MDBRow>
        </Fragment>
    )
}
const VehiculeCriteriaWrapped = withNamespaces()(VehiculeCriteria);
export default VehiculeCriteriaWrapped