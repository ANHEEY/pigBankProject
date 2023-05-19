import React, { Component } from "react";
import {List, ListItem, Box,ListSubheader, ListItemButton} from '@mui/joy';
import PdSavingService from "../../contents/product/saving/PdSavingService";
import PdDepositService from "../../contents/product/deposit/PdDepositService";
import PdLoanService from "../../contents/product/loan/PdLoanService";
import NoticeApiService from "../../../../admin/components/contents/csCenter/NoticeApiService";

class MainBoard extends Component{
    constructor(props){
        super(props);

        this.state={
            members1:[],
            members2:[],
            members3:[],
            csboard:[],
            message: null,
            
        }
        
    }
  
    // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링

    componentDidMount(){
        this.reloadMemberList();
        
        
    }
   

    reloadMemberList = () => {
        PdDepositService.fetchMembers()
            .then(res=>{
                this.setState({
                    members1:res.data
                })
            })
            .catch(err=>{
                console.log('reloadMemberList() Error!!',err);
            });

        PdSavingService.fetchMembers()
        .then(res=>{
            this.setState({
                members2:res.data
            })
        })
        .catch(err=>{
            console.log('reloadMemberList() Error!!',err);
        });

        PdLoanService.fetchMembers()
        .then(res=>{
            this.setState({
                members3:res.data
            })
        })
        .catch(err=>{
            console.log('reloadMemberList() Error!!',err);
        });
        NoticeApiService.noticeList()
            .then(res => {
                this.setState({
                    csboard:res.data,
                })
                console.log(res.data);
            })
            .catch(err=>{
                console.log('noticeList() Error!!',err);
            })
    }

    render() {    
        return (
            <div className='container' >
                <div style={{display: 'flex', justifyContent:'space-between'}}>
                    <div >
                        <Box ml={6}>
                            <List variant="outlined" sx={{ width: 250, bgcolor: 'background.body', borderRadius: 'sm',boxShadow: 'sm'}} >
                                <ListItem nested>
                                    <ListSubheader>예금상품추천</ListSubheader>
                                    {this.state.members1.slice(0, 5).map((member1) => (
                                    <List key={member1.dpdName}>
                                        <ListItem>
                                            <ListItemButton>{member1.dpdName}</ListItemButton>
                                        </ListItem>
                                    </List>
                                    ))}
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                    <div >
                        <Box ml={6}>
                            <List variant="outlined" sx={{ width: 250, bgcolor: 'background.body', borderRadius: 'sm',boxShadow: 'sm'}} >
                                <ListItem nested>
                                    <ListSubheader>적금상품추천</ListSubheader>
                                    {this.state.members2.slice(0, 5).map((member2) => (
                                    <List key={member2.spdname}>
                                        <ListItem>
                                            <ListItemButton>{member2.spdname}</ListItemButton>
                                        </ListItem>
                                    </List>
                                    ))}
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                    <div>    
                        <Box  ml={6}>
                            <List variant="outlined" sx={{ width: 250, bgcolor: 'background.body', borderRadius: 'sm', boxShadow: 'sm'}} >
                                <ListItem nested>
                                    <ListSubheader>대출상품추천</ListSubheader>
                                    {this.state.members3.slice(0, 5).map((member3) => (
                                    <List key={member3.lpdName}>
                                        <ListItem>
                                            <ListItemButton>{member3.lpdName}</ListItemButton>
                                        </ListItem>
                                    </List>
                                     ))}
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                    <div>              
                        <Box  ml={6}>
                            <List variant="outlined" sx={{ width: 350, bgcolor: 'background.body', borderRadius: 'sm', boxShadow: 'sm'}}>
                                <ListItem nested>
                                    <ListSubheader>공지사항</ListSubheader>
                                    {this.state.csboard.filter((board) => board.nshow !== 'N').slice(0, 5).map((board) => (
                                    <List key={board.nnum}>
                                        <ListItem>
                                            <ListItemButton>{board.ntitle}</ListItemButton>
                                        </ListItem>
                                    </List>
                                        ))}
                                </ListItem>
                            </List>
                        </Box>
                    </div>
                </div>
            </div>
        )
    }
}
export default MainBoard;