import { useEffect, useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import { useAppActions } from 'hooks/useAppActions';

import './SearchBar.css';
//import { useAppContext } from 'providers/AppProvider';

const SearchBar = () => {
  const { searchContacts } = useAppActions();
  const [search, setSearch] = useState('');
  //const { state } = useAppContext();

  useEffect(() => {
    if (search === '') {
      setSearch('');
    }
  }, [search, searchContacts]);

  const handleSearch = (e: any) => {
    searchContacts(e.target.value);
    setSearch(e.target.value);
    if (search === '') {
      setSearch('');
    }
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
