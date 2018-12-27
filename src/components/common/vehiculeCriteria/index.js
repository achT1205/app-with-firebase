import React, { Fragment } from 'react'
import { MDBCol, MDBInput, MDBRow } from 'mdbreact'
import MarksSelect from '../markSelect'
import ModelSelect from '../modelSelect'
import ModelYear from '../modelYearSelect'
import Fuel from '../fuelSelect'
import GearBox from '../gearBoxSelect'

const VehiculeCriteria = ({ announcement, handelMarksSelectChange, handelGearBoxSelectChange, handleCriteriaInputChange, handelFuelsSelectChange, handelModelsSelectChange, handelYearsSelectChange }) => {
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
                                hideLabe={false}
                                selectedDefault={'Select a mark '}
                                label={'Mark'}
                            />
                        </MDBCol>
                        <MDBCol md="4">
                            <ModelSelect
                                categories={[announcement.category]}
                                handelModelsSelectChange={handelModelsSelectChange}
                                multiple={false}
                                search={true}
                                hideLabe={false}
                                selectedDefault={'Select a model '}
                                label={'Model'}
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
                            hideLabe={false}
                            selectedDefault={'Select a year '}
                            label={'Year of the model'}
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
                            hideLabe={false}
                            selectedDefault={'Select a type of fuel '}
                            label={'Fuel'}
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
                            hideLabe={false}
                            selectedDefault={'Select a type of gear box '}
                            label={'Gear Box'}
                            selectedGearBox={[announcement.criteria.typeOfGearBox]}
                        />
                    </MDBCol>
                }
                {announcement.category === 3 &&
                    <MDBCol md="4">
                        <MDBInput
                            label={'Cylinder'}
                            name="cylinder"
                            value={announcement.criteria.cylinder}
                            onChange={handleCriteriaInputChange} />
                    </MDBCol>
                }
                {announcement.category > 1 && announcement.category < 6 &&
                    <MDBCol md={[4].includes(announcement.category) ? '6' : '4'}>
                        <MDBInput
                            label={'Mileage'}
                            type="text"
                            name="mileage"
                            onBlur={handleCriteriaInputChange} />
                    </MDBCol>
                }
            </MDBRow>
        </Fragment>
    )
}

export default VehiculeCriteria