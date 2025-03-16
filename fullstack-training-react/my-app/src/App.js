import React, { useState } from 'react';
import { KanbanView } from './components/organisms/Kanabnview.jsx';
import { CardList } from './components/organisms/CardList.jsx';
import GridView from './components/organisms/GridView.jsx';
import CalendarView from './components/organisms/CalenderView.jsx';
import Header from './components/organisms/Header.jsx';
import './App.css';

const App = () => {
    const [view, setView] = useState('list');

    const toggleView = (viewName) => {
        setView(viewName);
    };

    return (
        <div className="app-container">
            <Header />
            <div className="view-switcher">
                <button onClick={() => toggleView('list')}>List View</button>
                <button onClick={() => toggleView('kanban')}>Kanban View</button>
                <button onClick={() => toggleView('grid')}>Grid View</button>
                <button onClick={() => toggleView('calendar')}>Calendar View</button>
            </div>
            <main>
                {view === 'kanban' && <KanbanView />}
                {view === 'list' && <CardList />}
                {view === 'grid' && <GridView />}
                {view === 'calendar' && <CalendarView />}
            </main>
        </div>
    );
};

export default App;
