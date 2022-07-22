import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import Loading from "./loadingComponent";
import swal from 'sweetalert';
import {username ,password,url} from '../AuthConfig';
function Home() {
    // .All data feched from servicenow incident table willbe storedin allIncidnts
    // state is it constant Displayed table data is stored in indidents state is
    // configrable E.g when searching filter data from all incdent and set the new
    // variable  filtered to incident state

    const [incidents,
        setIncidents] = useState({})
    const [allIncidents,
        setallIncidents] = useState({})
    const [refresh,
        setRefresh] = useState(0)

    // Api get method Configration are defined in ConfigGet variable

    var configGet = {
        method: 'get',
        url:    `${url}/incident?sysparm_display_valu` +
                `e=true&sysparm_limit=300`,
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Basic '+btoa(username+':'+password)
        }
    };
    //on create fretung data from api using axios is called
    useEffect(() => {
        axios(configGet).then((response) => {
            setIncidents(response.data.result);
            setallIncidents(response.data.result)
        })

    }, [refresh])

    //deleteIncdent Function To delete incident
    function deleteIncident(sys_id) {
        //configDelete is a varable for the configration of delete api request
        var configDelete = {
            method: 'delete',
            url: `${url}/incident/${sys_id}`,
            headers: {
                'access-control-allow-origin': '*',
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Basic '+btoa(username+':'+password)
            }

        }
        axios(configDelete).then((response) => {
            swal("Deleted", "Record Deleted!", "error");
            setRefresh(refresh + 1)

        })
    }

    //function search sort all incdent useing a keyword from user
    function search(keyword) {
        var filteredData = allIncidents.filter((item) => item.number.toLowerCase().indexOf(keyword.toLowerCase()) > -1)
        setIncidents(filteredData)
    }
    return (
        <div className="Home">

            <NavBar></NavBar>
            <div className="m-5">
                <div className="input-group">
                    <div className="form-outline">
                        <input
                            type="search"
                            id="form1"
                            placeholder="Search"
                            onChange={(e) => search(e.target.value)}
                            className="form-control"/>

                    </div>
                    
                </div>
                <table className="table table-striped ">

                    <thead>
                        <tr >
                            <th scope="col">Number</th>
                            <th scope="col">Short Description</th>
                            <th scope="col">Caller</th>
                            <th scope="col">Priority</th>
                            <th scope="col">State</th>
                            <th scope="col">Category</th>
                            <th scope="col">Assignment Group</th>
                            <th scope="col">Assigned To</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {allIncidents.length > 0
                            ? incidents
                                ?.map((incident) => (

                                    <tr key={incident.number}>

                                        <th scope="row">
                                            <Link to={'/' + incident.sys_id}>{incident.number}</Link>
                                        </th>
                                        <td>{incident.short_description}</td>
                                        <td>{incident.caller_id.display_value}</td>
                                        <td>{incident.priority}</td>
                                        <td>{incident.state}</td>
                                        <td>{incident.category}</td>
                                        <td>{incident.assigned_to.display_value}</td>
                                        <td>{incident.assignment_group.display_value}</td>
                                        <td>
                                            <button
                                                onClick={(e) => {
                                                deleteIncident(incident.sys_id)
                                            }}
                                                type="button"
                                                className="btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                ))
                                : <Loading ></Loading>}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;
