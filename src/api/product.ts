export const PRODUCT_ID = "nintendo-switch-2";

export interface ProductPhoto {
	src: string;
	alt: string;
	label: string;
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
		src: "https://cdn.awsli.com.br/600x450/2443/2443989/produto/366571198/63388ed8cf5558ee164d38ad715b2266-5oolcqzk74.jpg",
		alt: "Bundle Nintendo Switch 2 com Mario Kart World",
		label: "Bundle Nintendo Switch 2 com Mario Kart World",
	},
	{
		src: "https://infostore.vtexassets.com/arquivos/ids/267231/console_nintendo_switch_2_05.jpg?v=638865606321730000",
		alt: "Jogador com o Nintendo Switch 2 na mão",
		label: "Jogador com o Nintendo Switch 2 na mão",
	},
	{
		src: "https://www.adrenaline.com.br/wp-content/uploads/2024/12/nintendo-switch-2-reddit-vazamento-02.jpg",
		alt: "Comparação de tamanho entre o Nintendo Switch 2 e o Nintendo Switch (rumor)",
		label:
			"Comparação de tamanho entre o Nintendo Switch 2 e o Nintendo Switch (rumor)",
	},
	{
		src: "https://api.store.vivo.com.br/medias/515Wx515H-22024615-Nintendo-Switch-2-com-Mario-Kart-World-10-.jpg?context=bWFzdGVyfHByb2R1Y3RpbWFnZXN8Mjg2NDV8aW1hZ2UvanBlZ3xhR1JqTDJoaFlpODVOemN5TVRReU9UZzFNalEyTHpVeE5WZDROVEUxU0Y4eU1qQXlORFl4TlY5T2FXNTBaVzVrYnkxVGQybDBZMmd0TWkxamIyMHRUV0Z5YVc4dFMyRnlkQzFYYjNKc1pGOGdLREV3S1M1cWNHY3w5ZGNkZGE5OTI3MTczZDNhNDVjYTNiNWQwNGU1ZTkxNDEzNDlhYTg4NDBmYmU0ZDM2YTczZmE4Zjc5MWEyYzJk",
		alt: "Nintendo Switch 2 com joy-con vermelho e azul destacados",
		label: "Nintendo Switch 2 com joy-con vermelho e azul destacados",
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
