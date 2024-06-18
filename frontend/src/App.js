// src/App.js
import React, { useState } from "react";

import ScrapeInput from "./Component/scrape";
import Articles from "./Component/articledata";

function App() {
  const [articles, setArticles] = useState([]);

  return (
    <div>
      <div >
        <h1>Medium Article Scraper</h1>
      </div>
      <ScrapeInput setArticles={setArticles} />
      <Articles articles={articles} />
    </div>
  );
}

export default App;
