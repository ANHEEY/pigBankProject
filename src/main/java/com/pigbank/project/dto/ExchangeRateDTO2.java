package com.pigbank.project.dto;


public class ExchangeRateDTO2 {
	
	
    private String name;
    private double price;
    private double buy;
    private double sell;
    private double send;
    private double receive;
    

    
    public ExchangeRateDTO2() {}



	public ExchangeRateDTO2(String name, double price, double buy, double sell, double send, double receive) {
		this.name = name;
		this.price = price;
		this.buy = buy;
		this.sell = sell;
		this.send = send;
		this.receive = receive;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public double getPrice() {
		return price;
	}



	public void setPrice(double price) {
		this.price = price;
	}



	public double getBuy() {
		return buy;
	}



	public void setBuy(double buy) {
		this.buy = buy;
	}



	public double getSell() {
		return sell;
	}



	public void setSell(double sell) {
		this.sell = sell;
	}



	public double getSend() {
		return send;
	}



	public void setSend(double send) {
		this.send = send;
	}



	public double getReceive() {
		return receive;
	}



	public void setReceive(double receive) {
		this.receive = receive;
	}



    
   }
	


