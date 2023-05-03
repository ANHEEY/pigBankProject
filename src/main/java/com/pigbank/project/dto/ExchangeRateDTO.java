package com.pigbank.project.dto;


public class ExchangeRateDTO {
	
	
    private String name;
    private String price;
    private String change;
    

    public ExchangeRateDTO() {}

    public ExchangeRateDTO(String name, String price, String change) {
        this.name = name;
        this.price = price;
        this.change = change;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

	
	
}
