import { useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const tRow = document.getElementsByClassName('Astro-react-table__row') as any;
  const tCell = document.getElementsByClassName('Astro-react-table__cell');

  // const tCellArr = Array.from(tRow.childNodes).filter(
  //   (node: any) => node.nodeName === 'Astro-react-table__cell'
  // );
  console.log(tRow.value, 'row value');

  //const rowData = Object.values(tRow).map((row) => row.innerHTML)

  for (let i = 0; i < tRow.length; i++) {
    //const resultsList = [];
    const row = tRow[i] as HTMLElement;
    //console.log(row, 'row');
    let searchVal = false;

    for (let j = 0; j < tCell.length; j++) {
      const cell = tCell[j];
      const cellValue = cell.innerHTML.toLowerCase();
      // console.log(cellValue, 'cellValue');

      if (cellValue.includes(searchValue)) {
        searchVal = true;
        // resultsList.push(row);
        // console.log(resultsList, 'list');
        console.log(searchVal, 'searchVal');
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
