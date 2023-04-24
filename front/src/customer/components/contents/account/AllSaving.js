// 전체조회
import React, { Component } from "react";
import '../../../resources/css/AllStyle.css';
import AllService from "./AllService";

class AllSaving extends Component{
    
        
        constructor(props){
            super(props);
    
            this.state={
                members:[],
                message: null,
                
            }
        }
      
        // 라이프 사이클 중 컴포넌트가 생성된 후 사용자에게 보여지기까지의 전체 과정을 랜더링
    
        componentDidMount(){
            this.reloadMemberList();
        }
    
        reloadMemberList = () => {
            AllService.fetchSaving()
                .then(res=>{
                    this.setState({
                        members:res.data
                    })
                })
                .catch(err=>{
                    console.log('reloadMemberList() Error!!',err);
                });
          }
          render() {  

          return (
            <main className="main">
              <section className="section">
               
              </section>
              
              <section className="section">
                <div className="container">
                  <ul>
                      {this.state.members.map((member) => (
                          <li key={member.snum}>
                              <p>{member.spdName}</p>
                              <p>{member.samount}</p>
                              <p>{member.sendDate}</p>
                              <p>{member.sjoinDate}</p>
                          </li>
                      ))}
                  </ul>
                  </div>
                  </section>
                </main>
                );
          }
        
    
}

export default AllSaving;