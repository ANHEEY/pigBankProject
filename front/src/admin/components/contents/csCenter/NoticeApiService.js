import axios from 'axios'; // npm install -f axios@^1.3.5
// - ApiService는 스프링부트 서버(보통 'http://localhost:8080/' 으로 열린다.)와 연결해주는 역할을 한다.
// - 리액트에서 무언가 요청을 하면 이를 스프링부트에서 받아 Oracle에서 데이터를 가져오거나 연결해주는 역할을 한다.
// - 전형적인 MVC 패턴이라고 할 수 있다.
// - 리액트에서 이를 구현하기 위해선 Axios를 사용한다. 기존 HTML이나 JSP에서 사용한 AJAX 역할을 한다고 생각하면 된다.
// - npm install -f axios@^1.3.5

const noticeList = "http://localhost:8081/noticeList";
const checkonenotice = "http://localhost:8081/checkonenotice";
const changenotice = "http://localhost:8081/changenotice";
const deletenotice = "http://localhost:8081/deletenotice";
const addnotice = "http://localhost:8081/addnotice";
const csboardDetail = "http://localhost:8081/csboardDetail";

class NoticeApiService {

    // 공지사항 list
    noticeList() {
        return axios.get(noticeList);
    }    
    // 공지사항 하나
    checkoneNotice(nnum) {
        console.log(nnum);
        return axios.get(checkonenotice , {params: {nNum: nnum}});
    }
    // 공지사항 변경
    changeshow(changeval) {
        return axios.post(changenotice, changeval);
    }
    // 공지사항 삭제
    noticedelete(nnum) {
        return axios.post(deletenotice, nnum);
    }
    // 공지사항 추가
    noticeadd(notice) {
        return axios.post(addnotice, notice);
    }
    // 공지사항 고객 상세 + 조회수
    csboardDetail(nnum) {
        console.log(nnum)
        return axios.get(csboardDetail, {params: {nNum: nnum}});
    }
    
}
export default new NoticeApiService();