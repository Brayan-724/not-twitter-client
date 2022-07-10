import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import Index from '.';
import Tweet from './tweet/T[id]';

export default function App() {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=League+Gothic&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </Helmet>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/tweet/:id" element={<Tweet />} />
      </Routes>
    </>
  );
}
