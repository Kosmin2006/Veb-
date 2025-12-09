import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [searchParams] = useSearchParams();
  const urlSort = searchParams.get("sort") || "date-desc";

  const [sortType, setSortType] = useState(urlSort);
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function loadNews() {
      const res = await fetch("http://localhost:3000/api/news");
      const data = await res.json();

      // перетворюємо шлях з "images/x.jpg" → "http://localhost:3000/images/x.jpg"
      const withImages = data.map(n => ({
        ...n,
        image: `http://localhost:3000/${n.image}`
      }));

      setNews(withImages);
    }

    loadNews();
  }, []);

  const sortedNews = useMemo(() => {
    return [...news].sort((a, b) => {
      switch (sortType) {
        case "date-desc":
          return new Date(b.date) - new Date(a.date);
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "az":
          return a.title.localeCompare(b.title, "uk");
        case "za":
          return b.title.localeCompare(a.title, "uk");
        default:
          return 0;
      }
    });
  }, [sortType, news]);

  return (
    <div className="news-page">
      <h2>Усі новини</h2>

      <div className="sort-wrapper" style={{ marginBottom: "20px" }}>
        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="date-desc">За датою (від нових до старих)</option>
          <option value="date-asc">За датою (від старих до нових)</option>
          <option value="az">За алфавітом</option>
          <option value="za">За алфавітом (навпаки)</option>
        </select>
      </div>

      <div className="news-list">
        {sortedNews.map(n => (
          <NewsCard key={n.id} article={n} compact={true} />
        ))}
      </div>
    </div>
  );
}






