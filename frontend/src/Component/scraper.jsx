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
            const response = await axios.post('https://procuzy-server.onrender.com/scrape', { topic });
            setArticles(response.data);
        } catch (error) {
            setError('Failed to fetch articles');
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="mb-4 flex">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter topic"
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2 rounded-lg">
                    Search
                </button>
            </form>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <ul className="space-y-4">
                {articles.map((article, index) => (
                    <li key={index} className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                        <p className="text-sm">Author: {article.author}</p>
                        <p className="text-sm">Date: {article.date}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Read More
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scraper;
