import React from 'react';
import { MDBDataTable } from 'mdbreact';

const Datatable = ({ announcements }) => {
    
    const formatData = () => {
        const data = {
            columns: [
                {
                    label: 'Cover',
                    field: 'cover',
                    sort: 'asc',
                    width: 100
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
                }
            ],
            rows: []
        };
        Object.keys(announcements)
            .map(key => {
                let row ={
                    cover: <img src={announcements[key].pictures[0]} />,
                    title: announcements[key].title,
                    amount: announcements[key].amount,
                    description: announcements[key].description,
                    date: announcements[key].createAt
                }
                data.rows.push(row)
            })
            return data;
    }

    return (
        <MDBDataTable
            striped
            bordered
            small
            data={formatData()}
        />
    );
}

export default Datatable;