import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { ProductPage } from "../api/product";
import { getProductPage } from "../api/product";
import { ProductView } from "./product-view";

let page: ProductPage;

describe("ProductView", () => {
	beforeAll(async function loadProductPage() {
		page = await getProductPage({ latencyMs: 0 });
	});

	afterEach(function cleanupDom() {
		cleanup();
	});

	it("renders title, description, and reviews from props", () => {
		render(
			<ProductView
				title={page.title}
				description={page.description}
				reviews={page.reviews}
				photos={page.photos}
			/>,
		);

		expect(screen.getByText(page.title)).toBeInTheDocument();
		expect(screen.getByText(page.description)).toBeInTheDocument();
		expect(
			screen.getByText(`(${page.reviews.count.toLocaleString()} reviews)`),
		).toBeInTheDocument();
		expect(
			screen.getByRole("img", { name: /4.5 out of 5 stars/i }),
		).toBeInTheDocument();
	});

	it("renders the badge when provided", () => {
		render(
			<ProductView
				title={page.title}
				badge="Limited Edition"
				description={page.description}
				reviews={page.reviews}
				photos={page.photos}
			/>,
		);

		expect(screen.getByText("Limited Edition")).toBeInTheDocument();
	});

	it("does not render a badge element when badge is omitted", () => {
		render(
			<ProductView
				title={page.title}
				description={page.description}
				reviews={page.reviews}
				photos={page.photos}
			/>,
		);

		expect(
			screen.queryByText("Limited Edition", {
				selector: "p.bg-primary",
			}),
		).not.toBeInTheDocument();
	});
});
