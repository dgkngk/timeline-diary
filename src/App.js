import React, { useState, useEffect } from 'react';
import {Chrono} from 'react-chrono';
import axios from 'axios';
import {default as EntryModal, api_string} from './EntryModal'; // Popup form component


const App = () => {
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchDiaryEntries();
  }, []);
  useEffect(() => {
    console.log('Diary entries updated:', diaryEntries);
  }, [diaryEntries]);

  const fetchDiaryEntries = async () => {
    try {
      const response = await axios.get(api_string + '/api/diary');
      const mappedEntries = mapDiaryData(response.data);
      setDiaryEntries(mappedEntries);
      
    } catch (error) {
      console.error('Error fetching diary entries', error);
    }
  };

  const mapDiaryData = (diaryE) => {
    return diaryE.map(entry => ({
      title: entry.date,
      cardTitle: entry.title,
      cardSubtitle: entry.writer,
      cardDetailedText: entry.text,
      //media: { type: "IMAGE", source: entry.image },
    }));
  }

  const deleteEntry = async (id) => {
    try {
      await axios.delete(api_string + `/api/diary/${id}`);
      fetchDiaryEntries(); // Refresh after delete
    } catch (error) {
      console.error('Error deleting entry', error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
  console.log(diaryEntries);
  return (
    <div>
      <Chrono 
      key={diaryEntries.length}
      items={diaryEntries.length > 0 ? diaryEntries : []}
      mode="VERTICAL"
      />
      <button onClick={openModal}>Add New Entry</button>
      
      <EntryModal 
        isOpen={modalIsOpen}
        closeModal={closeModal}
        refreshEntries={fetchDiaryEntries} // Refresh after adding new entry
      />
    </div>
  );
};

export default App;
