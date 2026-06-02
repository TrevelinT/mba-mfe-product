import { useEffect, useState } from "react";
import type { ProductPage } from "../api/product";
import { getProductPage } from "../api/product";

export interface UseProductPageResult {
	page: ProductPage | null;
	isLoading: boolean;
}

export function useProductPage(): UseProductPageResult {
	const [page, setPage] = useState<ProductPage | null>(null);

	useEffect(function fetchProductPageOnMount() {
		let cancelled = false;

		void getProductPage().then(function applyProductPage(fetchedPage) {
			if (!cancelled) {
				setPage(fetchedPage);
			}
		});

		return function cancelProductPageFetch() {
			cancelled = true;
		};
	}, []);

	return {
		page,
		isLoading: page === null,
	};
}
