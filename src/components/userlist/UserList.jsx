import React, { useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './userlist.css';
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import base_url from '../../api/bootapi';
import axios from 'axios';

function UserList() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        document.title = "User List || Soci App";
      getUserList();
    }, [users]);


    const getUserList = async () => {
        await axios.get(`${base_url}/users`).then(
            (response) => {
                console.log('Success : ', response);
                console.log('Success : ', response.data);
                setUsers(response.data);
            },
            (error) => {
                console.log('error : ', error);
            }
        )
    };

    
    // const getUsersListFromServer = () => {
    //     axios.get(`${base_url}/users`).then(
    //         (response)=>{
    //             console.log('Success : ', response);
    //             console.log('Success : ', response.data);
    //             setUsers(response.data);
    //         },
    //         (error)=>{ 
    //             console.log('error : ', error);
    //         }
    //     )
    // };

    

    const handleDelete = (id) => {
        setUsers(users.filter((item) => item.id !== id))
        axios.delete(`${base_url}/user/${id}`).then(
            (response) => {
                console.log('Delete Successfully : ', response);
                console.log('Delete Successfully : ', response.data);
                //setUsers(response.data);
            },
            (error) => {
                console.log('error : ', error);
            }
        )
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 100, },
        // { field: 'user', headerName: 'User', width: 100, sortable: false, renderCell:(params)=>{
        //     return(
        //         <div className='userAvatar'>
        //             <img src={params.row.avatar} alt={params.row.email} className='userAvatarImg'/>
        //         </div>
        //     )}
        // },
        {
            field: 'fullName',
            headerName: 'Name',
            description: 'This column has a value of concatnet first and last name.',
            //   sortable: false,
            width: 120,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'email',
            headerName: 'Email',
            description: 'This column has a value of Email id.',
            width: 200,
        },
        {
            field: 'mobile',
            headerName: 'Contact',
            description: 'This column has a value of Contact number.',
            //   sortable: false,
            width: 150,
        },
        // { field: 'firstName', headerName: 'First name', width: 130 },
        // { field: 'lastName', headerName: 'Last name', width: 130 },
        // {
        //   field: 'age',
        //   headerName: 'Age',
        //   type: 'number',
        //   width: 110,
        // },
        // {
        //     field: 'email',
        //     headerName: 'E-mail',
        //     // type: 'String',
        //     width: 180,
        //   },
        //   {
        //     field: 'status',
        //     headerName: 'Status',
        //     // type: 'number',
        //     width: 120,
        //   },
        {
            field: 'action',
            headerName: 'Action',
            // type: 'number',
            width: 160,
            sortable: false,
            renderCell: (params) => {
                return (
                    <div className='userAvatar'>
                        <Link to={`/user/${params.row.id}`}>
                            <Button variant="contained" color="primary" size="small">
                                Edit
                            </Button>
                        </Link>

                        <Button variant="contained" size="small" onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon color='secondary' fontSize="small" />
                        </Button>

                        {/* <IconButton aria-label="delete"  >
                            <DeleteIcon color='secondary' />
                        </IconButton> */}
                        {/* <Button variant="outlined" color="secondary"  ><DeleteOutline/></Button> */}
                    </div>
                )
            }
        },
    ];


    return (
        <div className='userlistWrap'>
            <DataGrid rows={users} columns={columns} pageSize={8} checkboxSelection/>
        </div>
    )
}

export default UserList
