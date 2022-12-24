//Step1: Import AuthContext, useNavigate, useContext, useEffect  
import React,{useContext,useEffect,useState} from 'react'
import { AuthContext } from '../Context/Auth';
import { useNavigate } from "react-router-dom";

//Step-User1: Import following Libraries and define baseURL
import axios from "axios";
import DisplayMessage from "../Components/DisplayMessage";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
const baseURL = "http://localhost:4100";

//Step-user2a:  show spinner, modal, button, ButtonGroup, table, pagination by searching React Bootstrap and later going to components
//Move to  index.js and copy the code for //es6

//step-user3: Define the data field
const columns = [
{
  dataField: "_id",
  text: "ID",
  hidden:true,
},
{
  dataField: "name",
  text: "User Name",
  sort:true,
},
{
  dataField: "email",
  text: "Email",
},
{
  dataField: "phone",
  text: "Phone",
  sort:true,
},
]


const Users = () => {
  
// Step2: Now check islogin status and if it is true then only navigate to Dashboard
let navigate = useNavigate();
const { isLogin, token } = useContext(AuthContext);


//Step-user4: define the following variables and change setIsLogin to token for above
const [dataSource, setDataSource] = useState([]);
const [loading, setLoading] = useState(false);
const [totalDocs, setTotalDocs] = useState(0);
const [showError, setShowError] = useState("");
const [show, setShow] = useState(false);
const [selectedrow, setSelectedrow] = useState(0);

//step-user6:define getdata() entirely,

const getdata = async () => {
  setLoading(true);
  axios
    .get(`${baseURL}/users?page=1&limit=100`)
    .then((res) => {
      console.log(res.data.docs);
      const data = res.data.docs.map((rec) => {
        return {
          ...rec,
          key: rec._id,
        };
      });
      console.log(data);
      setDataSource(data);
      setTotalDocs(res.data.totalDocs);
      setLoading(false);
    })
    .catch((err) => {
      setShowError(err);
      setLoading(false);
    });
};
console.log(`Token is :  ${token}`);
console.log("Total Docs: " + totalDocs);

//step-user5: Add the else condition to existing userEffect() below;
useEffect(() => {
  if (!isLogin) {
    navigate("/", { replace: true });
  } else{
    getdata();
  }
}, []);

////Step-user12 : Define sizePerPageRenderer for the Page numbers, arrow etc. (bootstrap code)
  //Google search react-bootstrap-table2-paginator --> https://react-bootstrap-table.github.io/react-bootstrap-table2
  //-> Live Demo for Pagination --> Pagination --> Custom sizePerPage
  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <div className="btn-group" role="group">
      {options.map((option) => {
        const isSelect = currSizePerPage === `${option.page}`;
        return (
          <button
            key={option.text}
            type="button"
            onClick={() => onSizePerPageChange(option.page)}
            className={`btn ${isSelect ? "btn-secondary" : "btn-warning"}`}
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );

  const options = {
    sizePerPageRenderer,
  };

  // Step-user13: Define rowEvents()
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      console.log(`clicked on row with index: ${rowIndex}`);
      console.log(row.key);
      setSelectedrow(row);
    },
  };


  // step-user14: showError and display message
  showError && (
    <DisplayMessage
    errortext={showError}
    errorFunc={setShowError}
    ></DisplayMessage>
  )


//Step-user8b: Define the below variables, TEST, at end of this you should see ADD, EDIT and Delete button on User screen
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const rowClasses = (row, rowIndex) => {
  if (row.key === selectedrow.key) {
    return "custom-row-class";
  }
};


// Step-user10: define handleDelete
const handleDelete = () => {
  // console.log(key);

  axios
  .delete(`${baseURL}/users/${selectedrow.key}`)
  .then((res) => {
    const newData = dataSource.filter(
      (item) => item.key !== selectedrow.key
    );
    setDataSource(newData);
    handleClose();
  })
  .catch((err) => {
    handleClose();
    setShowError(err);
  });
};


//step3: Now conditionally,if isLogin is true then only display Users page

  //Step-user7: Modify the return to handle user data first <div>, <BootstrapTable,
  //Add "header-class"  TEST and show students the console output

  /*return (
    isLogin && (
      <div style={{ margin: "20px" }}> 
          <BootstrapTable
              striped
              hover
              condensed
              keyField="id"
              data={dataSource}
              columns={columns}
              bordered={false}
              noDataIndication="No Records Found"
              pagination={paginationFactory()}
              headerClasses="header-class"
          />
      </div>     
    )   
  );*/



  //Step-user8a, post previous step testing, comment out the code and rewrite the  return skeletion and all three buttons
  
  
  
  
  return (
    isLogin && (
      <div style={{ margin: "20px" }}>
        {!loading ? (
          <>
          <div className=" bg-light d-flex justify-content-end h-auto">
                <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-2" aria-label="First group">
                      <Button
                          variant="primary"
                          className="mx-2"
                          onClick={handleShow}
                          size="sm"
                          active
                        >
                          Add
                      </Button>
                      <Button
                          variant="warning"
                          className="mx-2"
                          onClick={handleShow}
                          size="sm"
                          active
                        >
                          Edit
                      </Button>
                      <Button
                          variant="danger"
                          className="mx-2"
                          onClick={handleShow}
                          size="sm"
                          active
                      >
                        Delete
                    </Button>                

                    </ButtonGroup>
                </ButtonToolbar>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to delete this record?
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDelete}>
                    Delete
                  </Button>
                </Modal.Footer>
            </Modal>
          
          </>
        ) : (
          <Spinner animation="grow" variant="warning" />
        )}
      </div>    
    ) 
  
   )

}


export default Users
