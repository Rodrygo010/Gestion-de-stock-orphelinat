package com.example.demo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface DonRepository extends MongoRepository<Don, String> {
	List<Don> findByBeneficiaireRegex(String regex);
}

