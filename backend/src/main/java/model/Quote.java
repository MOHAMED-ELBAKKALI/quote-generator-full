package com.example.quotegene.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Quote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String quote;

    @Column(nullable = false)
    private String author;

    public Quote(String quote, String author) {
        this.quote = quote;
        this.author = author;
    }

    @Override
    public String toString() {
        return "Quote{id=" + id + ", quote='" + quote + "', author='" + author + "'}";
    }
}