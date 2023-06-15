import { useEffect, useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import { useAppActions } from 'hooks/useAppActions';

import './SearchBar.css';
import { useAppContext } from 'providers/AppProvider';

const SearchBar = () => {
  const { searchContacts, searchedRegionContacts } = useAppActions();
  const [search, setSearch] = useState('');
  const { state } = useAppContext();

  useEffect(() => {
    if (search === '') {
      setSearch('');
    }
  }, [search, searchContacts]);

  const handleSearch = (e: any) => {
    searchedRegionContacts();
    searchContacts(e.target.value);
    setSearch(e.target.value);
  };
  console.log(state);

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
