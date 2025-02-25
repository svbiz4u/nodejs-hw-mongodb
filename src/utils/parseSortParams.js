import { sortByList, sortOrderList } from '../constants/contacts.js';

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = sortOrderList.includes(sortOrder)
    ? sortOrder
    : sortOrderList[0];
  const parsedSortBy = sortByList.includes(sortBy) ? sortBy : '_id';

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};