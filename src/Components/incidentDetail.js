import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import NavBar from "./NavBar";
import swal from 'sweetalert';
import {username ,password,url} from '../AuthConfig';
const IncidentDetail = () => {

    //define all state required to be dispalyed 
    const {sys_id} = useParams()
    const [number,
        setNumber] = useState("")
    const [state,
        setState] = useState("")
    const [caller,
        setCaller] = useState("")
    const [impact,
        setImpact] = useState("")
    const [urgency,
        seturgency] = useState("")
    const [priority,
        setpriority] = useState("")
    const [catagory,
        setcatagory] = useState("")
    const [shortDescription,
        setShortDescription] = useState("")
    const [decription,
        setDecription] = useState("")
     // Api get method Configration are defined in ConfigGet variable
    var configGet = {
        method: 'get',
        url: `${url}/incident?sysparm_query=sys_id=${sys_id}&sysparm_display_value=true&sysparm_limit=10`,
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Basic '+btoa(username+':'+password)
        }
    };
     // Api put method Configration are defined in ConfigPet variable for updating data
    var configPut = {
        method: 'put',
        url: `${url}/incident/${sys_id}`,
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Basic '+btoa(username+':'+password)
        },
        data: {
            "short_description": shortDescription !== undefined
                ? shortDescription
                : '',
            "description": decription !== undefined
                ? decription
                : '',
            "state": state === 'New'
                ? '1'
                : state === "Closed" || state === 'On Hold'
                    ? '3'
                    : state === 'In Progress'
                        ? '2'
                        : state === 'Canceled'
                            ? '4'
                            : state === 'Resolved'
                                ? '6'
                                : '1'
        }
    };
    //onload get teh value using sys_id passed by paramter
    useEffect(() => {
     
        axios(configGet).then((response) => {
            setCaller(response.data.result[0].caller_id.display_value)
            setNumber(response.data.result[0].number)
            setState(response.data.result[0].state)
            setImpact(response.data.result[0].impact)
            seturgency(response.data.result[0].urgency)
            setShortDescription(response.data.result[0].short_description)
            setDecription(response.data.result[0].description)
            setcatagory(response.data.result[0].category)
            setpriority(response.data.result[0].priority)

        })

    }, [])
    //function to update incdent record
    function UpdateIncident(e) {
        e.preventDefault();

       
        axios(configPut).then((res) => {

            swal("Updated!", "Record Updated sucessfuly!", "success");
        })
    }

    return (
        <div>
            <NavBar></NavBar>
            <form class="row g-3 p-5" onSubmit={UpdateIncident}>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Number</label>
                    <input
                        type="email"
                        disabled
                        value={number}
                        class="form-control"
                        id="inputEmail4"></input>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">State</label>
                    <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        id="inputState"
                        class="form-select">
                        <option selected>--None--</option>
                        <option value="New">New</option>
                        <option value="In Progress">In Progress</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Caller</label>
                    <input
                        value={caller}
                        disabled
                        type="text"
                        class="form-control"
                        id="inputEmail4"></input>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Impact</label>
                    <select value={impact} disabled id="inputState" class="form-select">
                        <option selected>--None--</option>
                        <option value='1 - High'>High
                        </option>
                        <option value='3 - Low'>Low</option>
                        <option value='2 - Medium'>Medium</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Category</label>
                    <select value={catagory} disabled id="inputState" class="form-select">
                        <option selected>--None--</option>
                        <option value="Inquiry / Help">Inquiry/Help
                        </option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Harware</option>
                        <option value="Network">Network</option>
                        <option value="Database">Database</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Urgency</label>
                    <select value={urgency} disabled id="inputState" class="form-select">
                        <option selected>--None--</option>
                        <option value='1 - High'>High
                        </option>
                        <option value='3 - Low'>Low</option>
                        <option value='2 - Medium'>Medium</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Priority</label>
                    <input
                        value={priority}
                        disabled
                        type="text"
                        class="form-control"
                        id="inputPassword4"></input>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Short Description</label>
                    <input
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        type="text"
                        class="form-control"
                        id="inputAddress"></input>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Description</label>

                    <textarea
                        value={decription}
                        onChange={(e) => setDecription(e.target.value)}
                        class="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"></textarea>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>

        </div>
    );
}

export default IncidentDetail;