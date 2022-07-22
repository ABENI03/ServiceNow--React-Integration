import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import swal from 'sweetalert';
import {username ,password,url} from '../AuthConfig';


const NewIncident = () => {

    //deifne all fields fror new incident   

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
        setpriority] = useState("5 ")
    const [catagory,
        setcatagory] = useState("")
    const [subcataeory,
        setSubCategory] = useState("")
    const [short_description,
        setShortDescription] = useState("")
    const [decription,
        setDecription] = useState("")

    const[users,setUsers]=useState("")
    //configration for post api request

    var configPost = {
        method: 'post',
        url: `${url}/incident`,
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Basic ' + btoa(username+':'+password)
        },
        data: {

            "caller_id":caller,
            "state": state,
            "impact": impact,
            "category": catagory,
            "urgency": urgency,
            "subcategory": subcataeory,
            "priority": priority,
            "description": decription,
            "short_description": short_description

        }
    };

    var configGet = {
        method: 'get',
        url: `${url}/sys_user`,
        headers: {
            'access-control-allow-origin': '*',
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Basic ' +btoa(username+':'+password)
        },
        
    };
    // function to create new Incident
    function CreateNew(e) {
        e.preventDefault();

        axios(configPost).then((response) => {

            swal(` Incident ${response.data.result.number} Created! `, "Record Created sucessfuly!", "success");
            window
                .location
                .replace(`/${response.data.result.sys_id}`)
        })

    }
    //onload load all users from servicenow 
    useEffect(()=>{
        axios(configGet).then((response)=>{setUsers(response.data.result)})
       
    },[])
    return (
        <div>
            <NavBar></NavBar>

            <form onSubmit={CreateNew} class="row g-3 p-5">
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Number</label>
                    <input
                        type='number'
                        value={number}
                        disabled
                        onChange={(e) => setNumber(e.target.value)}
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
                        <option value="1">New</option>
                        <option value="2">In Progress</option>
                        <option value="3">On Hold</option>
                        <option value="6">Resolved</option>
                        <option value="3">Closed</option>
                        <option value="4">Canceled</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="exampleDataList" class="form-label">Caller</label>
                    <input value={caller} onChange={(e)=>setCaller(e.target.value)} class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..."></input>
                        <datalist  id="datalistOptions">
                           {users.length > 0
                            && users?.map((user) => (

                                <option key={user.sys_id} value={user.sys_id}>{user.name}</option>
                       
                        
                        ))
                           } 
                           
                            
                        </datalist>

                       </div>
                                        <div class="col-md-6">
                                            <label for="inputPassword4" class="form-label">Impact</label>
                                            <select
                                                value={impact}
                                                onChange={(e) => setImpact(e.target.value)}
                                                id="inputState"
                                                class="form-select">
                                                <option selected>--None--</option>
                                                <option value='1'>High
                                                </option>
                                                <option value='3'>Low</option>
                                                <option value='2'>Medium</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <label for="inputEmail4" class="form-label">Category</label>
                                            <select
                                                value={catagory}
                                                onChange={(e) => setcatagory(e.target.value)}
                                                id="inputState"
                                                class="form-select">
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
                                            <select
                                                value={urgency}
                                                onChange={(e) => seturgency(e.target.value)}
                                                id="inputState"
                                                class="form-select">
                                                <option selected>--None--</option>
                                                <option value='1'>High
                                                </option>
                                                <option value='3'>Low</option>
                                                <option value='2'>Medium</option>
                                            </select>
                                        </div>

                                        <div class="col-md-6">
                                            <label for="inputPassword4" class="form-label">Priority</label>
                                            <select
                                                value={priority}
                                                onChange={(e) => setpriority(e.target.value)}
                                                id="inputState"
                                                class="form-select">
                                                <option value='1'>1 - Critical
                                                </option>
                                                <option value='3'>3 - Moderate</option>
                                                <option value='2'>2 - High</option>
                                                <option value='4'>4 - Low</option>
                                                <option selected value='5'>5 - Planning</option>
                                            </select>
                                        </div>
                                        <div class="col-12">
                                            <label for="inputAddress" class="form-label">Short Description</label>
                                            <input
                                                required
                                                value={short_description}
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
                                            <button type="submit" class="btn btn-primary">Create</button>
                                        </div>
                                    </form>

                                </div>
                                );
}

                                export default NewIncident;