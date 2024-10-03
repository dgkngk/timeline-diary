import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';



const EntryModal = ({ isOpen, closeModal, refreshEntries }) => {
  const [newEntry, setNewEntry] = useState({
    title: '',
    writer: '',
    date: '',
    text: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(api_string + '/api/diary', newEntry);
      console.log(newEntry);
      refreshEntries(); // Refresh the timeline after submitting
      closeModal();
    } catch (error) {
      console.error('Error adding entry', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={newEntry.title} onChange={handleChange} placeholder="Title" required />
        <br></br>
        <input type="text" name="writer" value={newEntry.writer} onChange={handleChange} placeholder="Writer" required />
        <br></br>
        <input type="date" name="date" value={newEntry.date} onChange={handleChange} required />
        <br></br>
        <textarea name="text" value={newEntry.text} onChange={handleChange} placeholder="Text" required></textarea>
        <br></br>
        {/* <input type="text" name="image" value={newEntry.image} onChange={handleChange} placeholder="Image URL" /> */}
        <button type="submit">Add Entry</button>
      </form>
      <button onClick={closeModal}>Close</button>
    </Modal>
  );
};

export const api_string = "http://localhost:5001";
export default EntryModal;
