import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import Snackbar from '@mui/material/Snackbar';
import CancelIcon from '@mui/icons-material/Cancel';


// const useFakeMutation = () => {
//   return useCallback(
//     (user) =>
//       new Promise((resolve, reject) =>
//         setTimeout(() => {
//           if (user.field.trim() === '') {
//             reject(new Error("Error while saving user: name can't be empty."));
//           } else {
//             resolve({ ...user, [user.field]: user.value });
//           }
//         }, 200),
//       ),
//     [],
//   );
// };


export default function GetList({getParam, updateParam, deleteParam, dataColumn }) {

  const [usersData, setUsersData] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [commitData, setCommitData] = useState({});
  const [editButton, setEditButton] = useState(true);
  const [snackbar, setSnackbar] = React.useState(null);
  // const mutateRow = useFakeMutation();

  

  useEffect(() => {
    const storageToken = window.sessionStorage.getItem('session');
    const storageUserId = window.sessionStorage.getItem('id');
    const userId = JSON.parse(storageUserId);
    getUserList();
  }, []);

  const getUserList = async () => {
    const storageUserIde = window.sessionStorage.getItem('id');
    const userIde = JSON.parse(storageUserIde);

    console.log(userIde);
    await axios.get(`http://localhost:8080/afterme/api/${getParam}`).then(
      (response) => {
        console.log('Success : ', response);
        console.log('Success : ', response.data);
        setUsersData(response.data);
      },
      (error) => {
        console.log('error : ', error);
      }
    )
  };

  const handleRowEdit = (id, params) =>{
      setEditButton(false);
  }

  const cellEditingStart = (params, event) => {
    console.log('handleRowEditStart :',params);
    console.log('handleRowEditStart :',event);
    event.defaultMuiPrevented = true;
      
    if(editButton){
      event.defaultMuiPrevented = true;
    }else{
      event.defaultMuiPrevented = false;
    }
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
    if(editButton){
      event.defaultMuiPrevented = true;
    }else{
      event.defaultMuiPrevented = false;
    }  
  };

  // const processRowUpdate = React.useCallback(
  //   async (newRow) => {
  //     // Make the HTTP request to save in the backend
  //     const response = await mutateRow(newRow);
  //     setSnackbar({ children: 'User successfully saved', severity: 'success' });
  //     return response;
  //   },
  //   [mutateRow],
  // );

  const processRowUpdate = async (newRow) => {
    console.log("new row : ", newRow);
        const commiteddata = {...newRow};
        setCommitData(commiteddata);
        return { ...newRow, isNew: false };
  };

  // const processRowUpdate = useCallback(
  //   async (newRow) => {
  //     // Make the HTTP request to save in the backend
  //     const response = await mutateRow(newRow);
  //     return response;
  //   },
  //   [mutateRow],
  // );
  

  const handleRowCommit = (id,event)=>{
      console.log("handleRowCommit id ", id);
      console.log("handleRowCommit events ", event);
  }

  const handleCommit = (e)=>{
    const arraycommit = usersData.map((r)=>{
      console.log('e.id : ', e.id);
      if(r.id === e.id){
        const commiteddata = {...r, [e.field]:e.value};
        setCommitData(commiteddata);
        return {...r, [e.field]:e.value}
      }else{
        return {...r}
      }
    })
    // console.log('commiteddata : ', commiteddata);
  }

  const handleUpdate = (id)=>{

    console.log(commitData);
    console.log(id);

    axios.put(`http://localhost:8080/afterme/api/${updateParam}/${id}`, commitData).then(
        (response) => {
            console.log('updated Successfully : ', response);
            console.log('updated Successfully : ', response.data);
            //setUsers(response.data);
            setEditButton(true);
        },
        (error) => {
            console.log('error : ', error);

        }
    )
  }
 
  const handleCancel = (id)=>{
    console.log("handlecancel usersData : ", usersData);
    const userDataRevert = [...usersData]
    console.log("handlecancel userdatarevert: ", userDataRevert);
    setUsersData(userDataRevert);
    setEditButton(true)
  }

  const handleDelete = (id) => {
    setUsersData(usersData.filter((item) => item.id !== id))
    console.log('deleteparam : ', deleteParam);
    axios.delete(`http://localhost:8080/afterme/api/${deleteParam}/${id}`).then(
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
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        // type: 'number',
        width: 100,
        sortable: false,
        cellClassName: 'actions',
        renderCell: (params) => {
            return (
                <div className='userAvatar'>
                    <IconButton color="primary" aria-label="edit" >
                          {editButton?<EditIcon onClick={() => handleRowEdit(params.row.id, params.row)} />:<SaveAsIcon onClick={() => handleUpdate(params.row.id)}/> }
                            </IconButton>

                    <IconButton color="primary" aria-label="delete" >
                    {editButton?<DeleteIcon onClick={() => handleDelete(params.row.id)}/> : <CancelIcon onClick={()=>handleCancel(params.row.id)}/>}
                        </IconButton>

                </div>
            )
        }
    },
    
    { field: 'id', headerName: 'ID', width: 90 },
    ...dataColumn,
    
  ];

  
  return (
    <div style={{height: '100%', width: '100%', marginBottom: 30}}>
      <DataGrid
        rows={usersData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        autoHeight
        // onCellEditCommit={handleCommit}
        // onCellEditStart={cellEditingStart}
        // onRowEditCommit={handleRowCommit}
        // onCellDoubleClick={()=>setEditButton(false)}
        onRowEditStart={cellEditingStart}
        onRowEditStop={handleRowEditStop}
        editMode="row"
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
        />
    </div>
  );
}
