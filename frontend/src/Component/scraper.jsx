import React, { useState } from 'react';
import axios from 'axios';

const Scraper = () => {
    const [topic, setTopic] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/scrape', { topic });
            setArticles(response.data);
        } catch (error) {
            setError('Failed to fetch articles');
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                    required
                />
                <button type="submit">Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <h3>{article.title}</h3>
                        <p>Author: {article.author}</p>
                        <p>Date: {article.date}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scraper;
