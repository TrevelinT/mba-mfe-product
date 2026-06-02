import { describe, expect, it } from "vitest";
import { getProductPage, PRODUCT_ID } from "./product";

describe("product API", () => {
	it("exports PRODUCT_ID as nintendo-switch-2", () => {
		expect(PRODUCT_ID).toBe("nintendo-switch-2");
	});

	it("getProductPage returns product metadata", async () => {
		const page = await getProductPage({ latencyMs: 0 });
		expect(page.id).toBe(PRODUCT_ID);
		expect(page.title).toContain("Nintendo Switch 2");
		expect(page.description.length).toBeGreaterThan(0);
		expect(page.photos).toHaveLength(4);
		expect(page.photos[0]).toMatchObject({
			src: expect.stringMatching(/^https:\/\//),
			alt: expect.any(String),
			label: expect.any(String),
		});
		expect(page.reviews).toEqual({ rating: 4.5, count: 2451 });
		expect(page.badge).toBe("Mais Vendido");
	});
});
