export const INCREMENT = "counter/INCREMENT";

// "Pure" stateless function
export function increment() {
    return (dispatch) => {
        return dispatch({
            type: INCREMENT
        });
    }
}