package com.pigbank.project.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RestController;

import com.pigbank.project.dto.ExchangeRateDTO;

@CrossOrigin(origins="**", maxAge=3600)
@RestController
public class WebCrawlController {
	
	private static final Logger logger = LoggerFactory.getLogger(WebCrawlController.class);
	
	
	// http://localhost:8081/members
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
            exchangeRateList.add(exchangeRate);
        }

        return exchangeRateList;
    }

}
