export function BrandsComponent ( {brands, filtersSelectedToRender, handleSelectBrand}) {
    return (<div>
        <span>Marca</span>
        {brands.map((brand) => {
            if(filtersSelectedToRender.includes(brand.name)) return undefined
            return (
                <button 
                key={brand.id}
                value={brand.name}
                onClick={handleSelectBrand}>
                    {brand.name}
                </button>
            )
        })}
    </div>)
}

export function CategoriesComponent ({ categories, filtersSelectedToRender, handleSelectCategory }) {
    return (
        <div>
            <span>Categoría</span>
            {categories.map((category) => {
                if(filtersSelectedToRender.includes(category.name)) return undefined
                return (
                    <button 
                    key={category.id}
                    value={category.name}
                    onClick={handleSelectCategory}>
                        {category.name}
                    </button>
                )
                })}
        </div>
    )
}