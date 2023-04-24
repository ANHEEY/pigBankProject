 // 예금 상품
 import React, { Component } from "react";
 
 import AllService from "./AllService";
 import '../../../resources/css/AllStyle.css';
 
  
 class AllDeposit extends Component{


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
        AllService.fetchDeposit()
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
                    <li key={member.dnum}>
                        <p>{member.dpdName}</p>
                        <p>{member.damount}</p>
                        <p>{member.dendDate}</p>
                        <p>{member.djoinDate}</p>
                    </li>
                ))}
            </ul>

              </div>
            </section>
          </main>
        );
      }
}
 
  export default AllDeposit;
 
 