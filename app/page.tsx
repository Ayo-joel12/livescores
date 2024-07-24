"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const Home = () => {
  const [scores, setScores] = useState([]);
  const [loadingScores, setLoadingScores] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [sortOption, setSortOption] = useState('');

  const fetchScores = () => {
    setLoadingScores(true);
    setTimeout(() => {
      const newScores = [
        { id: 1, teamA: 'Real Madrid', teamB: 'Barcelona', scoreA: 1, scoreB: 2, status: 'Live', whereToWatch: 'ESPN', liveUrl: 'https://example.com/live1' },
        { id: 2, teamA: 'Liverpool', teamB: 'Manchester United', scoreA: 0, scoreB: 0, status: 'Upcoming', whereToWatch: 'NBC Sports', liveUrl: 'https://example.com/live2' },
        { id: 3, teamA: 'Chelsea', teamB: 'Paris Saint-Germain', scoreA: 3, scoreB: 1, status: 'Final', whereToWatch: 'DSTV' },
        { id: 4, teamA: 'Bayern Munich', teamB: 'Paris Saint-Germain', scoreA: 3, scoreB: 1, status: 'Final', whereToWatch: 'Fox Sports' },
      ];
      setScores(newScores);
      setLoadingScores(false);
    }, 2000);
  };

  const fetchSchedule = () => {
    setLoadingSchedule(true);
    setTimeout(() => {
      const newSchedule = [
        { id: 1, title: 'Match 1: Real Madrid vs Barcelona', date: '2024-06-25', time: '18:00', venue: 'Stadium A' },
        { id: 2, title: 'Match 2: Liverpool vs Manchester United', date: '2024-06-26', time: '20:00', venue: 'Stadium B' },
      ];
      setSchedule(newSchedule);
      setLoadingSchedule(false);
    }, 2000);
  };

  useEffect(() => {
    fetchScores();
    fetchSchedule();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const matchesToday = schedule.filter(match => match.date === today);
    setTodayMatches(matchesToday);
  }, [schedule]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredMatches([]);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMatches([]);
    } else {
      const filtered = scores.filter(
        game =>
          game.teamA.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.teamB.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMatches(filtered);
    }
  }, [searchQuery, scores]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedScores = [...scores].sort((a, b) => {
    if (sortOption === 'teamA') {
      return a.teamA.localeCompare(b.teamA);
    } else if (sortOption === 'teamB') {
      return a.teamB.localeCompare(b.teamB);
    } else if (sortOption === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else {
      return 0;
    }
  });

  const filteredByDate = selectedDate
    ? sortedScores.filter(game => game.date === selectedDate)
    : sortedScores;

  return (
    <Layout>
      <div className="max-w-full sm:max-w-4xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md mt-8">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg p-2"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            onClick={clearSearch}
            className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Clear Search
          </button>
          <input
            type="date"
            className="border rounded-lg p-2 ml-2"
            value={selectedDate}
            onChange={handleDateChange}
          />
          <select
            className="border rounded-lg p-2 ml-2"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="">Sort By</option>
            <option value="teamA">Team A</option>
            <option value="teamB">Team B</option>
            <option value="date">Date</option>
          </select>
        </div>
        {loadingScores || loadingSchedule ? (
          <div className="flex justify-center items-center">
            <p className="ml-2 text-xl">Loading...</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-2">Live Games</h2>
              {filteredByDate.map((game) => (
                <div key={game.id} className="p-4 border rounded-lg shadow-sm flex flex-col md:flex-row md:justify-between items-center">
                  <div className="mb-2 md:mb-0">
                    <h3 className="text-lg font-semibold">
                      {game.teamA} vs {game.teamB}
                    </h3>
                    <p className="mb-1">Status: {game.status}</p>
                    <p className="mb-1">Where to Watch: {game.whereToWatch}</p>
                    {(game.status === 'Live' || game.status === 'Upcoming') && game.liveUrl && (
                      <div className="mt-2">
                        <Link href={`/live/${game.id}`} passHref>
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Watch Live
                          </button>
                        </Link>
                      </div>
                    )}
                    <button
                      onClick={() => toggleFavorite(game.id)}
                      className={`mt-2 px-4 py-2 rounded-lg ${favorites.includes(game.id) ? 'bg-yellow-500' : 'bg-gray-500'} text-white`}
                    >
                      {favorites.includes(game.id) ? 'Unfavorite' : 'Favorite'}
                    </button>
                  </div>
                  <div className="text-lg font-bold md:text-right">
                    {game.scoreA} - {game.scoreB}
                  </div>
                </div>
              ))}
            </div>
            {favorites.length > 0 && (
              <div className="space-y-4 mt-8">
                <h2 className="text-xl font-semibold mb-2">Favorite Matches</h2>
                {scores
                  .filter(game => favorites.includes(game.id))
                  .map((game) => (
                    <div key={game.id} className="p-4 border rounded-lg shadow-sm flex flex-col md:flex-row md:justify-between items-center">
                      <div className="mb-2 md:mb-0">
                        <h3 className="text-lg font-semibold">
                          {game.teamA} vs {game.teamB}
                        </h3>
                        <p className="mb-1">Status: {game.status}</p>
                        <p className="mb-1">Where to Watch: {game.whereToWatch}</p>
                        {(game.status === 'Live' || game.status === 'Upcoming') && game.liveUrl && (
                          <div className="mt-2">
                            <Link href={`/live/${game.id}`} passHref>
                              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                                Watch Live
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                      <div className="text-lg font-bold md:text-right">
                        {game.scoreA} - {game.scoreB}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
