package com.pigbank.project.dao;



import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.pigbank.project.dto.ExchangeRateDTO;

@Repository
public class Exchange {
	
	@Autowired
    private SqlSession sqlSession;

    public void exchangeList(ExchangeRateDTO exchangeRate) {
    	System.out.println("dao"+ exchangeRate);
        sqlSession.update("com.pigbank.project.dao.Exchange.exchangeList", exchangeRate);
    }

}
