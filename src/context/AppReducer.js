export default function appReducer(state, action) {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return{
                ...state,
                products: action.payload
            };

        case "ADD_PRODUCT":
            return {
                ...state,
                products: [...state.products, action.payload],
            };


        case "EDIT_PRODUCT":
            const updatedproduct = action.payload;

            const updatedproducts = state.products.map((product) => {
                if (product.id === updatedproduct.id) {
                    return updatedproduct;
                }
                return product;
            });

            return {
                ...state,
                products: updatedproducts,
            };

        case 'REMOVE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
            };

        default:
            return state;
    }
};