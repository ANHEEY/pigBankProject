import React, { Component } from "react";
import ApiService from "../../ApiService";
import { Typography, TextField, Button } from "@mui/material";

class EditMemberComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            password: '',
            username: '',
            age: '',
            email: '', 
            address: '',
            salary: '',
            message: null
        }
    }

    componentDidMount() {
        this.loadMember();
    }

    loadMember = () => {
        ApiService.fetchMemberById(window.localStorage.getItem("memberID"))
            .then(res => {
                let member = res.data;
                this.setState({
                    id: member.id,
                    password : member.password,
                    username : member.username,
                    age : member.age,
                    email: member.email,
                    address : member.address,
                    salary : member.salary
                })
            })
            .catch(err => {
                console.log('loadMember() Error !!', err);
            })
    }
    
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });        

    }

    editMember = (e) => {
        e.preventDefault();
        
        let member = {
            id: this.state.id,
            password : this.state.password,
            username : this.state.username,
            age : this.state.age,
            email: this.state.email,
            address : this.state.address,
            salary : this.state.salary
            }

        ApiService.editMember(member)
            .then(res => {
                this.setState({
                    message: member.username + '님 정보가 성공적으로 수정되었습니다.'
                })
                console.log(this.state.message);
                this.props.history.push('/members');   // RouterComponent.js / ListMemberComponent 호출        
            })
            .catch(err => {
                    console.log('editMember() 에러!', err);
            });
    }
    
    render() {
        return(
            <div align="center">
               <Typography variant="h4">EditMember</Typography>
                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="ID : "
                        type="text"
                        name="id"
                        value={this.state.id}/> <br/>

                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="Password : "
                        type="password"
                        name="password"
                        value={this.state.password} 
                        placeholder="Edit your Password" 
                        onChange={this.onChange} /> <br/>

                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="Username : "
                        type="text"
                        name="username"
                        value={this.state.username} 
                        placeholder="Edit your username" 
                        onChange={this.onChange} /> <br/>
                    
                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="Age : "
                        type="text"
                        name="age"
                        value={this.state.age} 
                        placeholder="Edit your age" 
                        onChange={this.onChange} /> <br/>

                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="Email : "
                        type="text"
                        name="email"
                        value={this.state.email} 
                        placeholder="Edit your email" 
                        onChange={this.onChange} /> <br/>
                    
                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="Address : "
                        type="text"
                        name="address"
                        value={this.state.address} 
                        placeholder="Edit your address" 
                        onChange={this.onChange} /> <br/>
                    
                    <TextField 
                        required
                        id="standard-required"
                        variant="standard"
                        label="Salary : "
                        type="text"
                        name="salary"
                        value={this.state.salary} 
                        placeholder="Edit your salary" 
                        onChange={this.onChange} /> <br/>
                    
                <Button variant="container" color="primary" onClick={this.editMember}>Edit</Button>   
            </div>
        )
    }
}
export default EditMemberComponent;