package com.pigbank.project.dao;





import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pigbank.project.dto.ExchangeRateDTO;
import com.pigbank.project.dto.ExchangeRateDTO2;

@Repository
public class Exchange {
	
	@Autowired
    private SqlSession sqlSession;

    public void exchangeList(ExchangeRateDTO exchangeRate) {
    	System.out.println("dao - 환율업데이트");
        sqlSession.update("com.pigbank.project.dao.Exchange.exchangeList", exchangeRate);
    }
    
    public void exchangeList2(ExchangeRateDTO2 exchangeRate) {
    	System.out.println("dao - 환율업데이트");
        sqlSession.update("com.pigbank.project.dao.Exchange.exchangeList2", exchangeRate);
    }

}