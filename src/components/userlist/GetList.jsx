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
import {useGridApiRef, esES, GridToolbarContainer, 
  GridToolbarFilterButton, GridActionsCellItem, GridToolbarDensitySelector
} from '@mui/x-data-grid';
import base_url from '../../constant/Bootapi';

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


export default function GetList({ getParam, updateParam, deleteParam, dataColumn }) {

  const [usersData, setUsersData] = useState([]);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [commitData, setCommitData] = useState({});
  const [editButton, setEditButton] = useState(true);
  const [snackbar, setSnackbar] = React.useState(null);
  const [listId, setListId] = useState(null);
  // const mutateRow = useFakeMutation();
  const [selectionModel, setSelectionModel] = React.useState([]);
  const apiRef = useGridApiRef();


  useEffect(() => {
    const storageToken = window.sessionStorage.getItem('session');
    const storageUserId = window.sessionStorage.getItem('id');
    const userId = JSON.parse(storageUserId);
    getUserList();
  }, []);

  const getUserList = async () => {
    const storageUserIde = window.sessionStorage.getItem('id');
    const userIde = JSON.parse(storageUserIde);

    console.log("getUser of id : ", userIde);
    await axios.get(`${base_url}/api/${getParam}/${userIde}`).then(
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

  const handleRowEdit = (id, params) => {
    setListId(id);
    setEditButton(false);
    console.log("handleRowEdit : ", id);
  }

  const cellEditingStart = (params, event) => {
    console.log('cellEditingStart :', params);
    console.log('cellEditingStart :', event);
    console.log('cellEditingStart paramsid:', params.id);
    console.log('cellEditingStart listid :', listId);
    event.defaultMuiPrevented = true;

    if (params.id != listId || editButton) {
      event.defaultMuiPrevented = true;
    } else {
      event.defaultMuiPrevented = false;
    }

  };

  const handleRowEditStop = (params, event) => {
    console.log('handleRowEditStop :', params);
    console.log('handleRowEditStop :', event);
    console.log('apiRef : ', apiRef);

    event.defaultMuiPrevented = true;
    if (editButton) {
      event.defaultMuiPrevented = true;
    } else {
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

  const processRowUpdate = useCallback(
    async (newRow) => {
      console.log("new row : ", newRow);
      const commiteddata = { ...newRow };
      setCommitData(commiteddata);
      return { ...newRow, isNew: false };
    },
    [commitData],
  )


  // const processRowUpdate = useCallback(
  //   async (newRow) => {
  //     // Make the HTTP request to save in the backend
  //     const response = await mutateRow(newRow);
  //     return response;
  //   },
  //   [mutateRow],
  // );


  const handleRowCommit = (id, event) => {
    console.log("handleRowCommit id ", id);
    console.log("handleRowCommit events ", event);
  }

  const handleCommit = (e) => {
    const arraycommit = usersData.map((r) => {
      console.log('e.id : ', e.id);
      if (r.id === e.id) {
        const commiteddata = { ...r, [e.field]: e.value };
        setCommitData(commiteddata);
        return { ...r, [e.field]: e.value }
      } else {
        return { ...r }
      }
    })
    // console.log('commiteddata : ', commiteddata);
  }

  const handleUpdate = (e, id, params) => {
    console.log('e : ',e);
    console.log("handleupdate params", params);
    console.log("handleupdate commitData", commitData);

    console.log("handleupdate id", id);
    if (Object.keys(commitData).length == 0) {
      alert("Enter Before Detail Update!")
    } else {
      axios.put(`${base_url}/api/${updateParam}/${id}`, commitData).then(
        (response) => {
          console.log('updated Successfully : ', response);
          console.log('updated Successfully : ', response.data);
          //setUsers(response.data);
        },
        (error) => {
          console.log('error : ', error);
        }
      )
      setEditButton(true);
    }
  }
  const handleCancel = (id) => {
    console.log("handlecancel usersData : ", usersData);
    const userDataRevert = [...usersData]
    console.log("handlecancel userdatarevert: ", userDataRevert);
    setUsersData(userDataRevert);
    setEditButton(true)
  }

  const handleDelete = (id) => {

    if (window.confirm("Do You Want To Delete The Record!") == true) {
      setUsersData(usersData.filter((item) => item.id !== id))
      console.log('handleDelete deleteparam : ', deleteParam);
      axios.delete(`${base_url}/api/${deleteParam}/${id}`).then(
        (response) => {
          console.log('Delete Successfully : ', response);
          console.log('Delete Successfully : ', response.data);
          //setUsers(response.data);
        },
        (error) => {
          console.log('error : ', error);
        }
      )
    } else {
      handleCancel();
    }
    setEditButton(true);

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
        console.log("action id : ", listId);
        console.log('columns paramsId  : ', params.id);
        if (listId == params.id && !editButton) {
          return (
            <div className='userAvatar'>
              <IconButton color="primary" aria-label="save" >
                <SaveAsIcon onClick={(e) => handleUpdate(e, params.row.id, params)} />
              </IconButton>
              <IconButton color="primary" aria-label="cancel" >
                <CancelIcon onClick={() => handleCancel(params.row.id)} />
              </IconButton>
            </div>
          )
        } else {
          return (
            <div className='userAvatar'>
              <IconButton color="primary" aria-label="edit" >
                <EditIcon onClick={() => handleRowEdit(params.row.id, params)} />
              </IconButton>
              <IconButton color="primary" aria-label="delete" >
                <DeleteIcon onClick={() => handleDelete(params.row.id)} />
              </IconButton>
            </div>
          )
        }
      }
    },

    { field: 'id', headerName: 'ID', width: 90 },
    ...dataColumn,

  ];


  return (
    <div style={{ height: '100%', width: '100%', marginBottom: 30 }}>
      <DataGrid
        rows={usersData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        selection
        autoHeight
        // onCellEditCommit={handleCommit}
        // onCellEditStart={cellEditingStart}
        // onRowEditCommit={handleRowCommit}
        // onCellDoubleClick={()=>setEditButton(false)}
        onRowEditStart={cellEditingStart}
        onRowEditStop={handleRowEditStop}
        editMode="row"
        processRowUpdate={processRowUpdate}
        // onSelectionModelChange={(newSelectionModel) => {
        //   setSelectionModel(newSelectionModel);
        // }}
        // selectionModel={selectionModel}
        experimentalFeatures={{ newEditingApi: true }}
        apiRef={apiRef}
      />
    </div>
  );
}
