package com.pigbank.project.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pigbank.project.dto.AccountDTO;

@Mapper
public interface LeeMapper {
	
	public List<AccountDTO> accountList(String id);
	
	public AccountDTO balance(long acNumber);
}
