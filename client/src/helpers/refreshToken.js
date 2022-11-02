import {apolloClient} from "../apollo/client";
import {REFRESH_TOKEN} from "../apollo/queries";

export const refreshToken = async () => {
    try {
        const refreshResolverResponse = await apolloClient.query({
            query: REFRESH_TOKEN,
        });

        const accessToken = refreshResolverResponse.data?.refreshToken.tokens.accessToken;
        localStorage.setItem('accessToken', accessToken || '');
        return accessToken;
    } catch (err) {
        localStorage.clear();
        throw err;
    }
};