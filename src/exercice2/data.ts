export const items = [
	{
		name: "whole french bread",
		price: 1,
		rating: 4.5,
		description: "made in paris and destined to the whole world",
		image: "./image/products/bread.png",
		id: "bread",
	},
	{
		name: "fresh swiss milk",
		price: 1.15,
		rating: 4.5,
		description: "semi skimmed milk that comes straight from the alpes farmers",
		image: "./image/products/milk.png",
		id: "milk",
	},
	{
		name: "butter",
		price: 0.8,
		rating: 4.5,
		description: "produced by us to insure high quality butter",
		image: "./image/products/butter.png",
		id: "butter",
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
		condition: [{ itemId: "butter", quantity: 2 }],
		discountsOn: [{ itemId: "bread", quantity: 1, discountValue: 50 / 100 }],
	},
	{
		condition: [{ itemId: "milk", quantity: 4 }],
		discountsOn: [{ itemId: "milk", quantity: 1, discountValue: 100 / 100 }],
		// here you can read it as 1 of the 4 will have a 100% discount
		// it is the same thing as when we say when you buy 3 the 4th is free
	},
];
