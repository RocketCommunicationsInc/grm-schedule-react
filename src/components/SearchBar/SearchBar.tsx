import { RuxInput } from '@astrouxds/react';

import './SearchBar.css';

type PropTypes = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar = ({ searchValue, setSearchValue }: PropTypes) => {
  return (
    <RuxInput
      type='search'
      placeholder='Search...'
      size='small'
      className='main-search'
      onRuxinput={(e) => setSearchValue(e.target.value)}
    />
  );
};

export default SearchBar;
