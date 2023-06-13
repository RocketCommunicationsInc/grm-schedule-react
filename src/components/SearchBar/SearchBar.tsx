import { useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const tRow = document.getElementsByClassName('Astro-react-table__row');
  const tCell = document.getElementsByClassName('Astro-react-table__cell');
  //const rowData = Object.values(tRow).map((row) => row.innerHTML)

  for (let i = 0; i < tRow.length; i++) {
    const row = tRow[i];
    console.log(row);
    let searchVal = false;

    for (let j = 0; j < tCell.length; j++) {
      const cell = tCell[j];
      const cellValue = cell.innerHTML.toLowerCase();

      if (cellValue.includes(searchValue)) {
        searchVal = true;
      }
    }
    //@ts-expect-error
    row.style.display = searchVal ? '' : 'none';
  }

  // const searchData = {
  //   //.filter((item: any) => item.name.toLowerCase.includes(searchValue))
  // };

  return (
    <RuxInput
      type='search'
      placeholder='Search'
      size='small'
      className='main-search'
      onRuxinput={(event) => setSearchValue(event.target.value)}
    />
  );
};

export default SearchBar;
