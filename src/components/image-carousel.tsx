import { useEffect, useState } from "react";
import type { ProductPhoto } from "../api/product";

const HOVER_MEDIA_QUERY = "(hover: hover) and (pointer: fine)";

export interface ImageCarouselProps {
	photos: ProductPhoto[];
}

function useCanHover() {
	const [canHover, setCanHover] = useState(false);

	useEffect(function syncCanHoverWithMediaQuery() {
		const mediaQuery = window.matchMedia(HOVER_MEDIA_QUERY);
		setCanHover(mediaQuery.matches);

		function handleChange(event: MediaQueryListEvent) {
			setCanHover(event.matches);
		}

		mediaQuery.addEventListener("change", handleChange);
		return function removeCanHoverMediaQueryListener() {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return canHover;
}

function ImageCarousel({ photos }: ImageCarouselProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const canHover = useCanHover();
	const selectedImage = photos[selectedIndex];

	function handleThumbnailClick(index: number) {
		setSelectedIndex(index);
	}

	function handleThumbnailMouseEnter(index: number) {
		if (canHover) {
			setSelectedIndex(index);
		}
	}

	return (
		<>
			<div className="product:aspect-[4/3] product:w-full product:bg-surface-container-low product:border product:border-outline-variant product:rounded-lg product:overflow-hidden product:group">
				<img
					alt={selectedImage.alt}
					className="product:w-full product:h-full product:object-cover product:transition-transform product:duration-500 product:group-hover:scale-105"
					src={selectedImage.src}
				/>
			</div>
			<div className="product:grid product:grid-cols-4 product:gap-sm">
				{photos.map(function renderThumbnail(image, index) {
					const isSelected = index === selectedIndex;

					return (
						<button
							aria-current={isSelected ? "true" : undefined}
							aria-label={`Nintendo Switch 2 - ${image.label}`}
							className={
								isSelected
									? "product:aspect-square product:bg-surface-container-low product:border-2 product:border-primary product:rounded-lg product:overflow-hidden product:cursor-pointer product:p-0"
									: "product:aspect-square product:bg-surface-container-low product:border product:border-outline-variant product:rounded-lg product:overflow-hidden product:cursor-pointer product:hover:border-primary product:transition-colors product:p-0"
							}
							key={image.label}
							onClick={function handleClick() {
								handleThumbnailClick(index);
							}}
							onMouseEnter={function handleMouseEnter() {
								handleThumbnailMouseEnter(index);
							}}
							type="button"
						>
							<img
								alt=""
								className="product:w-full product:h-full product:object-cover"
								src={image.src}
							/>
						</button>
					);
				})}
			</div>
		</>
	);
}

export { ImageCarousel };
