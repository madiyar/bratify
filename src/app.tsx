import { useState } from 'react'
import { Albums, Coffee, Search } from 'src/pages';

const App = () => {
  const [tab, setTab] = useState<'albums' | 'search' | 'coffee'>('albums');

  return (
    <div className="max-w-4xl mx-auto py-2 md:py-5 px-2 md:px-3 min-h-screen flex flex-col">
      <main className="flex-1 pb-20">
        <header className="text-primary text-4xl md:text-6xl font-medium mb-5 flex items-center gap-2 justify-center">
          <img src="/bratify.svg" className="w-8 md:w-12 rounded-full" alt="" />
          <h1 className="font-['Arial Narrow']">bratify</h1>
        </header>

        {tab === 'albums' && <Albums />}
        {tab === 'search' && <Search />}
        {tab === 'coffee' && <Coffee />}

        <footer className="text-primary text-center mt-3">
          by <a href="https://madiyar.dev" className="underline">madiyar</a>
        </footer>
      </main>

      <div className="fixed bottom-2 md:bottom-6 mx-auto inset-x-0 z-10 flex items-center justify-center">
        <nav className=" bg-neutral-950/80 px-4 py-2 rounded-full flex items-center gap-3 backdrop-blur-md md:shadow-2xl md:shadow-primary/60">
          <button className={`p-2 ${tab === 'albums' && 'text-primary'}`} onClick={() => setTab('albums')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15V6"/><path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/><path d="M12 12H3"/><path d="M16 6H3"/><path d="M12 18H3"/></svg>
          </button>
          <button className={`p-2 ${tab === 'search' && 'text-primary'}`} onClick={() => setTab('search')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          {/* <button className={`p-2 ${tab === 'coffee' && 'text-primary'}`} onClick={() => setTab('coffee')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button> */}
        </nav>
      </div>
    </div>
  )
}

export default App;
