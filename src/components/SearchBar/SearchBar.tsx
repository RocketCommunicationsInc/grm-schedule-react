// import { useState } from 'react';
import { RuxInput } from '@astrouxds/react';
// import contacts from '../../data/contacts.json';
import './SearchBar.css';

const SearchBar = () => {
  // const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <RuxInput
        type='search'
        placeholder='Search'
        size='small'
        className='main-search'
        // onRuxinput={(event) => setSearchValue(event.target.value)}
      />
    </>
  );
};

export default SearchBar;
