interface DeepSearchParams<Type> {
  items: Type[];
  searchFrom: keyof Type;
  predicate: (item: Type) => boolean;
}

export const deepSearch = <Type extends object>(
  params: DeepSearchParams<Type>
): Type[] => {
  const { searchFrom, items, predicate } = params;
  return items.reduce<Type[]>((accumulator, currentValue) => {
    if (predicate(currentValue)) {
      const currentValueChildren = currentValue[searchFrom] as unknown;

      if (currentValueChildren) {
        const matchedChildren = deepSearch({
          items: currentValueChildren as Type[],
          searchFrom,
          predicate,
        });

        accumulator.push({
          ...currentValue,
          [searchFrom]: matchedChildren,
        });
      } else {
        accumulator.push(currentValue);
      }
    }

    return accumulator;
  }, []);
};
