import { useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import './SearchBar.css';
//import { useAppContext } from 'providers/AppProvider';

const SearchBar = () => {
  //const { state } = useAppContext();
  const [searchValue, setSearchValue] = useState('');

  const tRow = document.getElementsByClassName(
    'Astro-react-table__row'
  ) as HTMLCollectionOf<HTMLElement>;
  const tCell = document.getElementsByClassName(
    'Astro-react-table__cell'
  ) as HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < tRow.length; i++) {
    //const resultsList = [];
    const row = tRow[i] as HTMLElement;
    //console.log(row, 'row');
    let searchVal = false;

    for (let j = 0; j < tCell.length; j++) {
      const cell = tCell[j];
      //console.log(cell, 'cell');
      const cellValue = cell.innerHTML.toLowerCase();
      //console.log(cellValue, 'cellValue');

      if (cellValue.includes(searchValue)) {
        //cell.style.backgroundColor = 'purple';
        searchVal = true;
        // resultsList.push(row);
        // console.log(resultsList, 'list');
        // console.log(searchVal, 'searchVal');
        break;
      }
      if (!cellValue.includes(searchValue)) {
        searchVal = false;
      }
    }
    row.style.display = searchVal ? '' : 'none';
  }

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

//* need to account for times being strings
//* removing values, typing with any uppercase
//* cells need to be associated with the row they're in
//* Status values highlighting multiples
//* only highlighting single value, need all values to be searched- removing break will do that but it runs too much without it
