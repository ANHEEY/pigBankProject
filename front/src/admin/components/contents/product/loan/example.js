import React, { Component } from 'react';
import { Table, Typography, Button, TableCell, TableHead, TableBody, TableRow } from '@mui/material';
import ApiService from '../../ApiService';
import { Create, Delete } from '@mui/icons-material'; //npm install -f @mui/icons-material@^5.11.16

 class ListMemberComponent extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            message: null
        }
    }

    // 라이프사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링
    componentDidMount() {
        this.reloadMemberList();
    }

    // list
    reloadMemberList = () => {
        ApiService.fetchMembers()
        .then(res => {
            this.setState({
               members : res.data  
            })
        })
        .catch(err => {
            console.log('reloadMemberList() Error!', err);
        });
    }

    // insert
    addMember = () => {
        window.localStorage.removeItem("memberID");
        this.props.history.push('/add-member'); // RouterComponent.js의 <Route path="/add-member" component={AddMemberComponent} /> 호출    
    }

    // update
    editMember = (ID) => {
        window.localStorage.setItem("memberID", ID);
        this.props.history.push('/edit-member');
    }

    // delete
    deleteMember = (memberID) => {
        ApiService.deleteMember(memberID)
        .then(res => {
            this.setState({
                message: '성공적으로 삭제되었습니다.'
            })
            this.setState({
                members: this.state.members.filter(member =>
                    member.id !== memberID)       
            });       
        })
        .catch(err => {
                console.log('deleteMember() 에러!', err);
        });

    }

    render() {
        return(
            <div>
                <Typography variant="h4" style={style}>MemberList</Typography>
                <Button variant="contained" color="primary" onClick={this.addMember}> Add Member </Button>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Salary</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.members.map(member => 
                            <TableRow key={member.id}>
                                <TableCell component="th" scope="member"> {member.id} </TableCell>
                                <TableCell>{member.username}</TableCell>
                                <TableCell>{member.age}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.address}</TableCell>
                                <TableCell>{member.salary}</TableCell>
                                <TableCell onClick={() => this.editMember(member.id)}>
                                    <Create />
                                </TableCell>
                                <TableCell onClick={() => this.deleteMember(member.id)}>
                                    <Delete />
                                </TableCell>
                            </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        )
    }
 }

 const style = {
    display: 'flex',
    justifyContent: 'center'
 }

 export default ListMemberComponent;