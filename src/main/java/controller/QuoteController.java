package com.example.quotegene.controller;

import com.example.quotegene.model.Quote;
import com.example.quotegene.repository.QuoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quotes")
@CrossOrigin(origins = "http://localhost:4200")
public class QuoteController {
    private final QuoteRepository quoteRepository;

    @Autowired
    public QuoteController(QuoteRepository quoteRepository) {
        this.quoteRepository = quoteRepository;
    }

    @PostMapping
    public Quote createQuote(@RequestBody Quote quote) {
        return quoteRepository.save(quote);
    }

    @GetMapping
    public List<Quote> getAllQuotes() {
        return quoteRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public void deleteQuote(@PathVariable Long id) {
        quoteRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Quote updateQuote(@PathVariable Long id, @RequestBody Quote quote) {
        Quote existingQuote = quoteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quote not found with id: " + id));
        existingQuote.setQuote(quote.getQuote());
        existingQuote.setAuthor(quote.getAuthor());
        return quoteRepository.save(existingQuote);
    }
}