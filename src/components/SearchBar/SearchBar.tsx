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
      const cellRow = cell.parentElement as HTMLElement;
      const cellValue = cell.innerHTML.toLowerCase();
      //console.log(cellValue, 'cellValue');

      if (cellValue.includes(searchValue)) {
        searchVal = true;

        cellRow.style.backgroundColor = 'purple';
        // console.log(resultsList, 'list');
        // console.log(searchVal, 'searchVal');
        break;
      }
      cellRow.style.display = searchVal ? '' : 'none';
    }

    if (searchValue === '') {
      searchVal = false;
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

//* removing values, typing with any uppercase
//* only highlighting single value, need all values to be searched- removing break will do that but it runs too much without it
//contacts needs to be actually removed from list so numbers update?

// for (let k = 0; k < tCell.length; k++) {
//   resultsList.push(cellValue);
// }
// console.log(resultsList, 'result');
