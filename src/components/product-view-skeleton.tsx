function ProductViewSkeleton() {
	return (
		<article
			aria-busy="true"
			aria-label="Loading product details"
			className="product:contents product:animate-pulse"
			role="status"
		>
			<div className="product:lg:col-span-5 product:flex product:flex-col product:gap-md">
				<div className="product:aspect-[4/3] product:w-full product:rounded-lg product:bg-surface-container-low product:border product:border-outline-variant" />
				<div className="product:grid product:grid-cols-4 product:gap-sm">
					{[1, 2, 3, 4].map(function renderThumbnailPlaceholder(key) {
						return (
							<div
								className="product:aspect-square product:rounded-lg product:bg-surface-container-low product:border product:border-outline-variant"
								key={key}
							/>
						);
					})}
				</div>
			</div>
			<div className="product:lg:col-span-4 product:flex product:flex-col product:gap-lg">
				<header className="product:flex product:flex-col product:gap-sm">
					<div className="product:h-5 product:w-24 product:rounded product:bg-outline-variant" />
					<div className="product:h-8 product:w-full product:max-w-md product:rounded product:bg-outline-variant" />
					<div className="product:h-8 product:w-3/4 product:max-w-sm product:rounded product:bg-outline-variant" />
					<div className="product:flex product:items-center product:justify-between product:gap-sm">
						<div className="product:h-5 product:w-28 product:rounded product:bg-outline-variant" />
						<div className="product:h-4 product:w-20 product:rounded product:bg-outline-variant" />
					</div>
				</header>
				<div className="product:flex product:flex-col product:gap-sm">
					<div className="product:h-4 product:w-full product:rounded product:bg-outline-variant" />
					<div className="product:h-4 product:w-full product:rounded product:bg-outline-variant" />
					<div className="product:h-4 product:w-4/5 product:rounded product:bg-outline-variant" />
				</div>
			</div>
		</article>
	);
}

export { ProductViewSkeleton };
