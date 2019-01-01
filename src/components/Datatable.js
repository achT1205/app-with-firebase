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
    const formateActions = id => {
        return (
            <div className="form-inline">
                <MDBIcon onClick={() => handleEdit(id)} icon="edit" size="lg" className="cyan-text" />
                <MDBIcon onClick={() => handleDelete(id)} icon="times-circle-o" className="red-text ml-1" size="lg" />
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


        Object.keys(announcements)
            .map(key => {
                let row = {
                    cover: formateCover(announcements[key].images[0].url),
                    title: announcements[key].title,
                    amount: announcements[key].amount,
                    description: announcements[key].description,
                    date: announcements[key].createAt,
                    actions: formateActions(key)
                }
                data.rows.push(row)
            })
        return data;
    }

    return (

        <MDBCard>
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
    );
}

export default Datatable;