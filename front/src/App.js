/* eslint-disable */
// react 부가기능 > warining 경고 안뜨게 설정
import { BrowserRouter, Route,Routes, Link } from "react-router-dom";
import LayoutC from "./customer/components/common/Layout";
import LayoutA from "./admin/components/common/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" Component={LayoutA} />
          <Route path="/*" Component={LayoutC} />
          {/* <Route path="/customer/*" Component={LayoutC} /> */}
        </Routes>
          {/* <Link to ="/admin/*">관리자</Link>
          <Link to ="/customer/*">고객</Link> */}
      </BrowserRouter>
    </div>
  );
}
export default App;
