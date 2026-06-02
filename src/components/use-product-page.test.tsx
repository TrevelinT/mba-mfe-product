import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import * as productApi from "../api/product";
import { useProductPage } from "./use-product-page";

function ProductPageProbe() {
	const { page, isLoading } = useProductPage();

	return (
		<div>
			<span data-testid="loading">{isLoading ? "yes" : "no"}</span>
			<span data-testid="title">{page?.title ?? ""}</span>
		</div>
	);
}

describe("useProductPage", () => {
	it("starts loading then exposes the fetched page", async () => {
		const page = await productApi.getProductPage({ latencyMs: 0 });
		const getProductPageSpy = vi
			.spyOn(productApi, "getProductPage")
			.mockResolvedValue(page);

		render(<ProductPageProbe />);

		expect(screen.getByTestId("loading")).toHaveTextContent("yes");
		expect(screen.getByTestId("title")).toHaveTextContent("");

		expect(await screen.findByText(page.title)).toBeInTheDocument();
		expect(screen.getByTestId("loading")).toHaveTextContent("no");

		getProductPageSpy.mockRestore();
	});
});
