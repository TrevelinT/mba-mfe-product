import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductViewSkeleton } from "./product-view-skeleton";

describe("ProductViewSkeleton", () => {
	it("renders a loading status region without product title text", () => {
		render(<ProductViewSkeleton />);

		expect(
			screen.getByRole("status", { name: /loading product details/i }),
		).toBeInTheDocument();
		expect(screen.queryByText(/Nintendo Switch 2/i)).not.toBeInTheDocument();
	});
});
