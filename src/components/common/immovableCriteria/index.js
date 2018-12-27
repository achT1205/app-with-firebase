import React, { Fragment } from 'react'
import { MDBRow, MDBCol, MDBInput } from 'mdbreact'
import ImmovableType from '../immovableTypeSelect'
import IsEquiped from '../IsEquipedSelect'
import NumberOfRooms from '../numberOfRoomsSelect'
import EnergyClassification from '../energyClassificationSelect'
import Ges from '../gesSelect'


const ImmovableCriteria = (props) => {
    const { handleCriteriaInputChange, handelGesSelectChange, handelEnergyClassificationSelectChange, handelNumberOfRoomsSelectChange, handelImmovableTypesSelectChange, handelIsEquipedSelectChange, announcement } = props;
    return (
        <Fragment>
            <MDBRow>
                <Fragment>
                    {
                        [11, 12].includes(announcement.category) &&
                        <MDBCol md="4">
                            <ImmovableType
                                handelImmovableTypesSelectChange={handelImmovableTypesSelectChange}
                                multiple={false}
                                search={true}
                                hideLabe={false}
                                selectedDefault={'Type'}
                                label={'Type'}
                                selectedTypes={[announcement.criteria.immovableType]}
                            />
                        </MDBCol>
                    }
                    {announcement.category === 12 &&
                        <MDBCol md="4">
                            <IsEquiped
                                handelIsEquipedSelectChange={handelIsEquipedSelectChange}
                                multiple={false}
                                search={false}
                                hideLabe={false}
                                selectedDefault={'Equiped or not'}
                                label={'Equiped or not'}
                                selectedChoices={[announcement.criteria.isEquiped]}
                            />
                        </MDBCol>
                    }
                    {announcement.category !== 14 &&
                        <MDBCol md={announcement.category === 13 ? '6' : [11, 12].includes(announcement.category) ? '4' : ''}>
                            <NumberOfRooms
                                handelNumberOfRoomsSelectChange={handelNumberOfRoomsSelectChange}
                                multiple={false}
                                search={false}
                                hideLabe={false}
                                selectedDefault={'Number of rooms'}
                                label={'Number of rooms'}
                                numberOfRooms={[announcement.criteria.numberOfRooms]}
                            />
                        </MDBCol>
                    }
                    <MDBCol md={announcement.category === 13 ? '6' : [11, 12].includes(announcement.category) ? '4' : ''}>
                        <EnergyClassification
                            handelEnergyClassificationSelectChange={handelEnergyClassificationSelectChange}
                            multiple={false}
                            search={false}
                            hideLabe={false}
                            selectedDefault={'Energy classification'}
                            label={'Energy classification'}
                            selectedChoices={[announcement.criteria.energyClassification]}
                        />
                    </MDBCol>
                    <MDBCol md={[11,13].includes(announcement.category) ? '6' : announcement.category ===12 ? '4' : ''}>
                        <Ges
                            handelGesSelectChange={handelGesSelectChange}
                            multiple={false}
                            search={false}
                            hideLabe={false}
                            selectedDefault={'Ges'}
                            label={'Ges'}
                            selectedChoices={[announcement.criteria.ges]}
                        />
                    </MDBCol>
                    <MDBCol md={[11,13].includes(announcement.category) ? '6' : announcement.category === 12 ? '4' : ''}>
                        <MDBInput
                            label={"Size"}
                            type="text"
                            name="sizeOfSurface"
                            value={announcement.criteria.sizeOfSurface}
                            onChange={handleCriteriaInputChange} />
                    </MDBCol>
                </Fragment>
            </MDBRow>
        </Fragment>
    )
}

export default ImmovableCriteria
