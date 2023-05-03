package com.pigbank.project.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dao.Exchange;
import com.pigbank.project.dto.AccountDTO;
import com.pigbank.project.dto.ExchangeRateDTO;
import com.pigbank.project.dto.ExchangeRateDTO2;



@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class WebCrawlController {
	
	private static final Logger logger = LoggerFactory.getLogger(WebCrawlController.class);
	
	@Autowired
	private Exchange dao;
	
	
	// http://localhost:8081/api
	//환율
	@GetMapping(value="/api")
    public List<ExchangeRateDTO> getExchangeRates() 
    		throws ServletException, IOException {
        List<ExchangeRateDTO> exchangeRateList = new ArrayList<>();

        String url = "https://finance.naver.com/marketindex/";
        Document doc = Jsoup.connect(url).get();

        Elements elements = doc.select("ul.data_lst > li");
        for (Element element : elements) {
            String name = element.select("h3.h_lst > span.blind").text();
            String price = element.select("span.value").text();
            String change = element.select("span.change").text();

            ExchangeRateDTO exchangeRate = new ExchangeRateDTO(name, price, change);
            dao.exchangeList(exchangeRate);
        }
        

        return exchangeRateList;
    }
	
	// http://localhost:8081/exchangeUpdate
	@GetMapping(value="/exchangeUpdate")
    public List<ExchangeRateDTO2> getExchangeRates2() 
    		throws ServletException, IOException {
        List<ExchangeRateDTO2> exchangeRateList = new ArrayList<>();

        String url = "https://www.citibank.co.kr/FxdExrt0100.act";
        Document doc = Jsoup.connect(url).get();

        Elements elements = doc.select("ul.exchangeList > li");
        for (Element element : elements) {
           
        	
        	
            String name = element.selectFirst("em.unit").text();
            double price = Double.parseDouble(element.selectFirst("span.green").text().replace(",", ""));
            double buy = Double.parseDouble(element.selectFirst("ul > li:nth-child(1) > em").text().replace(",", ""));
            double sell = Double.parseDouble(element.selectFirst("ul > li:nth-child(2) > em").text().replace(",", ""));
            double send = Double.parseDouble(element.selectFirst("ul > li:nth-child(3) > em").text().replace(",", ""));
            double receive = Double.parseDouble(element.selectFirst("ul > li:nth-child(4) > em").text().replace(",", ""));
            

            ExchangeRateDTO2 exchangeRate = new ExchangeRateDTO2(name,  price,  buy,  sell, send, receive);
            	System.out.println("name: " + name);
                System.out.println("price: " + price);
                System.out.println("buy: " + buy);
                System.out.println("sell: " + sell);
                System.out.println("send: " + send);
                System.out.println("receive: " + receive);
                System.out.println("exchangeRate" + exchangeRate);
                dao.exchangeList2(exchangeRate);
                
        }
        

        return exchangeRateList;
    
	}

}
