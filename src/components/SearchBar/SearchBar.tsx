import { RuxInput } from '@astrouxds/react';
import { useAppActions } from 'hooks/useAppActions';

import './SearchBar.css';

const SearchBar = () => {
  const { searchContacts } = useAppActions();

  const handleSearch = (e: any) => {
    searchContacts(e.target.value);
  };

  return (
    <RuxInput
      type='search'
      placeholder='Search...'
      size='small'
      className='main-search'
      onRuxinput={handleSearch}
    />
  );
};

export default SearchBar;
