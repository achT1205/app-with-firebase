import React, { Fragment } from 'react'
import { MDBRow, MDBCol, MDBInput } from 'mdbreact'
import { withNamespaces } from 'react-i18next';
import ImmovableType from '../immovableTypeSelect'
import IsEquiped from '../IsEquipedSelect'
import NumberOfRooms from '../numberOfRoomsSelect'
import EnergyClassification from '../energyClassificationSelect'
import Ges from '../gesSelect'


const ImmovableCriteria = (props) => {
    const { t, handleCriteriaInputChange, handelGesSelectChange, handelEnergyClassificationSelectChange, handelNumberOfRoomsSelectChange, handelImmovableTypesSelectChange, handelIsEquipedSelectChange, announcement } = props;
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
                                hideLabe={true}
                                selectedDefault={t('common.labels.immovableType.select')}
                                label={t('common.labels.immovableType.label')}
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
                                hideLabe={true}
                                selectedDefault={t('common.labels.isEquiped.select')}
                                label={t('common.labels.isEquiped.label')}
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
                                hideLabe={true}
                                selectedDefault={t('common.labels.numberOfRooms.select')}
                                label={t('common.labels.numberOfRooms.label')}
                                numberOfRooms={[announcement.criteria.numberOfRooms]}
                            />
                        </MDBCol>
                    }
                    <MDBCol md={announcement.category === 13 ? '6' : [11, 12].includes(announcement.category) ? '4' : ''}>
                        <EnergyClassification
                            handelEnergyClassificationSelectChange={handelEnergyClassificationSelectChange}
                            multiple={false}
                            search={false}
                            hideLabe={true}
                            selectedDefault={t('common.labels.energyClassification.select')}
                            label={t('common.labels.energyClassification.label')}
                            selectedChoices={[announcement.criteria.energyClassification]}
                        />
                    </MDBCol>
                    <MDBCol md={[11,13].includes(announcement.category) ? '6' : announcement.category ===12 ? '4' : ''}>
                        <Ges
                            handelGesSelectChange={handelGesSelectChange}
                            multiple={false}
                            search={false}
                            hideLabe={true}
                            selectedDefault={t('common.labels.ges.select')}
                            label={t('common.labels.ges.label')}
                            selectedChoices={[announcement.criteria.ges]}
                        />
                    </MDBCol>
                    <MDBCol md={[11,13].includes(announcement.category) ? '6' : announcement.category === 12 ? '4' : ''}>
                        <MDBInput
                            label={t('common.labels.immovableSize')}
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
const ImmovableCriteriaWrapped = withNamespaces()(ImmovableCriteria);
export default ImmovableCriteriaWrapped
