export class CategoryApi {
	static async getProducts(categoryInfoObject) {
		const res = await fetch('/data/products.json');
		const parsedRes = await res.json();
		let products = [...parsedRes];

		console.log(categoryInfoObject.category);
		console.log(categoryInfoObject.subcategory);
		console.log(parsedRes);

		// if (categoryInfoObject.category)
		// 	return parsedRes.filter((object) => object.category === categoryInfoObject.category);

		// if (categoryInfoObject.subcategory)
		// 	return parsedRes.filter((object) => object.subcategory === categoryInfoObject.subcategory);

		if (categoryInfoObject.category) {
			products = products.filter((product) => product.category === categoryInfoObject.category);
			console.log(products);
		}

		if (categoryInfoObject.subcategory) {
			products = products.filter(
				(product) => product.subCategory === categoryInfoObject.subcategory
			);
			console.log(products);
		}

		return products;
	}
}
