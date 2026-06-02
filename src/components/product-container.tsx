import "../styles.css";
import { ProductView } from "./product-view";
import { ProductViewSkeleton } from "./product-view-skeleton";
import { useProductPage } from "./use-product-page";

function ProductContainer() {
	const { page, isLoading } = useProductPage();

	if (isLoading || page === null) {
		return <ProductViewSkeleton />;
	}

	return (
		<ProductView
			title={page.title}
			badge={page.badge}
			description={page.description}
			reviews={page.reviews}
			photos={page.photos}
		/>
	);
}

export { ProductContainer };

export default ProductContainer;
