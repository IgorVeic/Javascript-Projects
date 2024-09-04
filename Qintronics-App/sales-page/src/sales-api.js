export class SalesApi {
	static async getProducts() {
		const res = await fetch('/data/products.json');
		const parsedRes = await res.json();
		const discountedProducts = parsedRes.filter(product => product.discount !== 0);
		
		return discountedProducts;
	}
}
