export const groupByToMap = (array: any[], predicate: any) => {
  return array.reduce((map, value, index, array) => {
    const key = predicate(value, index, array);
    map.get(key)?.push(value) ?? map.set(key, [value]);
    return map;
  }, new Map());
};

export const setGroup = (map: any[]) => {
  const group = [];
  for (const x of map.entries()) {
    group.push([x[0], x[1]]);
  }
  return group;
};
