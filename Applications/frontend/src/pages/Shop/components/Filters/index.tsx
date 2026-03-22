const Filters = () => {
  const filters = {
    categories: [
      { id: "cat_1", name: "Men", slug: "men" },
      { id: "cat_2", name: "Women", slug: "women" },
      { id: "cat_3", name: "Kids", slug: "kids" },
    ],
    brands: [
      { id: "b1", name: "Urban Style" },
      { id: "b2", name: "Classic Fit" },
      { id: "b3", name: "EcoWear" },
      { id: "b4", name: "SportX" },
    ],
  };

  return (
    // TODO: fazer sistema de filtros
    <div className="flex flex-col gap-3">
      <h2>Filtros</h2>
      <div>
        <div>
          {filters.categories.map((e) => (
            <p>{e.name}</p>
          ))}
        </div>
      </div>
      <div>
        <div>
          {filters.brands.map((e) => (
            <p>{e.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
