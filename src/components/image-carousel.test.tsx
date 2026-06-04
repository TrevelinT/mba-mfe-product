import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { ProductPhoto } from "../api/product";
import { getProductPage } from "../api/product";
import { ImageCarousel } from "./image-carousel";

let PHOTOS: ProductPhoto[];

function thumbnailButtonName(photo: ProductPhoto): string {
	return `Nintendo Switch 2 - ${photo.label}`;
}

function mockMatchMedia(canHover: boolean) {
	let matches = canHover;
	const listeners = new Set<(event: MediaQueryListEvent) => void>();

	window.matchMedia = vi.fn().mockImplementation(function mockMediaQuery(
		query: string,
	) {
		return {
			get matches() {
				return matches;
			},
			media: query,
			addEventListener(
				_type: string,
				handler: (event: MediaQueryListEvent) => void,
			) {
				listeners.add(handler);
			},
			removeEventListener(
				_type: string,
				handler: (event: MediaQueryListEvent) => void,
			) {
				listeners.delete(handler);
			},
		};
	});

	return {
		changeDeviceSize(nextCanHover: boolean) {
			matches = nextCanHover;
			const event = { matches: nextCanHover } as MediaQueryListEvent;

			for (const listener of listeners) {
				listener(event);
			}
		},
	};
}

describe("ImageCarousel", () => {
	beforeAll(async function loadProductPhotos() {
		const page = await getProductPage({ latencyMs: 0 });
		PHOTOS = page.photos;
	});

	afterEach(function cleanupDom() {
		cleanup();
	});

	it("shows the first slide by default with the first thumbnail selected", () => {
		mockMatchMedia(false);
		render(<ImageCarousel photos={PHOTOS} />);

		const mainImage = screen.getByRole("img", {
			name: PHOTOS[0].alt,
		});
		expect(mainImage).toHaveAttribute("src", PHOTOS[0].src);

		const frontThumbnail = screen.getByRole("button", {
			name: thumbnailButtonName(PHOTOS[0]),
		});
		expect(frontThumbnail).toHaveClass(
			"product:border-primary",
			"product:border-2",
		);
		expect(frontThumbnail).toHaveAttribute("aria-current", "true");
	});

	it("updates the main image and selection when a thumbnail is clicked", () => {
		mockMatchMedia(false);
		render(<ImageCarousel photos={PHOTOS} />);

		const sideThumbnail = screen.getByRole("button", {
			name: thumbnailButtonName(PHOTOS[1]),
		});
		fireEvent.click(sideThumbnail);

		const mainImage = screen.getByRole("img", {
			name: PHOTOS[1].alt,
		});
		expect(mainImage).toHaveAttribute("src", PHOTOS[1].src);
		expect(sideThumbnail).toHaveClass(
			"product:border-primary",
			"product:border-2",
		);
		expect(sideThumbnail).toHaveAttribute("aria-current", "true");

		const frontThumbnail = screen.getByRole("button", {
			name: thumbnailButtonName(PHOTOS[0]),
		});
		expect(frontThumbnail).not.toHaveAttribute("aria-current");
	});

	it("updates the main image on thumbnail hover in desktop mode", () => {
		mockMatchMedia(true);
		render(<ImageCarousel photos={PHOTOS} />);

		const dockedThumbnail = screen.getByRole("button", {
			name: thumbnailButtonName(PHOTOS[2]),
		});
		fireEvent.mouseEnter(dockedThumbnail);

		const mainImage = screen.getByRole("img", {
			name: PHOTOS[2].alt,
		});
		expect(mainImage).toHaveAttribute("src", PHOTOS[2].src);
		expect(dockedThumbnail).toHaveAttribute("aria-current", "true");
	});

	it("does not update the main image on hover in mobile mode", () => {
		mockMatchMedia(false);
		render(<ImageCarousel photos={PHOTOS} />);

		const sideThumbnail = screen.getByRole("button", {
			name: thumbnailButtonName(PHOTOS[1]),
		});
		fireEvent.mouseEnter(sideThumbnail);

		const mainImage = screen.getByRole("img", {
			name: PHOTOS[0].alt,
		});
		expect(mainImage).toHaveAttribute("src", PHOTOS[0].src);

		fireEvent.click(sideThumbnail);
		expect(mainImage).toHaveAttribute("src", PHOTOS[1].src);
	});
});
