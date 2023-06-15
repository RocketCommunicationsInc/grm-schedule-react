import { useEffect, useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import { useAppActions } from 'hooks/useAppActions';

import './SearchBar.css';

const SearchBar = () => {
  const { searchContacts, searchedRegionContacts } = useAppActions();
  const [search, setSearch] = useState('');

  useEffect(() => {}, [search, searchContacts, searchedRegionContacts]);

  const handleSearch = (e: any) => {
    searchedRegionContacts();
    searchContacts(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <RuxInput
      type='search'
      placeholder='Search'
      size='small'
      className='main-search'
      onRuxinput={handleSearch}
    />
  );
};

export default SearchBar;
