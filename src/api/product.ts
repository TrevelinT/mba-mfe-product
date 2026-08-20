export const PRODUCT_ID = "nintendo-switch-2";

export interface ProductPhoto {
	src: string;
	thumbSrc: string;
	alt: string;
	label: string;
	width: number;
	height: number;
}

export interface ProductReviews {
	rating: number;
	count: number;
}

export interface ProductPage {
	id: string;
	title: string;
	description: string;
	photos: ProductPhoto[];
	reviews: ProductReviews;
	badge?: string;
}

export interface GetProductPageOptions {
	latencyMs?: number;
}

const PRODUCT_PHOTOS: ProductPhoto[] = [
	{
		src: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-01.webp`,
		thumbSrc: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-01-thumb.webp`,
		alt: "Bundle Nintendo Switch 2 com Mario Kart World",
		label: "Bundle Nintendo Switch 2 com Mario Kart World",
		width: 450,
		height: 450,
	},
	{
		src: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-02.webp`,
		thumbSrc: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-02-thumb.webp`,
		alt: "Jogador com o Nintendo Switch 2 na mão",
		label: "Jogador com o Nintendo Switch 2 na mão",
		width: 800,
		height: 800,
	},
	{
		src: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-03.webp`,
		thumbSrc: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-03-thumb.webp`,
		alt: "Comparação de tamanho entre o Nintendo Switch 2 e o Nintendo Switch (rumor)",
		label:
			"Comparação de tamanho entre o Nintendo Switch 2 e o Nintendo Switch (rumor)",
		width: 900,
		height: 755,
	},
	{
		src: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-04.webp`,
		thumbSrc: `${import.meta.env.BASE_URL}images/nintendo-switch-2-image-04-thumb.webp`,
		alt: "Nintendo Switch 2 com joy-con vermelho e azul destacados",
		label: "Nintendo Switch 2 com joy-con vermelho e azul destacados",
		width: 515,
		height: 515,
	},
];

function buildProductPage(): ProductPage {
	return {
		id: PRODUCT_ID,
		title: "Nintendo Switch 2 - Bundle Mario Kart World",
		description:
			"O Nintendo Switch 2 é a mais nova geração de console portátil da Nintendo, com um design inovador e uma experiência de jogo incrível. Ele vem com o jogo Mario Kart World incluído, que é um jogo de corrida divertido e emocionante para todos os amantes de jogos.",
		photos: PRODUCT_PHOTOS,
		reviews: { rating: 4.5, count: 2451 },
		badge: "Mais Vendido",
	};
}

export async function getProductPage(
	options: GetProductPageOptions = {},
): Promise<ProductPage> {
	const { latencyMs = 300 } = options;
	await new Promise((resolve) => setTimeout(resolve, latencyMs));
	return buildProductPage();
}
