import { Component } from "react";
import piggy_bank from "../../resources/images/piggy_bank.jpg"

class MainComponents extends Component{
    render(){
        return(
            <>
                <img src = {piggy_bank} style={{width : '90%'}}/>
            </>
        )
    }
}
export default MainComponents;