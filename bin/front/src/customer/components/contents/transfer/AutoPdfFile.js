import React from "react";
import { Document, Page, Text, pdf, Font} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import NanumGothic from "../../../resources/text/NanumGothic.ttf";

Font.register({
    family: "NanumGothic",
    format: "truetype",
    src: NanumGothic,
  });
  
function AutoPDFDownloadComponent(props) {
    // AutoTransAccept.js 부모컴포넌트에서 값 받아와서 pdfFile 만들어주기
    const { selectedAccount , selectedMyAccount, myname, myMemo, tAmount, transferCycle,startDate,endDate } = props.data;
  

    const acNum = (acNumber) => {
      const acNum = acNumber.toString().slice(0, 3) + "-" + acNumber.toString().slice(3);
      return acNum;
    };
    const downloadPDF = async () => {
      const doc = (
        <Document>
          <Page>
            <Text style={styles.header}>
                자동 이체 결과
            </Text>
            <Text style={styles.text}>
              ● 출금계좌: {acNum(selectedAccount)} 
            </Text>
            <Text style={styles.text}>
              ● 입금계좌: {acNum(selectedMyAccount)} 
            </Text>
            <Text style={styles.text}>
              ● 입금자명: {myname}
            </Text>
            <Text style={styles.text}>
              ● 내 메모: {myMemo}
            </Text>
            <Text style={styles.text}>
              ● 이체 금액: {tAmount}원
            </Text>
            <Text style={styles.text}>
              ● 이체 주기: {transferCycle}개월
            </Text>
            <Text style={styles.text}>
              ● 이체 시작 날짜: {startDate}{' '} ● 이체 끝나는 날짜: {endDate}
            </Text>
          </Page>
        </Document>
      );
      const asBlob = await pdf(doc).toBlob();
      // PDF 다운로드
      saveAs(asBlob, "자동이체등록.pdf");
    };
  
    return (
      <div>
        <button className="btnbtnpdf trnspdf" onClick={downloadPDF}>PDF 다운로드</button>
      </div>
    );
  }

  const styles = {
    text: {
      fontFamily: "NanumGothic",
      fontSize: 12,
      marginBottom: 10,
    },
    header: {
      fontFamily: "NanumGothic",
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
  };
  
  export default AutoPDFDownloadComponent;