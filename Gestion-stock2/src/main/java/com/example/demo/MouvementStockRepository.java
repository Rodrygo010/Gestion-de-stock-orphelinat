package com.example.demo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MouvementStockRepository extends MongoRepository<MouvementStock, String> {
    List<MouvementStock> findByProduitId(String produitId);
    long countByType(String type);
	
}
