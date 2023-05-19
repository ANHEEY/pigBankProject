import React, { useEffect, useState } from "react";
import { useParams ,useNavigate} from 'react-router-dom';
import '../../../resources/css/fund/fund-list.css'
import FundAPIService from "./service/FundAPIService";
import { getAuthToken, getId } from "../../helpers/axios_helper";
import axios from "axios";
import {Box} from "@mui/material";
import Pagination from "@mui/material/Pagination";


export default function FundAccountDetail() {
    // url�먯꽌 id媛믪쓣 諛쏆븘�ㅻ뒗  useParams 
    const { fnum } = useParams(); 
    const navigate = useNavigate();
    const [itemsPerPage] = useState(30);
    const [currentPage, setCurrentPage] = useState(1);
    const [detail, setDetail] = useState([]); 

    useEffect(() => { 
        if (getAuthToken() !== null) { 
            axios.defaults.headers.common['Authorization'] = `Bearer ${getAuthToken()}`; 
        } else { 
            axios.defaults.headers.common['Authorization'] = ``; 
        } 
        FundAPIService.fundAccountDetail(fnum) 
            .then(res => { 
                setDetail(res.data); 
            }) 
            .catch(err => { 
                console.log('FundAccountDetail �먮윭', err); 
            }) 
    }, []) 

    const handlePageChange = (event, pageNumber) => { setCurrentPage(pageNumber);};
    const goBack=() =>{navigate(-1)}
    function loCale(number) {return Number(number).toLocaleString();} 
    

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const fundlist = detail.slice(indexOfFirstItem, indexOfLastItem);

    return ( 
        <div className="fundProduct-list fund-div"> 
            <div className="title_div"> 
                <p className="fund-title"> 
                    ���쒓퀎醫� 嫄곕옒�댁뿭 
                </p>
            </div> 
            <table className="fund-listTbl"> 
                <thead> 
                    <tr> 
                        <th>���쒓굅�섎쾲��</th> 
                        <th>嫄곕옒醫낅ぉ紐�</th> 
                        <th>嫄곕옒�좎쭨</th> 
                        <th>留ㅼ닔�곹깭</th> 
                        <th>留ㅼ닔/留ㅻ룄媛�</th> 
                        <th>�섎웾</th> 
                        <th>珥앷굅�섍툑��</th> 
                    </tr> 
                </thead> 
                <tbody> 
                    {detail.length === 0 ? ( 
                        <tr> 
                            <td colSpan={7}>嫄곕옒�댁뿭�� �놁뒿�덈떎.</td> 
                        </tr> 
                    ) : 
                        detail.map((detail) => ( 
                            <tr key={detail.ftransNum}> 
                                <td className="fundNm">{detail.ftransNum}</td> 
                                <td className="fundNm">{detail.fpdName}</td> 
                                <td className="priceSpan"> 
                                    {new Date(detail.ftransDate).getFullYear()}�� &nbsp; 

                                    {new Date(detail.ftransDate).getMonth() + 1}�� &nbsp; 
                                    {new Date(detail.ftransDate).getDate()}�� 
                                </td> 
                                <td> 
                                    {(detail.fdetailState) ==='留ㅼ닔' ?( 
                                        <span className="plusPre">留ㅼ닔</span> 
                                    ):( 
                                        <span className="minusPre">留ㅻ룄</span> 
                                    )} 
                                </td> 
                                <td> 
                                    {(detail.fdetailState) ==='留ㅼ닔' ?( 
                                        <span className="plusPre">�� {loCale(detail.fbuyPrice)}</span> 
                                    ):( 
                                        <span className="minusPre">�� {loCale(detail.fsellPrice)}</span> 
                                    )} 
                                </td> 
                                <td className="priceSpan">{detail.fcount}</td> 
                                <td className="priceSpan">{loCale(detail.ftotal)}��</td> 
                            </tr> 
                        ))} 
                </tbody>
                <tfoot>
                    <tr style={{height:'100px'}}>
                        <td colSpan={7} style={{textAlign:"center"}}>
                            <Box display="flex" justifyContent="center">
                                <Pagination 
                                count={Math.ceil(detail.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handlePageChange}
                                />
                            </Box>
                        </td>
                    </tr>
                    <tr style={{height:'50px'}}>
                        <td colSpan={7}>
                            <button onClick={goBack}>�ㅻ줈媛�湲�</button>
                        </td>
                    </tr>
                </tfoot>
            </table> 

        </div> 
    ) 
} 