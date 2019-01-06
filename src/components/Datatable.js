import React, { Fragment } from 'react';
import { MDBDataTable, MDBIcon, MDBRow, MDBCard, MDBCardBody } from 'mdbreact';

const Datatable = ({ announcements, handleEdit, handleDelete }) => {

    const formateCover = url => {
        return (
            <div className="mdb-feed">
                <div className="news">
                    <div className="excerpt">
                        <div className="added-images">
                            <img
                                src={url}
                                alt=""
                                className="z-depth-1 rounded mb-md-0 mb-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    };
    const formateActions = (id, index) => {
        return (
            <div className="form-inline">
                <MDBIcon onClick={() => handleEdit(id)} icon="edit" size="lg" className="cyan-text" />
                <MDBIcon onClick={() => handleDelete(id, index)} icon="times-circle-o" className="red-text ml-1" size="lg" />
            </div>
        )

    };

    const formatData = () => {
        const data = {
            columns: [
                {
                    label: 'Cover',
                    field: 'cover',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Description',
                    field: 'description',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Create at',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc',
                    width: 300
                }
            ],
            rows: []
        };
        announcements.map((announcement, index) => {
                let row = {
                    cover: formateCover(announcement.images[0].thumb),
                    title: announcement.title,
                    amount: announcement.amount,
                    description: announcement.description,
                    date: announcement.createAt,
                    actions: formateActions(announcement.id , index)
                }
                data.rows.push(row)
            })
        return data;
    }

    return (
        <Fragment>
            {announcements && <MDBCard>
                <MDBCardBody className="py-0">
                    <MDBRow>
                        <MDBDataTable
                            striped
                            bordered
                            small
                            info={true}
                            order={['date', 'desc']}
                            searching={true}
                            infoLabel={["Showing", "to", "of", "entries"]}
                            paginationLabel={["Previous", "Next"]}
                            entriesLabel="Show entries"
                            searchLabel="Search"
                            data={formatData()}
                        />
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
            }
        </Fragment>
    );
}

export default Datatable;