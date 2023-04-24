import { Component } from "react";

class NoticeDetailCoponent extends Component{
    render(){
        return(
            <div>
                <h1>공지사항 상세페이지</h1>
                <div>
                SELECT * FROM notice_tbl WHERE n_num = ? AND n_show = 'y';
                    
                </div>
            </div>            
        )
    }
}
export default NoticeDetailCoponent;