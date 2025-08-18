import { Fragment } from "react/jsx-runtime";
import { useProduct, useProducts } from "../services/queries"
import { useState } from "react";


function Products() {
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null)
    const productQuery = useProduct(selectedProductId);
    const productsQuery = useProducts();

    return (
        <div>
            {productsQuery.data?.pages.map((group, index) => (
                <Fragment key={index}>
                    {
                        group.map(product => (
                            <div key={product.id}>
                                <button onClick={() => setSelectedProductId(product.id)}>{product.name}</button>
                            </div>
                        ))}
                </Fragment>
            ))}
            <br />
            <div>
                <button
                    onClick={() => productsQuery.fetchNextPage()}
                    disabled={!productsQuery.hasNextPage || productsQuery.isFetchingNextPage}
                >
                    {productsQuery.isFetchingNextPage ? "Loading More...." : productsQuery.hasNextPage ? "Load More" : "Nothing more to load"}
                </button>
            </div>
            <div>Selected Product:</div>
            {
                JSON.stringify(productQuery.data)
            }
        </div>
    )
}

export default Products
