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
    // const resultsList = [];
    const row = tRow[i] as HTMLElement;
    //console.log(row, 'row');
    let searchVal = false;

    for (let j = 0; j < tCell.length; j++) {
      const cell = tCell[j];
      //console.log(cell, 'cell');
      const cellValue = cell.innerHTML.toLowerCase();
      //console.log(cellValue, 'cellValue');
      const cellRow = cell.parentElement;

      if (cellValue.includes(searchValue)) {
        searchVal = true;
        cellRow
          ? (cellRow.style.backgroundColor = 'purple')
          : (searchVal = true);
        // console.log(resultsList, 'list');
        // console.log(searchVal, 'searchVal');
        break;
      }
    }

    //row.filter(search => )

    if (searchValue === '') {
      searchVal = false;
      row.style.display = 'visible';
    } else {
      row.style.display = searchVal ? '' : 'none';
    }
    // console.log(searchVal, 'final search val');
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

// for (let k = 0; k < tCell.length; k++) {
//   resultsList.push(cellValue);
// }
// console.log(resultsList, 'result');
