import { Component } from "react";
import piggy_bank from "../../resources/images/admin.png";

class MainComponents extends Component{
    render(){
        return(
            <div style={{textAlignLast:'center'}}>
                <img src = {piggy_bank} style={{width : '100%'}}/>
            </div>
        )
    }
}
export default MainComponents;