import { useEffect, useState } from 'react';
import { RuxInput } from '@astrouxds/react';
import { useAppActions } from 'hooks/useAppActions';
import { useAppContext } from 'providers/AppProvider';

import './SearchBar.css';
import { isRowSelected } from '@tanstack/react-table';

const SearchBar = () => {
  const { searchContacts } = useAppActions();
  const { state } = useAppContext();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search === '') {
      setSearch('');
      // isRowSelected(selectedRow, false)
    }
  }, [search, searchContacts]);
  console.log(state);

  const handleSearch = (e: any) => {
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

//* removing values, typing with any uppercase
//contacts needs to be actually removed from list so numbers update?

// for (let k = 0; k < tCell.length; k++) {
//   resultsList.push(cellValue);
// }
// console.log(resultsList, 'result');

// const tRow = document.getElementsByClassName(
//   'Astro-react-table__row'
// ) as HTMLCollectionOf<HTMLElement>;
// const tCell = document.getElementsByClassName(
//   'Astro-react-table__cell'
// ) as HTMLCollectionOf<HTMLElement>;

// const dateTime = document.querySelectorAll(
//   'rux-datetime'
// ) as NodeListOf<HTMLRuxDatetimeElement>;

// for (let i = 0; i < tRow.length; i++) {
//   // const resultsList = [];
//   const row = tRow[i] as HTMLElement;
//   //console.log(row, 'row');
//   let searchVal = false;

//   for (let j = 0; j < tCell.length; j++) {
//     const cell = tCell[j];
//     //&& tCell[j].children;
//     const cellRow = cell.parentElement as HTMLElement;
//     const cellValue = cell.innerHTML.toLowerCase();
//     // console.log(cellValue, 'cellValue');

//     if (cellValue.includes(searchValue)) {
//       searchVal = true;

//       cellRow.style.backgroundColor = 'purple';
//       // console.log(resultsList, 'list');
//       // console.log(searchVal, 'searchVal');
//       break;
//     } else {
//       cellRow.style.display = 'none';
//     }
//     // for (let k = 0; k < dateTime.length; k++) {
//     //   const dateTimeCell = dateTime[k];
//     //   console.log(dateTimeCell);
//     //   const dateTimeParent = dateTimeCell.parentNode as ParentNode;
//     //   const dateTimeRow = dateTimeParent.parentElement as HTMLElement;
//     //   console.log(dateTimeRow, 'dt row');
//     //   const cellValue = cell.innerHTML;
//     //   if (cellValue.includes(searchValue)) {
//     //     searchVal = true;

//     //     dateTimeRow.style.backgroundColor = 'purple';
//     //     // console.log(resultsList, 'list');
//     //     // console.log(searchVal, 'searchVal');
//     //     break;
//     //   }
//     // }
//   }

//   if (searchValue === '') {
//     searchVal = false;
//   } else {
//     row.style.display = searchVal ? '' : 'none';
//   }
// }
