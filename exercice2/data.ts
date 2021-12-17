export const items = [
	{
		name: "whole french bread",
		price: 1,
		rating: 4.5,
		description: "made in paris and destined to the whole world",
		image: "./image/products/bread.png",
	},
	{
		name: "fresh swiss milk",
		price: 1.15,
		rating: 4.5,
		description: "semi skimmed milk that comes straight from the alpes farmers",
		image: "./image/products/milk.png",
	},
	{
		name: "butter",
		price: 0.8,
		rating: 4.5,
		description: "produced by us to insure high quality butter",
		image: "./image/products/butter.png",
	},
];

// here we can like state complex condition on multiple item and get discount on multiple item
// an exemple of complex condition
// {
// 	condition: [{ item: "Butter", quantity: 2 },{ item: "bread", quantity: 2 }],
// 	discountsOn: [{ item: "Bread", discountValue: 50 / 100 }],
// },

//
export const rules = [
	{
		condition: [{ item: "butter", quantity: 2 }],
		discountsOn: [{ item: "whole french bread", discountValue: 50 / 100 }],
	},
	{
		condition: [{ item: "fresh swiss milk", quantity: 4 }],
		discountsOn: [{ item: "fresh swiss milk", discountValue: 100 / 100 }],
	},
];
