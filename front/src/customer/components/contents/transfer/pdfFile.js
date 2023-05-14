import React from "react";
import { Document, Page, Text, pdf, Font} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import NanumGothic from "../../../resources/text/NanumGothic.ttf";

Font.register({
    family: "NanumGothic",
    format: "truetype",
    src: NanumGothic,
  });
  

function PDFDownloadComponent(props) {
    const { selectedAccount, selectedMyAccount, myname, myMemo, tAmount } = props.data;
  

    const acNum = (acNumber) => {
      const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
      return acNum;
    };
    const downloadPDF = async () => {
      const doc = (
        <Document>
          <Page>
            <Text style={{ fontFamily: "NanumGothic" }}>
                출금계좌: {acNum(selectedAccount)} <br />
            </Text>
            <Text style={{ fontFamily: "NanumGothic" }}>
                입금계좌: {acNum(selectedMyAccount)} <br />
            </Text>
            <Text style={{ fontFamily: "NanumGothic" }}>
                입금자명: {myname}<br />
            </Text>
            <Text style={{ fontFamily: "NanumGothic" }}>
                내 메모: {myMemo}<br />
            </Text>
            <Text style={{ fontFamily: "NanumGothic" }}>
                이체 금액: {tAmount}원<br />
            </Text>
          </Page>
        </Document>
      );
  
      const asBlob = await pdf(doc).toBlob();
  
      // PDF 다운로드
      saveAs(asBlob, "example.pdf");
    };
  
    return (
      <div>
        <button onClick={downloadPDF}>PDF 다운로드</button>
      </div>
    );
  }
  
  export default PDFDownloadComponent;